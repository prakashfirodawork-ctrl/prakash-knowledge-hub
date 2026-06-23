import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout/layout";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Brain, TrendingUp, Target, Shield, GraduationCap, Sprout, Star } from "lucide-react";
import {
  useListPosts,
  useListFeaturedPosts,
  useListPopularPosts,
  useListRecentPosts
} from "@workspace/api-client-react";

export default function Home() {
  const { data: featuredPosts, isLoading: isLoadingFeatured } = useListFeaturedPosts();
  const { data: recentPosts, isLoading: isLoadingRecent } = useListRecentPosts({ limit: 6 });
  const { data: popularPosts, isLoading: isLoadingPopular } = useListPopularPosts({ limit: 4 });

  const categories = [
    { name: "Pi Network", slug: "pi-network", icon: Star, color: "text-primary", bg: "bg-primary/10" },
    { name: "Artificial Intelligence", slug: "artificial-intelligence", icon: Brain, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Data Analytics", slug: "data-analytics", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Personal Branding", slug: "personal-branding", icon: Target, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Web3 & Blockchain", slug: "web3-blockchain", icon: Shield, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Digital Growth", slug: "digital-growth", icon: TrendingUp, color: "text-pink-500", bg: "bg-pink-500/10" },
    { name: "Education", slug: "education", icon: GraduationCap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Agri-Tech", slug: "agri-tech", icon: Sprout, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <Layout>
      <SEO />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:32px_32px]" />
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="container relative mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Prakash Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight mb-6 text-foreground">
            Learn. Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Grow. Impact.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Practical insights on Artificial Intelligence, Personal Branding, Data Analytics, Web3, Pi Network, Digital Growth, and Education.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full h-12 px-8 font-medium">
              <Link href="/blog">Explore Articles</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 font-medium">
              <Link href="/author">About Prakash</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold flex items-center gap-2">
              <Star className="h-6 w-6 text-secondary fill-secondary" /> 
              Featured Insights
            </h2>
          </div>

          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-[400px] rounded-xl" />
              <Skeleton className="h-[400px] rounded-xl" />
            </div>
          ) : featuredPosts && featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {featuredPosts.slice(0, 2).map((post, i) => (
                <PostCard key={post.id} post={post} featured={i === 0 && featuredPosts.length % 2 !== 0} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">No featured posts found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Explore Topics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  <div className="group flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border/60 hover:border-primary/50 hover:shadow-md transition-all duration-300 text-center h-full cursor-pointer">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${category.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors">{category.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-muted/10 border-t border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Latest Posts */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-heading font-bold">Latest Articles</h2>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary" asChild>
                  <Link href="/blog">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>

              {isLoadingRecent ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[350px] rounded-xl" />
                  ))}
                </div>
              ) : recentPosts && recentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground">No recent posts found.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              
              {/* Popular Posts */}
              <div className="bg-card rounded-xl border border-border/60 p-6 sticky top-24">
                <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Popular Reads
                </h3>
                
                {isLoadingPopular ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : popularPosts && popularPosts.length > 0 ? (
                  <div className="space-y-6">
                    {popularPosts.map((post, i) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <div className="group flex gap-4 cursor-pointer">
                          <div className="text-3xl font-heading font-bold text-muted/50 group-hover:text-primary/20 transition-colors">
                            0{i + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{post.viewCount || 0} views</span>
                              <span>{post.readingTime || 5} min read</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No popular posts yet.</p>
                )}
              </div>

              {/* Newsletter / Connect */}
              <div className="bg-primary text-primary-foreground rounded-xl p-8 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-heading font-bold mb-3 relative z-10">Join the Community</h3>
                <p className="text-primary-foreground/80 text-sm mb-6 relative z-10 leading-relaxed">
                  Get the latest insights on AI, Web3, and Digital Growth straight from Prakash Choudhary.
                </p>
                <div className="flex gap-2 relative z-10">
                  <Button variant="secondary" className="w-full" asChild>
                    <a href="https://www.linkedin.com/in/prakashphiroda" target="_blank" rel="noopener noreferrer">
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
