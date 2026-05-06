import { inject } from 'vue';
import type { WebApiClient } from '@ohdsi/webapi-sdk';

export const WEB_API_CLIENT_KEY = Symbol('webApiClient');

export function useWebApiClient(): WebApiClient {
  const client = inject<WebApiClient>(WEB_API_CLIENT_KEY);
  if (!client) throw new Error('WebApiClient not provided — call app.provide(WEB_API_CLIENT_KEY, client) in main.ts');
  return client;
}
