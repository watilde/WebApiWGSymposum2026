import { useState, useEffect } from 'react';
import { useWebApiClient } from '../context';
export function useCohorts() {
    const client = useWebApiClient();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tick, setTick] = useState(0);
    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        setError(null);
        client.cohorts.list()
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
export function useCohort(id) {
    const client = useWebApiClient();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (id === null) {
            setData(null);
            return;
        }
        let cancelled = false;
        setIsLoading(true);
        setError(null);
        client.cohorts.get(id)
            .then((item) => { if (!cancelled) {
            setData(item);
            setIsLoading(false);
        } })
            .catch((err) => { if (!cancelled) {
            setError(err);
            setIsLoading(false);
        } });
        return () => { cancelled = true; };
    }, [client, id]);
    return { data, isLoading, error };
}
//# sourceMappingURL=useCohorts.js.map