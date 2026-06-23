import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, Heart } from "lucide-react";
import { format } from "date-fns";
import type { Post } from "@workspace/api-client-react";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date();

  return (
    <Card className={`group overflow-hidden flex flex-col border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md ${featured ? 'md:flex-row md:col-span-2 md:gap-4' : ''}`}>
      {post.featuredImage && (
        <div className={`overflow-hidden bg-muted relative ${featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'}`}>
          <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
            <span className="sr-only">Read {post.title}</span>
          </Link>
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className={`flex flex-col flex-1 ${featured ? 'md:w-1/2 p-6 md:p-8' : ''}`}>
        <CardHeader className={`${featured ? 'p-0 pb-4' : 'px-6 pt-6 pb-4'}`}>
          <div className="flex flex-wrap gap-2 mb-3">
            <Link href={`/category/${post.category}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80 bg-secondary/10 text-secondary-foreground font-medium rounded-sm border-transparent hover:cursor-pointer transition-colors">
                {post.category}
              </Badge>
            </Link>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <h3 className={`font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
              {post.title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent className={`${featured ? 'p-0 pb-6 flex-1' : 'px-6 pb-6 flex-1'}`}>
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {post.shortDescription || post.content.substring(0, 150) + "..."}
          </p>
        </CardContent>
        <CardFooter className={`flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/50 ${featured ? 'p-0 pt-6 mt-auto' : 'px-6 py-4 mt-auto'}`}>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={publishedDate.toISOString()}>
              {format(publishedDate, "MMM d, yyyy")}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTime || 5} min read</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{post.viewCount || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              <span>{post.likeCount || 0}</span>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
