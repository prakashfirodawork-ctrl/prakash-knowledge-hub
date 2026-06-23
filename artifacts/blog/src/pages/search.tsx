import { useSearch } from "wouter";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout/layout";
import { PostCard } from "@/components/post-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search as SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchPosts, getSearchPostsQueryKey } from "@workspace/api-client-react";

export default function Search() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const { data: searchResults, isLoading } = useSearchPosts(
    { q: activeQuery, limit: 20 },
    { query: { enabled: !!activeQuery, queryKey: getSearchPostsQueryKey({ q: activeQuery, limit: 20 }) } }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveQuery(query.trim());
      // Update URL without triggering reload
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    if (initialQuery && initialQuery !== activeQuery) {
      setActiveQuery(initialQuery);
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  return (
    <Layout>
      <SEO title={`Search Results for "${activeQuery}"`} />
      
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-heading font-bold mb-8 text-center">Search Articles</h1>
          
          <form onSubmit={handleSearch} className="relative flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search by title, content, or tags..." 
                className="pl-10 h-12 rounded-full bg-background border-border/60 focus-visible:ring-primary text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit" className="h-12 rounded-full px-8">Search</Button>
          </form>
        </div>

        {activeQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-medium text-muted-foreground">
              Results for <span className="text-foreground font-bold">"{activeQuery}"</span>
              {!isLoading && searchResults && ` (${searchResults.length})`}
            </h2>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        ) : !activeQuery ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-border/50 border-dashed">
            <SearchIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Enter a search term to find articles.</p>
          </div>
        ) : searchResults && searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {searchResults.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-xl border border-border/50">
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">We couldn't find any articles matching your search.</p>
            <Button variant="outline" onClick={() => {setQuery(""); setActiveQuery("");}}>Clear Search</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
