import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), interest-cohort=()',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; media-src 'self' https:; object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'self';"
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Temporarily disable PWA to fix static asset loading issues
    // This can be re-enabled later after ensuring proper asset caching
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Enhanced build optimization for aggressive minification
  build: {
    // Enable source maps only for debugging in production if needed
    sourcemap: false,
    
    // Target modern browsers for smaller bundles
    target: 'esnext',
    
    // Safe minification that preserves functionality
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        // Safe optimizations only
        dead_code: true,
        conditionals: true,
        evaluate: true,
        loops: true,
        unused: true
      },
      mangle: {
        // Basic name mangling
        reserved: ['React', 'ReactDOM']
      },
      format: {
        comments: false
      }
    },
    
    // Optimize chunks and reduce bundle size
    rollupOptions: {
      output: {
        // Let Vite handle chunking automatically for better optimization
        
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.facadeModuleId?.includes('node_modules')) {
            return 'vendor/[name]-[hash].js';
          }
          return 'chunks/[name]-[hash].js';
        },
        
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name]-[hash].css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
      
      // Basic tree shaking
      treeshake: {
        preset: 'recommended'
      }
    },
    
    // Increase chunk size warning limit for production
    chunkSizeWarningLimit: 500,
    
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    
    // Enable asset inlining for small files
    assetsInlineLimit: 4096, // 4KB
    
    // Report compressed file sizes
    reportCompressedSize: true,
    
    // Enable build analyzer
    write: true
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: [
      // Exclude large dependencies that should be code-split
    ]
  },
  
  // Enable aggressive esbuild optimizations for dependencies
  esbuild: {
    // Drop console in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Target modern browsers
    target: 'esnext',
    // Legal comments handling
    legalComments: 'none',
    // Minify identifiers
    minifyIdentifiers: true,
    // Minify syntax
    minifySyntax: true,
    // Minify whitespace
    minifyWhitespace: true
  }
}));
