# WebApi WG Symposum 2026

A monorepo for the OHDSI WebAPI Working Group Symposium 2026. It contains a TypeScript SDK for OHDSI WebAPI, a fully-featured reference application, and a minimal starter kit for attendees to build on top of.

## Repository structure

```
.
├── packages/
│   └── webapi-sdk/          # @ohdsi/webapi-sdk — TypeScript SDK + React hooks
├── apps/
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
- `broadsea-atlasdb` — PostgreSQL with the Eunomia demo CDM pre-loaded (port 5432)
- `webapi-symposium-webapi` — OHDSI WebAPI (port 8080)
- `webapi-symposium-atlas` — OHDSI Atlas (port 8081)

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

### 4. Run an app

Reference app (full-featured UI):

```bash
cp apps/reference-app/.env.example apps/reference-app/.env
npm run dev:reference        # http://localhost:5173
```

Starter kit (minimal template):

```bash
cp apps/starter-kit/.env.example apps/starter-kit/.env
npm run dev:starter          # http://localhost:5173
```

## packages/webapi-sdk

`@ohdsi/webapi-sdk` is a zero-dependency TypeScript client for OHDSI WebAPI. It ships both a plain client and optional React hooks.

### Plain client

```ts
import { createWebApiClient } from '@ohdsi/webapi-sdk';

const client = createWebApiClient({ baseUrl: 'http://localhost:8080/WebAPI' });

const sources = await client.sources.list();
const cohorts = await client.cohorts.list();
const results = await client.vocabulary.search('diabetes', 'EUNOMIA');
```

Available namespaces on `WebApiClient`:

| Namespace | Description |
|---|---|
| `client.sources` | Data source management |
| `client.cohorts` | Cohort definitions & generation |
| `client.conceptSets` | Concept set definitions |
| `client.vocabulary` | Vocabulary & concept search |
| `client.analyses` | IR, characterization, estimation, prediction, pathways |

### React hooks

```tsx
import { WebApiProvider, useSources, useVocabularySearch } from '@ohdsi/webapi-sdk/react';

function App() {
  return (
    <WebApiProvider config={{ baseUrl: 'http://localhost:8080/WebAPI' }}>
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

Each hook returns `{ data, isLoading, error }`.

## apps/reference-app

A complete React application demonstrating all SDK features. Pages:

- **Home** — connection status and server info
- **Sources** — list registered data sources
- **Cohorts** — browse cohort definitions
- **Vocabulary Search** — search concepts across a source
- **Concept Sets** — browse concept set definitions

Environment variable (`apps/reference-app/.env`):

```
VITE_WEBAPI_BASE_URL=http://localhost:8080/WebAPI
VITE_APP_TITLE=OHDSI WebAPI Reference App
```

## apps/starter-kit

A minimal React + Tailwind template pre-wired with `WebApiProvider`, `useSources`, and `useVocabularySearch`. Edit `apps/starter-kit/src/App.tsx` to build your own application.

Environment variable (`apps/starter-kit/.env`):

```
VITE_WEBAPI_BASE_URL=http://localhost:8080/WebAPI
```

## npm scripts

| Script | Description |
|---|---|
| `npm run dev:reference` | Start the reference app dev server |
| `npm run dev:starter` | Start the starter kit dev server |
| `npm run build:sdk` | Build the SDK |
| `npm run build` | Build SDK and all apps |
| `npm run docker:up` | Start the Docker backend stack |
| `npm run docker:down` | Stop the Docker stack |
| `npm run docker:logs` | Tail WebAPI container logs |
