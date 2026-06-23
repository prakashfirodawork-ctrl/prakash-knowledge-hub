import { useRoute } from "wouter";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout/layout";
import { PostCard } from "@/components/post-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useListPosts, useListCategories } from "@workspace/api-client-react";

export default function Category() {
  const [match, params] = useRoute("/category/:slug");
  const slug = params?.slug || "";

  const { data: categories } = useListCategories();
  const categoryData = categories?.find(c => c.slug === slug);
  const categoryName = categoryData?.name || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const { data: postsData, isLoading } = useListPosts({ 
    category: slug,
    limit: 20
  });

  return (
    <Layout>
      <SEO title={`${categoryName} Articles`} />
      
      <div className="bg-muted/30 border-b border-border/50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            Category
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">{categoryName}</h1>
          <p className="text-lg text-muted-foreground">
            Explore all articles, tutorials, and insights related to {categoryName}.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        ) : postsData?.posts && postsData.posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {postsData.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-xl border border-border/50 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Check back later for new content in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
