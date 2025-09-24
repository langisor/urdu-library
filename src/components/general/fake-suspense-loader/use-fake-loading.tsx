"use client";

import { useState, useCallback } from "react";
import type { LoadingStep } from "./fake-suspense-loader";

interface UseFakeLoadingOptions {
  steps: LoadingStep[];
  onComplete?: () => void;
}

export function useFakeLoading({ steps, onComplete }: UseFakeLoadingOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
    onComplete?.();
  }, [onComplete]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    handleComplete,
  };
}
