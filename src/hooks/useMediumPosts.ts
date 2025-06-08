import { useState, useEffect } from 'react';

export interface MediumPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  pubDate: string;
  readTime: string;
  category: string[];
  imageUrl: string;
  mediumUrl: string;
  author: string;
}

const CORS_PROXY = 'https://corsproxy.io/?';
const MEDIUM_RSS_URL = 'https://medium.com/@pranav.reveendran/feed';

// Fallback posts in case Medium API fails
const FALLBACK_POSTS: MediumPost[] = [
  {
    id: 'fallback-1',
    title: 'Autonomous Vehicle Data Processing Pipeline',
    excerpt: 'Building a real-time data processing pipeline for autonomous vehicle sensor data using modern data engineering tools...',
    content: 'Complete guide to building autonomous vehicle data processing systems',
    pubDate: 'December 15, 2024',
    readTime: '5 min read',
    category: ['Autonomous Vehicles', 'Data Engineering'],
    imageUrl: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*_GQKvtIhZTwHWxV91mJAuQ.jpeg',
    mediumUrl: 'https://medium.com/@pranav.reveendran',
    author: 'Pranav Reveendran'
  },
  {
    id: 'fallback-2',
    title: 'Building AI-Powered Healthcare Analytics',
    excerpt: 'Exploring machine learning applications in healthcare data analysis and predictive modeling for better patient outcomes...',
    content: 'Deep dive into healthcare AI and machine learning applications',
    pubDate: 'November 28, 2024',
    readTime: '7 min read',
    category: ['Healthcare', 'Artificial Intelligence'],
    imageUrl: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*VqDLCFXr1IpK4_bjQlqrbQ.jpeg',
    mediumUrl: 'https://medium.com/@pranav.reveendran',
    author: 'Pranav Reveendran'
  },
  {
    id: 'fallback-3',
    title: 'Cloud-Native Data Engineering with AWS',
    excerpt: 'Best practices for building scalable data pipelines using AWS services like Lambda, Glue, and Redshift...',
    content: 'Comprehensive guide to AWS data engineering services and architecture',
    pubDate: 'November 10, 2024',
    readTime: '6 min read',
    category: ['Cloud Computing', 'Data Engineering'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&h=480&fit=crop&crop=entropy&auto=format&q=80',
    mediumUrl: 'https://medium.com/@pranav.reveendran',
    author: 'Pranav Reveendran'
  }
];

// Function to extract image URL from content
const extractImageUrl = (content: string): string => {
  // Try multiple image extraction patterns for Medium
  const patterns = [
    // Medium CDN images
    /https:\/\/miro\.medium\.com\/[^"'\s)]+/i,
    // Regular img src tags
    /<img[^>]+src=["']([^"']+)["'][^>]*>/i,
    // Medium specific image patterns
    /https:\/\/cdn-images-\d+\.medium\.com\/[^"'\s)]+/i,
    // Any https image URL in the content
    /https:\/\/[^"'\s)]*\.(jpg|jpeg|png|webp|gif)[^"'\s)]*/i
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const imageUrl = match[1] || match[0];
      // Ensure we get a high-quality Medium image
      if (imageUrl.includes('miro.medium.com')) {
        // Convert to consistent format for better quality
        return imageUrl.replace(/\/resize:[^\/]+\//, '/resize:fit:720/format:webp/');
      }
      return imageUrl;
    }
  }
  
  // Enhanced fallback images based on content
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('autonomous') || lowerContent.includes('vehicle')) {
    return 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*_GQKvtIhZTwHWxV91mJAuQ.jpeg';
  } else if (lowerContent.includes('ai') || lowerContent.includes('gpt')) {
    return 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*1SXJZUnLRqhdwTmlkZIgPw.jpeg';
  } else if (lowerContent.includes('health') || lowerContent.includes('asthma')) {
    return 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*VqDLCFXr1IpK4_bjQlqrbQ.jpeg';
  } else if (lowerContent.includes('data') || lowerContent.includes('engineering')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&h=480&fit=crop&crop=entropy&auto=format&q=80';
  }
  
  // Default fallback
  return 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*_GQKvtIhZTwHWxV91mJAuQ.jpeg';
};

// Function to extract plain text excerpt from HTML content
const extractExcerpt = (content: string, maxLength = 150): string => {
  const plainText = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength).trim() + '...'
    : plainText.trim();
};

// Function to estimate read time
const estimateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Function to extract categories from Medium content
const extractCategories = (content: string): string[] => {
  // Medium doesn't provide explicit categories in RSS, so we'll infer from content
  const categories: string[] = [];
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('autonomous') || lowerContent.includes('vehicle') || lowerContent.includes('car')) {
    categories.push('Autonomous Vehicles');
  }
  if (lowerContent.includes('ai') || lowerContent.includes('artificial intelligence') || lowerContent.includes('machine learning') || lowerContent.includes('gpt')) {
    categories.push('Artificial Intelligence');
  }
  if (lowerContent.includes('health') || lowerContent.includes('medical') || lowerContent.includes('asthma')) {
    categories.push('Healthcare');
  }
  if (lowerContent.includes('data') || lowerContent.includes('pipeline') || lowerContent.includes('engineering')) {
    categories.push('Data Engineering');
  }
  if (lowerContent.includes('cloud') || lowerContent.includes('aws') || lowerContent.includes('azure')) {
    categories.push('Cloud Computing');
  }
  
  return categories.length > 0 ? categories : ['Technology'];
};

export const useMediumPosts = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch RSS feed via CORS proxy
        const response = await fetch(`${CORS_PROXY}${MEDIUM_RSS_URL}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        
        // Check for parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          throw new Error('Failed to parse RSS feed');
        }
        
        const items = xmlDoc.querySelectorAll('item');
        
        const mediumPosts: MediumPost[] = Array.from(items).map((item, index) => {
          const title = item.querySelector('title')?.textContent || 'Untitled';
          const link = item.querySelector('link')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          
          // Try multiple selectors for content
          const contentEncoded = item.querySelector('content\\:encoded')?.textContent || 
                               item.querySelector('description')?.textContent ||
                               item.textContent || '';
          
          const author = item.querySelector('dc\\:creator')?.textContent || 'Pranav Reveendran';
          
          // Debug logging for development
          console.log('Processing Medium post:', {
            title: title.substring(0, 50),
            hasContent: !!contentEncoded,
            contentLength: contentEncoded.length,
            contentPreview: contentEncoded.substring(0, 200)
          });
          
          // Extract image and create excerpt
          const imageUrl = extractImageUrl(contentEncoded + ' ' + title);
          const excerpt = extractExcerpt(contentEncoded);
          const readTime = estimateReadTime(contentEncoded);
          const categories = extractCategories(contentEncoded + ' ' + title);
          
          // Format date
          const formattedDate = pubDate ? 
            new Date(pubDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Recent';

          console.log('Extracted image URL:', imageUrl);

          return {
            id: `medium-${index}-${Date.now()}`,
            title: title.replace(/\[.*?\]/g, '').trim(), // Remove any bracketed text
            excerpt,
            content: contentEncoded,
            pubDate: formattedDate,
            readTime,
            category: categories,
            imageUrl,
            mediumUrl: link,
            author
          };
        });
        
        setPosts(mediumPosts);
      } catch (err) {
        console.error('Error fetching Medium posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
        
        // Fallback to static posts if Medium fetch fails
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  return { posts, loading, error };
}; 