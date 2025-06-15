
/**
 * Utility service to manage Firecrawl API integration in the client.
 * Stores the API key in localStorage and provides a method to crawl websites.
 */

class FirecrawlService {
  static API_KEY_STORAGE_KEY = 'firecrawl_api_key';

  // Store API key in localStorage
  static saveApiKey(apiKey: string) {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  // Retrieve API key from localStorage
  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  // Crawl website using Firecrawl public API (client-side usage)
  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not set' };
    }
    try {
      const resp = await fetch('https://api.firecrawl.dev/v1/crawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          url,
          limit: 10,
          scrapeOptions: { formats: ['markdown', 'html'] }
        }),
      });
      if (!resp.ok) {
        return { success: false, error: `Status ${resp.status}: ${resp.statusText}` };
      }
      const data = await resp.json();
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Unknown error' };
    }
  }
}

export { FirecrawlService };
