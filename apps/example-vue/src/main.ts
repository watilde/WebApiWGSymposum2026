import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createWebApiClient } from '@ohdsi/webapi-sdk';
import App from './App.vue';
import Sources from './pages/Sources.vue';
import Cohorts from './pages/Cohorts.vue';
import VocabularySearch from './pages/VocabularySearch.vue';
import { WEB_API_CLIENT_KEY } from './composables/useWebApiClient';
import './globals.css';

const baseUrl = import.meta.env.VITE_WEBAPI_BASE_URL ?? 'http://localhost:8080';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/sources' },
    { path: '/sources', component: Sources },
    { path: '/cohorts', component: Cohorts },
    { path: '/vocabulary', component: VocabularySearch },
  ],
});

const app = createApp(App);
app.use(router);
app.provide(WEB_API_CLIENT_KEY, createWebApiClient({ baseUrl }));
app.mount('#app');
