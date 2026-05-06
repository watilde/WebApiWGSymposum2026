import { WebApiProvider, useSources, useVocabularySearch } from '@ohdsi/webapi-sdk/react';
import { useState } from 'react';

const baseUrl = import.meta.env.VITE_WEBAPI_BASE_URL ?? 'http://localhost:8080';

function SourcesList() {
  const { data: sources, isLoading, error } = useSources();

  if (isLoading) return <p className="text-gray-500">Loading sources…</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Data Sources</h2>
      <ul className="space-y-2">
        {sources.map((s) => (
          <li key={s.sourceKey} className="border rounded px-3 py-2 bg-white">
            <span className="font-medium">{s.sourceName}</span>
            <span className="text-gray-400 text-sm ml-2">({s.sourceKey})</span>
          </li>
        ))}
        {sources.length === 0 && <li className="text-gray-400">No sources found.</li>}
      </ul>
    </div>
  );
}

function ConceptSearch() {
  const { data: sources } = useSources();
  const [query, setQuery] = useState('');
  const [sourceKey, setSourceKey] = useState<string | null>(null);
  const { data: concepts, isLoading } = useVocabularySearch(query, sourceKey);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Concept Search</h2>
      <div className="flex gap-2 mb-3">
        <select
          value={sourceKey ?? ''}
          onChange={(e) => setSourceKey(e.target.value || null)}
          className="border rounded px-2 py-1.5 text-sm"
        >
          <option value="">Select source</option>
          {sources.map((s) => (
            <option key={s.sourceKey} value={s.sourceKey}>{s.sourceName}</option>
          ))}
        </select>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts…"
          className="flex-1 border rounded px-2 py-1.5 text-sm"
        />
      </div>
      {isLoading && <p className="text-gray-500 text-sm">Searching…</p>}
      <ul className="space-y-1">
        {concepts.slice(0, 20).map((c) => (
          <li key={c.conceptId} className="text-sm border rounded px-3 py-2 bg-white flex justify-between">
            <span>{c.conceptName}</span>
            <span className="text-gray-400">{c.conceptId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <WebApiProvider config={{ baseUrl }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-1">OHDSI WebAPI Starter Kit</h1>
        <p className="text-gray-500 text-sm mb-8">
          A minimal template for building OHDSI web applications.
          Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code> to get started.
        </p>
        <div className="space-y-8">
          <SourcesList />
          <ConceptSearch />
        </div>
      </div>
    </WebApiProvider>
  );
}
