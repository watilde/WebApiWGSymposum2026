import { useConceptSets } from '@ohdsi/webapi-sdk/react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert';

export default function ConceptSets() {
  const { data: conceptSets, isLoading, error, refetch } = useConceptSets();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Concept Sets</h1>
          <p className="text-gray-500 text-sm">{conceptSets.length} concept set{conceptSets.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={refetch} className="btn-secondary">Refresh</button>
      </div>

      {isLoading && <LoadingSpinner message="Loading concept sets..." />}
      {error && <ErrorAlert message={error.message} />}

      {!isLoading && !error && (
        <div className="card overflow-hidden">
          {conceptSets.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No concept sets found.</div>
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
                {conceptSets.map((cs) => (
                  <tr key={cs.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-gray-500">{cs.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{cs.name}</td>
                    <td className="px-4 py-3 text-gray-600">{cs.createdBy?.login ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {cs.createdDate ? new Date(cs.createdDate).toLocaleDateString() : '—'}
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
