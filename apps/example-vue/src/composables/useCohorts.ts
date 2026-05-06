import { ref, onMounted } from 'vue';
import type { CohortDefinitionInfo } from '@ohdsi/webapi-sdk';
import { useWebApiClient } from './useWebApiClient';

export function useCohorts() {
  const client = useWebApiClient();
  const data = ref<CohortDefinitionInfo[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function fetch() {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await client.cohorts.list();
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(fetch);

  return { data, isLoading, error, refetch: fetch };
}
