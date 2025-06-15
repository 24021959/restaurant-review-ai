
interface ReviewsResponse {
  reviews: any[];
  error?: string;
  rateLimited?: boolean;
}

interface GoogleBusinessConfig {
  maxRetries: number;
  retryDelay: number;
  cacheTTL: number;
}

export class GoogleBusinessService {
  private cache = new Map<string, { data: any; expires: number }>();
  private config: GoogleBusinessConfig = {
    maxRetries: 3,
    retryDelay: 2000,
    cacheTTL: 5 * 60 * 1000 // 5 minuti
  };

  async getReviews(
    businessId: string, 
    apiKeyRotation: any,
    useCache = true
  ): Promise<ReviewsResponse> {
    // Controlla la cache prima
    if (useCache) {
      const cached = this.getCachedData(`reviews_${businessId}`);
      if (cached) {
        console.log('Restituendo recensioni dalla cache');
        return { reviews: cached };
      }
    }

    let lastError: any = null;
    
    for (let attempt = 0; attempt < this.config.maxRetries; attempt++) {
      try {
        const apiKey = await apiKeyRotation.getAvailableKey();
        
        if (!apiKey) {
          return {
            reviews: [],
            error: 'Tutti i limiti API sono stati raggiunti. Riprova più tardi.',
            rateLimited: true
          };
        }

        const response = await this.makeGoogleApiRequest(businessId, apiKey);
        
        if (response.ok) {
          const data = await response.json();
          
          // Salva in cache
          this.setCachedData(`reviews_${businessId}`, data.reviews);
          
          // Registra l'utilizzo
          await apiKeyRotation.recordUsage(apiKey);
          
          return { reviews: data.reviews || [] };
        }

        // Gestisce i diversi tipi di errore
        if (response.status === 429) {
          console.log(`Rate limit raggiunto per la chiave, tentativo ${attempt + 1}`);
          await this.delay(this.config.retryDelay * (attempt + 1));
          continue;
        }

        throw new Error(`API Error: ${response.status} ${response.statusText}`);

      } catch (error) {
        lastError = error;
        console.error(`Tentativo ${attempt + 1} fallito:`, error);
        
        if (attempt < this.config.maxRetries - 1) {
          await this.delay(this.config.retryDelay * (attempt + 1));
        }
      }
    }

    return {
      reviews: [],
      error: `Impossibile recuperare le recensioni dopo ${this.config.maxRetries} tentativi: ${lastError?.message}`,
      rateLimited: false
    };
  }

  private async makeGoogleApiRequest(businessId: string, apiKey: string): Promise<Response> {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${businessId}/locations/${businessId}/reviews`;
    
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.data;
    }
    
    if (cached) {
      this.cache.delete(key); // Rimuove cache scaduta
    }
    
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, {
      data,
      expires: Date.now() + this.config.cacheTTL
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Metodo per pulire la cache manualmente
  clearCache(): void {
    this.cache.clear();
  }
}

// Singleton instance
export const googleBusinessService = new GoogleBusinessService();
