import { Router } from "express";
import { db } from "@workspace/db";
import { postsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

export const statsRouter = Router();

// GET /stats/summary
statsRouter.get("/summary", async (_req, res) => {
  const [summary] = await db.select({
    totalPosts: sql<number>`count(*)::int`,
    totalViews: sql<number>`sum(${postsTable.viewCount})::int`,
    totalLikes: sql<number>`sum(${postsTable.likeCount})::int`,
    categoryCount: sql<number>`count(distinct ${postsTable.category})::int`,
  }).from(postsTable);

  res.json({
    totalPosts: summary?.totalPosts ?? 0,
    totalViews: summary?.totalViews ?? 0,
    totalLikes: summary?.totalLikes ?? 0,
    categoryCount: summary?.categoryCount ?? 0,
  });
});
