import { useState, useEffect } from 'react';
import { useWebApiClient } from '../context';
import type { SourceInfo } from '../../types/source';

export interface UseSourcesResult {
  data: SourceInfo[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useSources(): UseSourcesResult {
  const client = useWebApiClient();
  const [data, setData] = useState<SourceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    client.sources.list()
      .then((sources) => { if (!cancelled) { setData(sources); setIsLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err); setIsLoading(false); } });
    return () => { cancelled = true; };
  }, [client, tick]);

  return { data, isLoading, error, refetch: () => setTick(t => t + 1) };
}
