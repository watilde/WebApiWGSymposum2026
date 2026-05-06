import { useSources, useCohorts, useConceptSets } from '@ohdsi/webapi-sdk/react';

export default function Home() {
  const sources = useSources();
  const cohorts = useCohorts();
  const conceptSets = useConceptSets();

  const stats = [
    { label: 'Data Sources', value: sources.isLoading ? '…' : sources.data.length, icon: '⛁', color: 'bg-blue-500' },
    { label: 'Cohort Definitions', value: cohorts.isLoading ? '…' : cohorts.data.length, icon: '⊕', color: 'bg-teal-500' },
    { label: 'Concept Sets', value: conceptSets.isLoading ? '…' : conceptSets.data.length, icon: '☰', color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">OHDSI WebAPI overview</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="card p-5 flex items-center gap-4">
            <div className={`${color} text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl`}>
              {icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Quick Start</h2>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Navigate to <strong>Data Sources</strong> to view available CDM data sources</li>
          <li>Use <strong>Cohort Definitions</strong> to browse and manage patient cohorts</li>
          <li>Search concepts via <strong>Vocabulary Search</strong></li>
          <li>Browse <strong>Concept Sets</strong> for reusable concept groups</li>
        </ul>
      </div>
    </div>
  );
}
