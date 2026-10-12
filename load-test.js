import http from 'k6/http';
import { check, sleep } from 'k6';
// Import the HTML reporter helper
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}

// handleSummary is automatically called by k6 at the end of the test run
export function handleSummary(data) {
  return {
    // Generates the HTML report named 'summary.html'
    'summary.html': htmlReport(data),
    // Optional: also print the standard text summary to the console logs
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}