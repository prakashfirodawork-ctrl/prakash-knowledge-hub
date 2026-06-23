import { useState } from "react";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout/layout";
import { PostCard } from "@/components/post-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useListPosts, useListCategories } from "@workspace/api-client-react";

export default function Blog() {
  const [_, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useListCategories();
  
  const { data: postsData, isLoading } = useListPosts({ 
    category: activeCategory !== "all" ? activeCategory : undefined,
    page,
    limit: 12
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Layout>
      <SEO title="Blog - Articles & Insights" />
      
      <div className="bg-muted/30 border-b border-border/50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Knowledge Hub</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore deep dives into AI, Web3, Personal Branding, Data Analytics, and Digital Growth.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search articles..." 
                className="pl-10 h-12 rounded-full bg-background border-border/60 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="h-12 rounded-full px-6">Search</Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => { setActiveCategory("all"); setPage(1); }}
            className="rounded-full rounded-r-full rounded-l-full h-9"
          >
            All Articles
          </Button>
          {categoriesData?.map((cat) => (
            <Button
              key={cat.slug}
              variant={activeCategory === cat.slug ? "default" : "outline"}
              onClick={() => { setActiveCategory(cat.slug); setPage(1); }}
              className="rounded-full rounded-r-full rounded-l-full h-9"
            >
              {cat.name} <span className="ml-1.5 opacity-60 text-xs">({cat.postCount})</span>
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        ) : postsData?.posts && postsData.posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {postsData.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {postsData.total > postsData.posts.length && (
              <div className="mt-12 flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setPage(p => p + 1)}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Load More Articles
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-card rounded-xl border border-border/50">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6">We couldn't find any articles in this category.</p>
            <Button onClick={() => setActiveCategory("all")}>View All Articles</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
