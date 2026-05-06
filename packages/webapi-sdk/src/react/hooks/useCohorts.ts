import { useState, useEffect } from 'react';
import { useWebApiClient } from '../context';
import type { CohortDefinitionInfo, CohortDefinitionDTO } from '../../types/cohort';

export interface UseCohortsResult {
  data: CohortDefinitionInfo[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useCohorts(): UseCohortsResult {
  const client = useWebApiClient();
  const [data, setData] = useState<CohortDefinitionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    client.cohorts.list()
      .then((items) => { if (!cancelled) { setData(items); setIsLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err); setIsLoading(false); } });
    return () => { cancelled = true; };
  }, [client, tick]);

  return { data, isLoading, error, refetch: () => setTick(t => t + 1) };
}

export interface UseCohortResult {
  data: CohortDefinitionDTO | null;
  isLoading: boolean;
  error: Error | null;
}

export function useCohort(id: number | null): UseCohortResult {
  const client = useWebApiClient();
  const [data, setData] = useState<CohortDefinitionDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id === null) { setData(null); return; }
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    client.cohorts.get(id)
      .then((item) => { if (!cancelled) { setData(item); setIsLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err); setIsLoading(false); } });
    return () => { cancelled = true; };
  }, [client, id]);

  return { data, isLoading, error };
}
