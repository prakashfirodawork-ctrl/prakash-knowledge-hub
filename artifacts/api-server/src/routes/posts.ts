import { Router } from "express";
import { db } from "@workspace/db";
import { postsTable } from "@workspace/db";
import { eq, desc, ilike, or, sql, arrayContains } from "drizzle-orm";
import {
  ListPostsQueryParams,
  CreatePostBody,
  GetPostParams,
  UpdatePostParams,
  UpdatePostBody,
  DeletePostParams,
  RecordViewParams,
  ToggleLikeParams,
  ListRelatedPostsParams,
  ListPopularPostsQueryParams,
  ListRecentPostsQueryParams,
} from "@workspace/api-zod";

export const postsRouter = Router();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function calcReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function toApiPost(p: typeof postsTable.$inferSelect) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDescription: p.shortDescription ?? null,
    content: p.content,
    featuredImage: p.featuredImage ?? null,
    category: p.category,
    tags: p.tags ?? [],
    externalLinks: p.externalLinks ?? [],
    isFeatured: p.isFeatured,
    publishedAt: p.publishedAt.toISOString(),
    readingTime: p.readingTime,
    viewCount: p.viewCount,
    likeCount: p.likeCount,
  };
}

// GET /posts
postsRouter.get("/", async (req, res) => {
  const query = ListPostsQueryParams.parse(req.query);
  const { category, tag, page = 1, limit = 10 } = query;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (category) conditions.push(eq(postsTable.category, category));
  if (tag) conditions.push(arrayContains(postsTable.tags, [tag]));

  const whereClause = conditions.length > 0
    ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}`
    : undefined;

  const [posts, countResult] = await Promise.all([
    db.select().from(postsTable)
      .where(whereClause)
      .orderBy(desc(postsTable.publishedAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: sql<number>`count(*)::int` })
      .from(postsTable)
      .where(whereClause),
  ]);

  res.json({
    posts: posts.map(toApiPost),
    total: countResult[0]?.count ?? 0,
    page,
    limit,
  });
});

// POST /posts
postsRouter.post("/", async (req, res) => {
  const body = CreatePostBody.parse(req.body);
  const slug = (body.slug ?? generateSlug(body.title)) || generateSlug(body.title);
  const readingTime = calcReadingTime(body.content);

  const [post] = await db.insert(postsTable).values({
    title: body.title,
    slug,
    shortDescription: body.shortDescription ?? null,
    content: body.content,
    featuredImage: body.featuredImage ?? null,
    category: body.category,
    tags: body.tags ?? [],
    externalLinks: body.externalLinks ?? [],
    isFeatured: body.isFeatured ?? false,
    readingTime,
  }).returning();

  res.status(201).json(toApiPost(post!));
});

// GET /posts/featured
postsRouter.get("/featured", async (_req, res) => {
  const posts = await db.select()
    .from(postsTable)
    .where(eq(postsTable.isFeatured, true))
    .orderBy(desc(postsTable.publishedAt))
    .limit(5);
  res.json(posts.map(toApiPost));
});

// GET /posts/popular
postsRouter.get("/popular", async (req, res) => {
  const query = ListPopularPostsQueryParams.parse(req.query);
  const limit = query.limit ?? 5;
  const posts = await db.select()
    .from(postsTable)
    .orderBy(desc(postsTable.viewCount))
    .limit(limit);
  res.json(posts.map(toApiPost));
});

// GET /posts/recent
postsRouter.get("/recent", async (req, res) => {
  const query = ListRecentPostsQueryParams.parse(req.query);
  const limit = query.limit ?? 6;
  const posts = await db.select()
    .from(postsTable)
    .orderBy(desc(postsTable.publishedAt))
    .limit(limit);
  res.json(posts.map(toApiPost));
});

// GET /posts/:slug
postsRouter.get("/:slug", async (req, res) => {
  const { slug } = GetPostParams.parse(req.params);
  const [post] = await db.select().from(postsTable).where(eq(postsTable.slug, slug));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(toApiPost(post));
});

// PATCH /posts/:slug
postsRouter.patch("/:slug", async (req, res) => {
  const { slug } = UpdatePostParams.parse(req.params);
  const body = UpdatePostBody.parse(req.body);
  const update: Partial<typeof postsTable.$inferInsert> = { ...body };
  if (body.content) {
    update.readingTime = calcReadingTime(body.content);
  }
  const [post] = await db.update(postsTable)
    .set(update)
    .where(eq(postsTable.slug, slug))
    .returning();
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(toApiPost(post));
});

// DELETE /posts/:slug
postsRouter.delete("/:slug", async (req, res) => {
  const { slug } = DeletePostParams.parse(req.params);
  await db.delete(postsTable).where(eq(postsTable.slug, slug));
  res.status(204).send();
});

// POST /posts/:slug/view
postsRouter.post("/:slug/view", async (req, res) => {
  const { slug } = RecordViewParams.parse(req.params);
  const [post] = await db.update(postsTable)
    .set({ viewCount: sql`${postsTable.viewCount} + 1` })
    .where(eq(postsTable.slug, slug))
    .returning();
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ viewCount: post.viewCount });
});

// POST /posts/:slug/like
postsRouter.post("/:slug/like", async (req, res) => {
  const { slug } = ToggleLikeParams.parse(req.params);
  const [post] = await db.select().from(postsTable).where(eq(postsTable.slug, slug));
  if (!post) return res.status(404).json({ error: "Post not found" });
  // Simple toggle: increment (no user sessions for now)
  const [updated] = await db.update(postsTable)
    .set({ likeCount: sql`${postsTable.likeCount} + 1` })
    .where(eq(postsTable.slug, slug))
    .returning();
  res.json({ likeCount: updated!.likeCount, liked: true });
});

// GET /posts/:slug/related
postsRouter.get("/:slug/related", async (req, res) => {
  const { slug } = ListRelatedPostsParams.parse(req.params);
  const [current] = await db.select().from(postsTable).where(eq(postsTable.slug, slug));
  if (!current) return res.json([]);

  const related = await db.select()
    .from(postsTable)
    .where(sql`${postsTable.category} = ${current.category} AND ${postsTable.slug} != ${slug}`)
    .orderBy(desc(postsTable.publishedAt))
    .limit(3);

  res.json(related.map(toApiPost));
});
