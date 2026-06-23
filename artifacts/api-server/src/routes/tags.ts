import { Router } from "express";
import { db } from "@workspace/db";
import { postsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

export const tagsRouter = Router();

// GET /tags
tagsRouter.get("/", async (_req, res) => {
  const posts = await db.select({ tags: postsTable.tags }).from(postsTable);

  const tagCount: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      tagCount[tag] = (tagCount[tag] ?? 0) + 1;
    }
  }

  const tags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      postCount: count,
    }));

  res.json(tags);
});
