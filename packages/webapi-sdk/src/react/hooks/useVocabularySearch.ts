import { useState, useEffect, useRef } from 'react';
import { useWebApiClient } from '../context';
import type { Concept } from '../../types/concept';

export interface UseVocabularySearchResult {
  data: Concept[];
  isLoading: boolean;
  error: Error | null;
}

export function useVocabularySearch(query: string, sourceKey: string | null): UseVocabularySearchResult {
  const client = useWebApiClient();
  const [data, setData] = useState<Concept[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query.trim() || !sourceKey) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    let cancelled = false;
    debounceRef.current = setTimeout(() => {
      client.vocabulary.searchByText(sourceKey, query)
        .then((results) => { if (!cancelled) { setData(results); setIsLoading(false); } })
        .catch((err: Error) => { if (!cancelled) { setError(err); setIsLoading(false); } });
    }, 300);

    return () => {
      cancelled = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [client, query, sourceKey]);

  return { data, isLoading, error };
}
