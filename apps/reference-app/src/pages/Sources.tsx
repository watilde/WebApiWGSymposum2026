import { useSources } from '@ohdsi/webapi-sdk/react';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert';

export default function Sources() {
  const { data: sources, isLoading, error, refetch } = useSources();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Sources</h1>
          <p className="text-gray-500 text-sm">Registered CDM data sources</p>
        </div>
        <button onClick={refetch} className="btn-secondary">Refresh</button>
      </div>

      {isLoading && <LoadingSpinner message="Loading sources..." />}
      {error && <ErrorAlert message={error.message} />}

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
                  <Badge variant="info">{source.sourceDialect}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {source.daimons.map((d) => (
                    <Badge key={d.sourceDaimonId} variant="default">
                      {d.daimonType}: <span className="font-mono ml-1">{d.tableQualifier}</span>
                    </Badge>
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
