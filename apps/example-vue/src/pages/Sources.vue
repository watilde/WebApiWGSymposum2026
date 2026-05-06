<script setup lang="ts">
import { useSources } from '../composables/useSources';

const { data: sources, isLoading, error, refetch } = useSources();
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Data Sources</h1>
        <p class="text-sm text-gray-500">Registered CDM data sources</p>
      </div>
      <button class="btn-secondary" @click="refetch">Refresh</button>
    </div>

    <p v-if="isLoading" class="text-gray-500">Loading sources…</p>
    <div v-if="error" class="card p-4 border-red-200 bg-red-50 text-red-700 text-sm">
      {{ error.message }}
    </div>

    <div v-if="!isLoading && !error" class="space-y-3">
      <div v-if="sources.length === 0" class="card p-8 text-center text-gray-400">
        No data sources registered.
      </div>
      <div v-for="source in sources" :key="source.sourceKey" class="card p-4">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-gray-900">{{ source.sourceName }}</h3>
            <p class="text-sm text-gray-500 font-mono mt-0.5">{{ source.sourceKey }}</p>
          </div>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {{ source.sourceDialect }}
          </span>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="d in source.daimons"
            :key="d.sourceDaimonId"
            class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono"
          >
            {{ d.daimonType }}: {{ d.tableQualifier }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
