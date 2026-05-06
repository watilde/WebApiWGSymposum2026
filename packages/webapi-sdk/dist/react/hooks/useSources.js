import { useState, useEffect } from 'react';
import { useWebApiClient } from '../context';
export function useSources() {
    const client = useWebApiClient();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tick, setTick] = useState(0);
    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        setError(null);
        client.sources.list()
            .then((sources) => { if (!cancelled) {
            setData(sources);
            setIsLoading(false);
        } })
            .catch((err) => { if (!cancelled) {
            setError(err);
            setIsLoading(false);
        } });
        return () => { cancelled = true; };
    }, [client, tick]);
    return { data, isLoading, error, refetch: () => setTick(t => t + 1) };
}
//# sourceMappingURL=useSources.js.map