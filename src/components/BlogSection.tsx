import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, ChevronRight, ChevronLeft, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediumPosts, type MediumPost } from '@/hooks/useMediumPosts';

// Fallback blog posts in case Medium feed fails
const fallbackPosts: MediumPost[] = [
  {
    id: "fallback-1",
    title: "Real-time Autonomous Vehicle Remote Assistance",
    excerpt: "Join me on an exhilarating journey into the realm of real-time autonomous vehicle data processing...",
    pubDate: "April 15, 2024",
    readTime: "8 min read",
    category: ["Autonomous Vehicles"],
    imageUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*_GQKvtIhZTwHWxV91mJAuQ.jpeg",
    mediumUrl: "https://medium.com/@pranav.reveendran/real-time-autonomous-vehicle-remote-assistance-2399d77ce8f6",
    content: "",
    author: "Pranav Reveendran"
  },
  {
    id: "fallback-2",
    title: "Auto-GPT: Empowering Autonomous AI Agents",
    excerpt: "Dive into the fascinating world of Auto-GPT, where AI agents operate with unprecedented autonomy...",
    pubDate: "April 10, 2024",
    readTime: "6 min read",
    category: ["Artificial Intelligence"],
    imageUrl: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*1SXJZUnLRqhdwTmlkZIgPw.jpeg",
    mediumUrl: "https://medium.com/@pranav.reveendran/auto-gpt-empowering-autonomous-ai-agents-1e15b0c7ddd8",
    content: "",
    author: "Pranav Reveendran"
  },
  {
    id: "fallback-3",
    title: "Revolutionizing Data Science in Public Health with AsthmaCare",
    excerpt: "Discover how we're transforming public health monitoring through innovative data science solutions...",
    pubDate: "April 5, 2024",
    readTime: "7 min read",
    category: ["Healthcare"],
    imageUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*VqDLCFXr1IpK4_bjQlqrbQ.jpeg",
    mediumUrl: "https://medium.com/@pranav.reveendran/asthmacare-revolutionizing-public-health-data-science-5a61ada7c8e9",
    content: "",
    author: "Pranav Reveendran"
  },
];

const BlogSection = () => {
  const { posts: mediumPosts, loading, error } = useMediumPosts();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Use Medium posts if available, otherwise fallback
  const blogPosts = mediumPosts.length > 0 ? mediumPosts : fallbackPosts;

  // Extract all unique categories from posts
  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    blogPosts.forEach(post => {
      post.category.forEach(cat => allCategories.add(cat));
    });
    return ["All", ...Array.from(allCategories).sort()];
  }, [blogPosts]);

  // Filter posts by category
  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category.includes(selectedCategory));

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Reset page when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <section id="blogs" className="py-20 px-6 md:px-12 bg-surface">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4" id="blog-heading">Blog</h2>
          <p className="text-text text-opacity-80 mb-8">Insights and thoughts on data engineering, AI, and technology</p>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Loading and error states */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
            <p className="text-text text-opacity-60">Loading latest blog posts from Medium...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-12 mb-8">
            <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
            <p className="text-text text-opacity-60 mb-4">
              Unable to load latest posts from Medium. Showing cached posts.
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="text-accent border-accent hover:bg-accent/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Show success indicator when Medium posts are loaded */}
        {!loading && !error && mediumPosts.length > 0 && (
          <div className="text-center mb-8">
            <Badge variant="outline" className="text-green-600 border-green-600">
              ✓ Live posts from Medium
            </Badge>
          </div>
        )}

        {/* Category filters */}
        {!loading && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-4 py-2 text-sm",
                  selectedCategory === category 
                    ? "bg-accent hover:bg-accent/90 text-white" 
                    : "hover:bg-accent/10 text-text border-border"
                )}
                onClick={() => setSelectedCategory(category)}
                role="button"
                aria-pressed={selectedCategory === category}
                aria-label={`Filter by ${category} category`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedCategory(category);
                  }
                }}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* Blog posts grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map((post) => (
              <Card 
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none bg-white"
              >
                <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer">
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*_GQKvtIhZTwHWxV91mJAuQ.jpeg';
                      }}
                    />
                  </div>
                  <CardHeader>
                                      <div className="flex items-center gap-4 text-sm text-text/60 mb-2">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={16} className="text-accent" />
                      {post.pubDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} className="text-accent" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-text/70 mb-4">{post.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="text-accent hover:text-accent/80 p-0"
                  >
                      Read More <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                              {currentPage === 1 ? (
                <span 
                  className="inline-flex items-center justify-center gap-1 pl-2.5 h-10 px-4 py-2 text-sm font-medium rounded-md text-accent opacity-50 cursor-not-allowed"
                  aria-disabled="true"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </span>
              ) : (
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="text-accent hover:text-accent/80"
                  href="#"
                  aria-label="Go to previous page"
                />
              )}
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                isActive={currentPage === 1}
                className={cn(
                  "text-accent",
                  currentPage === 1 && "border-accent"
                )}
                href="#"
                onClick={() => setCurrentPage(1)}
                aria-label="Go to page 1"
                aria-current={currentPage === 1 ? "page" : undefined}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              {currentPage * postsPerPage >= filteredPosts.length ? (
                <span 
                  className="inline-flex items-center justify-center gap-1 pr-2.5 h-10 px-4 py-2 text-sm font-medium rounded-md text-accent opacity-50 cursor-not-allowed"
                  aria-disabled="true"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </span>
              ) : (
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="text-accent hover:text-accent/80"
                  href="#"
                  aria-label="Go to next page"
                />
              )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
