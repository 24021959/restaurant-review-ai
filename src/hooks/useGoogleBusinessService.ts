
import { useCallback } from 'react';
import { useApiKeyRotation } from './useApiKeyRotation';
import { googleBusinessService } from '@/components/GoogleBusinessService';

export const useGoogleBusinessService = () => {
  const apiKeyRotation = useApiKeyRotation();

  const getReviews = useCallback(async (businessId: string, useCache = true) => {
    return googleBusinessService.getReviews(businessId, apiKeyRotation, useCache);
  }, [apiKeyRotation]);

  const getUsageStats = useCallback(() => {
    return apiKeyRotation.getUsageStats();
  }, [apiKeyRotation]);

  const isOverLimit = useCallback(() => {
    return apiKeyRotation.isOverLimit;
  }, [apiKeyRotation]);

  const clearCache = useCallback(() => {
    googleBusinessService.clearCache();
  }, []);

  return {
    getReviews,
    getUsageStats,
    isOverLimit,
    clearCache
  };
};
