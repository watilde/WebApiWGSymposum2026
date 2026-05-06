<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSources } from '../composables/useSources';
import { useVocabularySearch } from '../composables/useVocabularySearch';

const { data: sources } = useSources();
const query = ref('');
const selectedSource = ref<string | null>(null);
const { data: concepts, isLoading, error } = useVocabularySearch(query, selectedSource);

const vocabSources = computed(() =>
  sources.value.filter((s) => s.daimons.some((d) => d.daimonType === 'Vocabulary'))
);

function onSourceChange(e: Event) {
  selectedSource.value = (e.target as HTMLSelectElement).value || null;
}

function standardLabel(code: string | undefined) {
  if (code === 'S') return { text: 'Standard', cls: 'bg-green-100 text-green-700' };
  if (code === 'C') return { text: 'Classification', cls: 'bg-yellow-100 text-yellow-700' };
  return { text: 'Non-standard', cls: 'bg-gray-100 text-gray-600' };
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Vocabulary Search</h1>
    <p class="text-sm text-gray-500 mb-6">Search OMOP CDM concepts</p>

    <div class="card p-4 mb-6 flex flex-col sm:flex-row gap-3">
      <select
        :value="selectedSource ?? ''"
        class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ohdsi-blue"
        @change="onSourceChange"
      >
        <option value="">Select a data source</option>
        <option v-for="s in vocabSources" :key="s.sourceKey" :value="s.sourceKey">
          {{ s.sourceName }}
        </option>
      </select>
      <input
        v-model="query"
        type="text"
        placeholder="Search concepts (e.g. 'Type 2 diabetes')"
        class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ohdsi-blue"
      />
    </div>

    <p v-if="isLoading" class="text-gray-500">Searching…</p>
    <div v-if="error" class="card p-4 border-red-200 bg-red-50 text-red-700 text-sm">
      {{ error.message }}
    </div>

    <div v-if="!isLoading && !error && concepts.length > 0" class="card overflow-hidden">
      <div class="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
        {{ concepts.length }} result{{ concepts.length !== 1 ? 's' : '' }}
      </div>
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Concept ID</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Concept Name</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Domain</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Vocabulary</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Standard</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="c in concepts"
            :key="c.conceptId"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-3 font-mono text-gray-500">{{ c.conceptId }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ c.conceptName }}</td>
            <td class="px-4 py-3">
              <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {{ c.domainId }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-500">{{ c.vocabularyId }}</td>
            <td class="px-4 py-3">
              <span
                class="text-xs px-2 py-0.5 rounded-full"
                :class="standardLabel(c.standardConcept).cls"
              >
                {{ standardLabel(c.standardConcept).text }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && !error && query && selectedSource && concepts.length === 0"
      class="card p-8 text-center text-gray-400"
    >
      No concepts found for "{{ query }}".
    </div>
    <div
      v-if="!query || !selectedSource"
      class="card p-8 text-center text-gray-400"
    >
      Select a data source and enter a search term to find OMOP concepts.
    </div>
  </div>
</template>
