import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
import { WebApiClient } from '../client/WebApiClient';
const WebApiContext = createContext(null);
export function WebApiProvider({ config, children }) {
    const client = React.useMemo(() => new WebApiClient(config), [config.baseUrl]);
    return (_jsx(WebApiContext.Provider, { value: client, children: children }));
}
export function useWebApiClient() {
    const client = useContext(WebApiContext);
    if (!client) {
        throw new Error('useWebApiClient must be used within a WebApiProvider');
    }
    return client;
}
//# sourceMappingURL=context.js.map