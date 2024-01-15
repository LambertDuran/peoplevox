import LRU from 'lru-cache';

export const cache = new LRU({
  max: 100,                // Maximum number of items in the cache
  maxAge: 1000 * 60 * 60,  // Maximum age of items in milliseconds (e.g., 1h)
});