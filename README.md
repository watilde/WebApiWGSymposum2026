# WebAPI WG Symposium 2026

A monorepo for the OHDSI WebAPI Working Group Symposium 2026. It contains a TypeScript SDK for OHDSI WebAPI, React and Vue example apps, a full reference application, and a minimal starter kit.

## Repository structure

```
.
├── packages/
│   └── webapi-sdk/          # @ohdsi/webapi-sdk — TypeScript SDK + React hooks
├── apps/
│   ├── example-react/       # Example app built with React (port 5173)
│   ├── example-vue/         # Example app built with Vue 3 (port 5174)
│   ├── reference-app/       # Full reference implementation (React + Tailwind)
│   └── starter-kit/         # Minimal starting point for workshop attendees
└── docker/                  # Docker Compose stack (WebAPI + Atlas + Postgres)
```

## Prerequisites

- Node.js 18+
- npm 8+ (workspaces)
- Docker & Docker Compose (for the local WebAPI backend)

## Quick start

### 1. Start the backend

```bash
cp docker/.env.example docker/.env
npm run docker:up
```

This starts three containers:

| Container | Description | Port |
|---|---|---|
| `broadsea-atlasdb` | PostgreSQL with Eunomia demo CDM pre-loaded | 5432 |
| `webapi-symposium-webapi` | OHDSI WebAPI | 8080 |
| `webapi-symposium-atlas` | OHDSI Atlas | 8081 |

WebAPI takes ~3 minutes to initialize on first run. Check readiness:

```bash
npm run docker:logs
```

### 2. Register the demo data source

Once WebAPI is healthy, register the Eunomia CDM source:

```bash
bash docker/register-source.sh
```

### 3. Install dependencies and build the SDK

```bash
npm install
npm run build:sdk
```

### 4. Run an example app

**React** (port 5173):

```bash
cp apps/example-react/.env.example apps/example-react/.env
npm run dev:example-react
```

**Vue** (port 5174):

```bash
cp apps/example-vue/.env.example apps/example-vue/.env
npm run dev:example-vue
```

## packages/webapi-sdk

`@ohdsi/webapi-sdk` is a zero-dependency TypeScript client for OHDSI WebAPI. It ships both a plain client and optional React hooks.

### Plain client

```ts
import { createWebApiClient } from '@ohdsi/webapi-sdk';

const client = createWebApiClient({ baseUrl: 'http://localhost:8080' });

const sources = await client.sources.list();
const cohorts = await client.cohorts.list();
const concepts = await client.vocabulary.searchByText('EUNOMIA', 'diabetes');
```

Available namespaces on `WebApiClient`:

| Namespace | Description |
|---|---|
| `client.sources` | Data source management |
| `client.cohorts` | Cohort definitions & generation |
| `client.conceptSets` | Concept set definitions |
| `client.vocabulary` | Vocabulary & concept search |
| `client.analyses` | IR, characterization, estimation, prediction, pathways |

### React hooks (`@ohdsi/webapi-sdk/react`)

```tsx
import { WebApiProvider, useSources, useVocabularySearch } from '@ohdsi/webapi-sdk/react';

function App() {
  return (
    <WebApiProvider config={{ baseUrl: 'http://localhost:8080' }}>
      <MyComponent />
    </WebApiProvider>
  );
}

function MyComponent() {
  const { data: sources, isLoading, error } = useSources();
  // ...
}
```

Available hooks: `useSources`, `useCohorts`, `useConceptSets`, `useVocabularySearch`.

Each hook returns `{ data, isLoading, error, refetch }`.

## apps/example-react

React 18 example using `@ohdsi/webapi-sdk/react`. The SDK's `WebApiProvider` sets up the client; pages consume data via hooks.

Pages: Sources, Cohorts, Vocabulary Search.

```
src/
├── App.tsx                  # WebApiProvider + React Router
└── pages/
    ├── Sources.tsx          # useSources()
    ├── Cohorts.tsx          # useCohorts()
    └── VocabularySearch.tsx # useSources() + useVocabularySearch()
```

## apps/example-vue

Vue 3 example using the plain `@ohdsi/webapi-sdk` client. The client is provided via Vue's `provide`/`inject` API and wrapped in composables that return `ref`-based reactive state.

Pages: Sources, Cohorts, Vocabulary Search.

```
src/
├── main.ts                  # createWebApiClient + app.provide()
├── App.vue                  # Vue Router layout
├── composables/
│   ├── useWebApiClient.ts   # inject() the client
│   ├── useSources.ts
│   ├── useCohorts.ts
│   └── useVocabularySearch.ts
└── pages/
    ├── Sources.vue
    ├── Cohorts.vue
    └── VocabularySearch.vue
```

## apps/reference-app

A complete React application demonstrating all SDK features.

Pages: Home, Sources, Cohorts, Vocabulary Search, Concept Sets.

## apps/starter-kit

A minimal React + Tailwind template pre-wired with `WebApiProvider`, `useSources`, and `useVocabularySearch`. Edit `src/App.tsx` to build your own application.

## npm scripts

| Script | Description |
|---|---|
| `npm run dev:example-react` | Start the React example app (port 5173) |
| `npm run dev:example-vue` | Start the Vue example app (port 5174) |
| `npm run dev:reference` | Start the reference app (port 5173) |
| `npm run dev:starter` | Start the starter kit (port 5173) |
| `npm run build:sdk` | Build the SDK |
| `npm run build` | Build SDK and all apps |
| `npm run docker:up` | Start the Docker backend stack |
| `npm run docker:down` | Stop the Docker stack |
| `npm run docker:logs` | Tail WebAPI container logs |
