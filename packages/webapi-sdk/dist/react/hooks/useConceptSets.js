import { useState, useEffect } from 'react';
import { useWebApiClient } from '../context';
export function useConceptSets() {
    const client = useWebApiClient();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tick, setTick] = useState(0);
    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        setError(null);
        client.conceptSets.list()
            .then((items) => { if (!cancelled) {
            setData(items);
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
//# sourceMappingURL=useConceptSets.js.map