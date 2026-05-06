import { useState, useEffect, useRef } from 'react';
import { useWebApiClient } from '../context';
export function useVocabularySearch(query, sourceKey) {
    const client = useWebApiClient();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const debounceRef = useRef(null);
    useEffect(() => {
        if (!query.trim() || !sourceKey) {
            setData([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        if (debounceRef.current)
            clearTimeout(debounceRef.current);
        let cancelled = false;
        debounceRef.current = setTimeout(() => {
            client.vocabulary.searchByText(sourceKey, query)
                .then((results) => { if (!cancelled) {
                setData(results);
                setIsLoading(false);
            } })
                .catch((err) => { if (!cancelled) {
                setError(err);
                setIsLoading(false);
            } });
        }, 300);
        return () => {
            cancelled = true;
            if (debounceRef.current)
                clearTimeout(debounceRef.current);
        };
    }, [client, query, sourceKey]);
    return { data, isLoading, error };
}
//# sourceMappingURL=useVocabularySearch.js.map