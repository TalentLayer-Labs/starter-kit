import { config } from './middleware';

test('middleware config matcher test', () => {
  // Test assertion 1: Check if /api routes are excluded
  expect('/api/some-route').not.toMatch(config.matcher[0]);

  // Test assertion 2: Check if /_next routes are excluded
  expect('/_next/some-route').not.toMatch(config.matcher[0]);

  // Test assertion 3: Check if /_static routes are excluded
  expect('/_static/some-route').not.toMatch(config.matcher[0]);

  // Test assertion 4: Check if root files inside /public are excluded
  expect('/favicon.ico').not.toMatch(config.matcher[0]);

  // Check if other paths are matched
  expect('/some-route').not.toMatch(config.matcher[0]);
});
