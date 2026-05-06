import { ref, onMounted } from 'vue';
import type { SourceInfo } from '@ohdsi/webapi-sdk';
import { useWebApiClient } from './useWebApiClient';

export function useSources() {
  const client = useWebApiClient();
  const data = ref<SourceInfo[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function fetch() {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await client.sources.list();
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(fetch);

  return { data, isLoading, error, refetch: fetch };
}
