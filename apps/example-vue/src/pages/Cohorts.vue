<script setup lang="ts">
import { useCohorts } from '../composables/useCohorts';

const { data: cohorts, isLoading, error, refetch } = useCohorts();

function formatDate(ts: number | string | undefined) {
  if (!ts) return '—';
  return new Date(ts).toLocaleDateString();
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Cohort Definitions</h1>
        <p class="text-sm text-gray-500">
          {{ cohorts.length }} definition{{ cohorts.length !== 1 ? 's' : '' }}
        </p>
      </div>
      <button class="btn-secondary" @click="refetch">Refresh</button>
    </div>

    <p v-if="isLoading" class="text-gray-500">Loading cohorts…</p>
    <div v-if="error" class="card p-4 border-red-200 bg-red-50 text-red-700 text-sm">
      {{ error.message }}
    </div>

    <div v-if="!isLoading && !error" class="card overflow-hidden">
      <div v-if="cohorts.length === 0" class="p-8 text-center text-gray-400">
        No cohort definitions found.
      </div>
      <table v-else class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left font-medium text-gray-500">ID</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Name</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Created By</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Created Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="cohort in cohorts"
            :key="cohort.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-3 font-mono text-gray-500">{{ cohort.id }}</td>
            <td class="px-4 py-3">
              <div class="font-medium text-gray-900">{{ cohort.name }}</div>
              <div v-if="cohort.description" class="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
                {{ cohort.description }}
              </div>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ cohort.createdBy?.login ?? '—' }}</td>
            <td class="px-4 py-3 text-gray-500">{{ formatDate(cohort.createdDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
