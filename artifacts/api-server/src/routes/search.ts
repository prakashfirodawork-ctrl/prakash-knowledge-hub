import { Router } from "express";
import { db } from "@workspace/db";
import { postsTable } from "@workspace/db";
import { ilike, or, sql, desc } from "drizzle-orm";
import { SearchPostsQueryParams } from "@workspace/api-zod";

export const searchRouter = Router();

// GET /search
searchRouter.get("/", async (req, res) => {
  const { q, limit = 10 } = SearchPostsQueryParams.parse(req.query);

  const posts = await db.select()
    .from(postsTable)
    .where(
      or(
        ilike(postsTable.title, `%${q}%`),
        ilike(postsTable.content, `%${q}%`),
        ilike(postsTable.category, `%${q}%`),
        ilike(postsTable.shortDescription, `%${q}%`),
        sql`${postsTable.tags}::text ilike ${'%' + q + '%'}`,
      )
    )
    .orderBy(desc(postsTable.publishedAt))
    .limit(limit);

  const result = posts.map((p) => ({
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
  }));

  res.json(result);
});
