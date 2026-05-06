import React, { createContext, useContext, type ReactNode } from 'react';
import { WebApiClient } from '../client/WebApiClient';
import type { WebApiClientConfig } from '../types/common';

const WebApiContext = createContext<WebApiClient | null>(null);

export interface WebApiProviderProps {
  config: WebApiClientConfig;
  children: ReactNode;
}

export function WebApiProvider({ config, children }: WebApiProviderProps) {
  const client = React.useMemo(() => new WebApiClient(config), [config.baseUrl]);
  return (
    <WebApiContext.Provider value={client}>
      {children}
    </WebApiContext.Provider>
  );
}

export function useWebApiClient(): WebApiClient {
  const client = useContext(WebApiContext);
  if (!client) {
    throw new Error('useWebApiClient must be used within a WebApiProvider');
  }
  return client;
}
