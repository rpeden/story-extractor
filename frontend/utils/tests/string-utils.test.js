import { extractDomain } from "../string-utils.js";

test("domain should be extracted properly", () => {
  const testDomain = "http://www.reddit.com";
  const expected = "www.reddit.com";
  const result = extractDomain(testDomain);
  expect(expected).toBe(result);
});

test("domain without protocol should stay the same", () => {
  const testDomain = "www.cnn.com";
  const result = extractDomain(testDomain);
  expect(result).toBe(testDomain);
});
