// build-sw.js
import {generateSW} from 'workbox-build';

// Where the generated service worker will be written to:
const swDest = './dist/sw.js';

generateSW({
  swDest,
  globDirectory: './dist',
  globPatterns: [
    // The necessary CSS and JS for the app shell
    '**/*.js',
    '**/*.css',
    // The app shell itself
    
  ],
  // All navigations for URLs not precached will use this HTML
  navigateFallback: 'src/home.html'
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which precaches ${count} assets totaling ${size} bytes.`);
});