import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { Concept } from '@ohdsi/webapi-sdk';
import { useWebApiClient } from './useWebApiClient';

export function useVocabularySearch(query: Ref<string>, sourceKey: Ref<string | null>) {
  const client = useWebApiClient();
  const data = ref<Concept[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  watch([query, sourceKey], ([q, key]) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    if (!q.trim() || !key) {
      data.value = [];
      isLoading.value = false;
      return;
    }
    isLoading.value = true;
    debounceTimer = setTimeout(async () => {
      error.value = null;
      try {
        data.value = await client.vocabulary.searchByText(key, q);
      } catch (err) {
        error.value = err as Error;
      } finally {
        isLoading.value = false;
      }
    }, 300);
  });

  return { data, isLoading, error };
}
