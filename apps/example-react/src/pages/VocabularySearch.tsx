import { useState } from 'react';
import { useSources, useVocabularySearch } from '@ohdsi/webapi-sdk/react';

export default function VocabularySearch() {
  const { data: sources } = useSources();
  const [query, setQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const { data: concepts, isLoading, error } = useVocabularySearch(query, selectedSource);

  const vocabSources = sources.filter((s) =>
    s.daimons.some((d) => d.daimonType === 'Vocabulary')
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Vocabulary Search</h1>
      <p className="text-sm text-gray-500 mb-6">Search OMOP CDM concepts</p>

      <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <select
          value={selectedSource ?? ''}
          onChange={(e) => setSelectedSource(e.target.value || null)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ohdsi-blue"
        >
          <option value="">Select a data source</option>
          {vocabSources.map((s) => (
            <option key={s.sourceKey} value={s.sourceKey}>{s.sourceName}</option>
          ))}
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts (e.g. 'Type 2 diabetes')"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ohdsi-blue"
        />
      </div>

      {isLoading && <p className="text-gray-500">Searching…</p>}
      {error && (
        <div className="card p-4 border-red-200 bg-red-50 text-red-700 text-sm">{error.message}</div>
      )}

      {!isLoading && !error && concepts.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
            {concepts.length} result{concepts.length !== 1 ? 's' : ''}
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Concept ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Concept Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Domain</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Vocabulary</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {concepts.map((c) => (
                <tr key={c.conceptId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-500">{c.conceptId}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{c.conceptName}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{c.domainId}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.vocabularyId}</td>
                  <td className="px-4 py-3">
                    {c.standardConcept === 'S' ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Standard</span>
                    ) : c.standardConcept === 'C' ? (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Classification</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Non-standard</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !error && query && selectedSource && concepts.length === 0 && (
        <div className="card p-8 text-center text-gray-400">No concepts found for "{query}".</div>
      )}
      {(!query || !selectedSource) && !isLoading && (
        <div className="card p-8 text-center text-gray-400">
          Select a data source and enter a search term to find OMOP concepts.
        </div>
      )}
    </div>
  );
}
