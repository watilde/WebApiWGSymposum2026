<script setup lang="ts">
const navItems = [
  { label: 'Sources', to: '/sources' },
  { label: 'Cohorts', to: '/cohorts' },
  { label: 'Vocabulary Search', to: '/vocabulary' },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-ohdsi-blue text-white shadow">
      <div class="max-w-5xl mx-auto px-4 flex items-center gap-6 h-14">
        <span class="font-bold text-lg">OHDSI WebAPI</span>
        <span class="text-blue-200 text-sm">Vue Example</span>
        <nav class="flex gap-1 ml-4">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-3 py-1.5 rounded text-sm font-medium transition-colors hover:bg-white/10"
            active-class="bg-white/20"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
    </header>
    <main class="max-w-5xl mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
