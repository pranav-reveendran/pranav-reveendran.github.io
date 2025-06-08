import { useEffect, useState } from 'react';

const ServiceWorkerRegistration = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    // Only register service worker in production
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          // Service worker registered successfully
          
          // Check for updates periodically
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setIsUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          // Service worker registration failed
        });
    }
  }, []);

  const updateServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
      window.location.reload();
    }
  };

  return (
    <>
      {isUpdateAvailable && (
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-surface shadow-lg rounded-lg border border-border">
          <p className="mb-2">New content is available!</p>
          <button 
            onClick={updateServiceWorker}
            className="bg-accent text-white px-3 py-1 rounded-md hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Update
          </button>
        </div>
      )}
    </>
  );
};

export default ServiceWorkerRegistration;
