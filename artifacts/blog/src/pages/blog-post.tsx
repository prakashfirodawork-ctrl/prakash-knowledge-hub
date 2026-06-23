import { useRoute } from "wouter";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout/layout";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Eye, Heart, Share2, ArrowLeft, Twitter, Linkedin, Facebook } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  useGetPost,
  useListRelatedPosts,
  useRecordView,
  useToggleLike,
  getGetPostQueryKey,
  getListRelatedPostsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: post, isLoading } = useGetPost(slug, {
    query: { enabled: !!slug, queryKey: getGetPostQueryKey(slug) }
  });
  
  const { data: relatedPosts } = useListRelatedPosts(slug, {
    query: { enabled: !!slug, queryKey: getListRelatedPostsQueryKey(slug) }
  });

  const recordViewMutation = useRecordView();
  const toggleLikeMutation = useToggleLike();

  const [hasRecordedView, setHasRecordedView] = useState(false);

  useEffect(() => {
    if (slug && post && !hasRecordedView) {
      recordViewMutation.mutate({ slug });
      setHasRecordedView(true);
    }
  }, [slug, post, hasRecordedView, recordViewMutation]);

  const handleLike = () => {
    if (!slug) return;
    toggleLikeMutation.mutate({ slug }, {
      onSuccess: (data) => {
        // Optimistic update
        queryClient.setQueryData(getGetPostQueryKey(slug), (old: any) => 
          old ? { ...old, likeCount: data.likeCount } : old
        );
        if (data.liked) {
          toast({ title: "Post liked", description: "Thanks for the love!" });
        }
      }
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.shortDescription || "",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied", description: "URL copied to clipboard." });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">
          <Skeleton className="h-8 w-24 mb-6" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-16 w-3/4 mb-8" />
          <div className="flex items-center gap-4 mb-12">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-[400px] w-full rounded-2xl mb-12" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild><Link href="/blog">Back to Blog</Link></Button>
        </div>
      </Layout>
    );
  }

  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date();

  return (
    <Layout>
      <SEO 
        title={post.title} 
        description={post.shortDescription || ""} 
        image={post.featuredImage || undefined}
        type="article"
      />
      
      <article className="bg-background">
        {/* Post Header */}
        <header className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
          </Link>
          
          <div className="mb-6 flex flex-wrap gap-2">
            <Link href={`/category/${post.category}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80 bg-secondary/10 text-secondary-foreground text-sm py-1 cursor-pointer">
                {post.category}
              </Badge>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-tight mb-6">
            {post.title}
          </h1>
          
          {post.shortDescription && (
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.shortDescription}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-border/50">
            <div className="flex items-center gap-4">
              <Link href="/author">
                <img 
                  src="/author-prakash.png" 
                  alt="Prakash Choudhary" 
                  className="w-12 h-12 rounded-full border border-border cursor-pointer hover:border-primary transition-colors object-cover bg-muted"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </Link>
              <div>
                <Link href="/author" className="font-semibold text-foreground hover:text-primary transition-colors block">
                  Prakash Choudhary
                </Link>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                  <time dateTime={publishedDate.toISOString()} className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(publishedDate, "MMMM d, yyyy")}
                  </time>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime || 5} min read
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                <Eye className="h-4 w-4" /> {post.viewCount || 0} views
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${toggleLikeMutation.isPending ? 'opacity-50' : ''}`}
                onClick={handleLike}
                disabled={toggleLikeMutation.isPending}
              >
                <Heart className={`h-4 w-4 ${toggleLikeMutation.data?.liked ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="sr-only">Like</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="container mx-auto px-4 md:px-8 max-w-5xl mb-12">
            <div className="aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm">
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Post Content */}
        <div className="container mx-auto px-4 md:px-8 max-w-3xl mb-20">
          <div 
            className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl prose-img:border prose-img:border-border max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-sm py-1 font-normal bg-muted/30">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-12 p-8 bg-card rounded-2xl border border-border shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <img 
              src="/author-prakash.png" 
              alt="Prakash Choudhary" 
              className="w-24 h-24 rounded-full border-2 border-primary/20 object-cover bg-muted"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="flex-1">
              <h3 className="font-heading font-bold text-xl mb-1">Prakash Choudhary</h3>
              <p className="text-primary font-medium text-sm mb-3">AI Educator | Digital Builder | Web3 Advocate</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Helping students, professionals, entrepreneurs, and businesses leverage AI, Data Analytics, Personal Branding, Blockchain, Pi Network, and Digital Growth.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                  <a href="https://www.linkedin.com/in/prakashphiroda" target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /></a>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                  <a href="https://x.com/PiProtecter" target="_blank" rel="noopener noreferrer"><Twitter className="h-4 w-4" /></a>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                  <a href="https://www.facebook.com/prakashphiroda" target="_blank" rel="noopener noreferrer"><Facebook className="h-4 w-4" /></a>
                </Button>
                <Button variant="outline" size="sm" className="ml-2 h-8" asChild>
                  <Link href="/author">View Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-muted/30 py-16 border-t border-border/50">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Keep Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
