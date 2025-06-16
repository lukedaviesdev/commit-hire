import { useCallback } from 'react';

import { useLocalStorage } from './use-local-storage/use-local-storage';

export const useSavedJobs = () => {
  const [savedIds, setSavedIds] = useLocalStorage<string[]>('savedJobs', []);

  const isSaved = useCallback(
    (id: string): boolean => {
      return savedIds.includes(id);
    },
    [savedIds],
  );

  const toggleSave = useCallback(
    (id: string): void => {
      setSavedIds((currentSavedIds) => {
        if (currentSavedIds.includes(id)) {
          // Remove from saved
          return currentSavedIds.filter((savedId) => savedId !== id);
        } else {
          // Add to saved
          return [...currentSavedIds, id];
        }
      });
    },
    [setSavedIds],
  );

  return {
    savedIds,
    isSaved,
    toggleSave,
  };
};
