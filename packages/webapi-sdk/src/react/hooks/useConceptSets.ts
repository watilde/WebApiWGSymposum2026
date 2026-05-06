import { useState, useEffect } from 'react';
import { useWebApiClient } from '../context';
import type { ConceptSetDTO } from '../../types/concept';

export interface UseConceptSetsResult {
  data: ConceptSetDTO[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useConceptSets(): UseConceptSetsResult {
  const client = useWebApiClient();
  const [data, setData] = useState<ConceptSetDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    client.conceptSets.list()
      .then((items) => { if (!cancelled) { setData(items); setIsLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err); setIsLoading(false); } });
    return () => { cancelled = true; };
  }, [client, tick]);

  return { data, isLoading, error, refetch: () => setTick(t => t + 1) };
}
