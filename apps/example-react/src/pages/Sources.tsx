import { useSources } from '@ohdsi/webapi-sdk/react';

export default function Sources() {
  const { data: sources, isLoading, error, refetch } = useSources();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Sources</h1>
          <p className="text-sm text-gray-500">Registered CDM data sources</p>
        </div>
        <button onClick={refetch} className="btn-secondary">Refresh</button>
      </div>

      {isLoading && <p className="text-gray-500">Loading sources…</p>}
      {error && (
        <div className="card p-4 border-red-200 bg-red-50 text-red-700 text-sm">{error.message}</div>
      )}

      {!isLoading && !error && (
        <div className="space-y-3">
          {sources.length === 0 ? (
            <div className="card p-8 text-center text-gray-400">No data sources registered.</div>
          ) : (
            sources.map((source) => (
              <div key={source.sourceKey} className="card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{source.sourceName}</h3>
                    <p className="text-sm text-gray-500 font-mono mt-0.5">{source.sourceKey}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {source.sourceDialect}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {source.daimons.map((d) => (
                    <span
                      key={d.sourceDaimonId}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono"
                    >
                      {d.daimonType}: {d.tableQualifier}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
