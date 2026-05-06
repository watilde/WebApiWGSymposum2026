import { useCohorts } from '@ohdsi/webapi-sdk/react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert';

export default function Cohorts() {
  const { data: cohorts, isLoading, error, refetch } = useCohorts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cohort Definitions</h1>
          <p className="text-gray-500 text-sm">{cohorts.length} definition{cohorts.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={refetch} className="btn-secondary">Refresh</button>
      </div>

      {isLoading && <LoadingSpinner message="Loading cohort definitions..." />}
      {error && <ErrorAlert message={error.message} />}

      {!isLoading && !error && (
        <div className="card overflow-hidden">
          {cohorts.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No cohort definitions found.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Created By</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cohorts.map((cohort) => (
                  <tr key={cohort.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-gray-500">{cohort.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{cohort.name}</div>
                      {cohort.description && (
                        <div className="text-gray-400 text-xs mt-0.5 truncate max-w-xs">{cohort.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{cohort.createdBy?.login ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {cohort.createdDate ? new Date(cohort.createdDate).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
