
import React from 'react';

const SocialLinks = () => {
  return (
    <div className="mt-8 pt-8 border-t border-border">
      <h3 className="text-xl font-serif font-bold text-text mb-4">
        Connect With Me
      </h3>
      <div className="flex space-x-4">
        <a href="https://linkedin.com/in/pranav-reveendran" target="_blank" rel="noopener noreferrer" className="bg-surface text-accent p-3 rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-subtle hover:shadow-md" aria-label="LinkedIn Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="https://github.com/pranav-reveendran" target="_blank" rel="noopener noreferrer" className="bg-surface text-accent p-3 rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-subtle hover:shadow-md" aria-label="GitHub Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        </a>
        <a href="https://instagram.com/pranav_reveendran" target="_blank" rel="noopener noreferrer" className="bg-surface text-accent p-3 rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-subtle hover:shadow-md" aria-label="Instagram Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
        </a>
        <a href="https://topmate.io/pranav_reveendran" target="_blank" rel="noopener noreferrer" className="bg-surface text-accent p-3 rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-subtle hover:shadow-md" aria-label="TopMate Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
