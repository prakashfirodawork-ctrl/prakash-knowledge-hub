import { useState } from "react";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout/layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCreatePost } from "@workspace/api-client-react";
import { Loader2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().optional(),
  shortDescription: z.string().optional(),
  content: z.string().min(20, "Content must be at least 20 characters"),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  category: z.string().min(1, "Please select a category"),
  isFeatured: z.boolean().default(false),
  tags: z.string().optional(), // We'll split this by comma
});

export default function Dashboard() {
  const { toast } = useToast();
  const createPostMutation = useCreatePost();
  
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      shortDescription: "",
      content: "",
      featuredImage: "",
      category: "",
      isFeatured: false,
      tags: "",
    },
  });

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    const tagsArray = values.tags ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    
    // Auto-generate slug if empty
    const finalSlug = values.slug || values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    createPostMutation.mutate({
      data: {
        title: values.title,
        slug: finalSlug,
        shortDescription: values.shortDescription || null,
        content: values.content,
        featuredImage: values.featuredImage || null,
        category: values.category,
        isFeatured: values.isFeatured,
        tags: tagsArray.length > 0 ? tagsArray : undefined,
      }
    }, {
      onSuccess: () => {
        toast({
          title: "Post created successfully!",
          description: "Your article has been published to the blog.",
        });
        form.reset();
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Failed to create post",
          description: error.message || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <Layout>
      <SEO title="Dashboard - Create Post" />
      
      <div className="bg-muted/30 border-b border-border/50 py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Author Dashboard</h1>
            <p className="text-muted-foreground mt-1">Create and publish new articles</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> View Blog</Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">
        <div className="bg-card border border-border shadow-sm rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2 border-b border-border/50 pb-4">
            <Plus className="h-5 w-5 text-primary" /> Create New Post
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Post Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the main title for your article" className="text-lg font-medium h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom URL Slug (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="my-awesome-post" {...field} />
                      </FormControl>
                      <FormDescription>Leave empty to auto-generate from title</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pi-network">Pi Network</SelectItem>
                          <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                          <SelectItem value="data-analytics">Data Analytics</SelectItem>
                          <SelectItem value="personal-branding">Personal Branding</SelectItem>
                          <SelectItem value="web3-blockchain">Web3 & Blockchain</SelectItem>
                          <SelectItem value="digital-growth">Digital Growth</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="agri-tech">Agri-Tech</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormDescription>Provide a direct link to an image. Unsplash or direct image URLs work best.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Short Description / Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A brief summary of what this article is about (used in cards and SEO)" 
                          className="resize-none h-20" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Article Content * (HTML/Rich Text)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="<p>Write your amazing article here...</p>" 
                          className="min-h-[300px] font-mono text-sm" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>Supports HTML tags for formatting (h2, p, strong, a, etc.)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="ai, machine learning, future (comma separated)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm md:col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Feature this post</FormLabel>
                        <FormDescription>
                          Featured posts appear prominently on the homepage
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-6 border-t border-border/50 flex justify-end">
                <Button type="submit" size="lg" disabled={createPostMutation.isPending} className="px-8">
                  {createPostMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Publish Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
