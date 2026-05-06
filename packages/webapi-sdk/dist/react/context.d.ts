import { type ReactNode } from 'react';
import { WebApiClient } from '../client/WebApiClient';
import type { WebApiClientConfig } from '../types/common';
export interface WebApiProviderProps {
    config: WebApiClientConfig;
    children: ReactNode;
}
export declare function WebApiProvider({ config, children }: WebApiProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useWebApiClient(): WebApiClient;
//# sourceMappingURL=context.d.ts.map