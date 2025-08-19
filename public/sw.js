const CACHE_NAME = "Screenify-v1";
const STATIC_CACHE_URLS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/images/bg-main.svg",
  "/images/bg-auth.svg",
  "/images/bg-small.svg",
  "/images/pdf.png",
  "/icons/ats-good.svg",
  "/icons/ats-warning.svg",
  "/icons/ats-bad.svg",
  "/icons/check.svg",
  "/icons/cross.svg",
  "/icons/info.svg",
  "/icons/warning.svg",
  "/icons/pin.svg",
  "/icons/back.svg",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch((error) => {
        console.error("Cache install failed:", error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when possible
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!event.request.url.startsWith("http")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache for static assets
          if (STATIC_CACHE_URLS.includes(new URL(event.request.url).pathname)) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        })
        .catch(() => {
          // Return offline page or fallback
          if (event.request.destination === "document") {
            return caches.match("/");
          }
        });
    })
  );
});

// Background sync for when connection is restored
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Handle background sync tasks here
      console.log("Background sync triggered")
    );
  }
});

// Push notifications (if needed in the future)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/icons/app-icon-192x192.png",
      badge: "/icons/app-icon-96x96.png",
      actions: [
        {
          action: "open",
          title: "Open Screenify",
        },
      ],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    event.waitUntil(clients.openWindow("/"));
  }
});
