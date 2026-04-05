import React, { useEffect, useState } from 'react';
import { AtlasApiClient, CohortEndpoints } from '@atlas-v3/api-v3-client';
import { CohortService } from '@atlas-v3/domain-core';
import type { CohortDefinition } from '@atlas-v3/domain-core';
import { Button, Card, DataTable, useTheme } from '@atlas-v3/ui-system';
import type { Column } from '@atlas-v3/ui-system';

// --- 3-layer wiring: API → Domain → UI ---

const apiClient = new AtlasApiClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? '/WebAPI',
});
const cohortEndpoints = new CohortEndpoints(apiClient);
const cohortService = new CohortService(cohortEndpoints);

// --- Column definition for DataTable ---

const columns: Column<CohortDefinition>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'description', header: 'Description' },
  { key: 'createdDate', header: 'Created' },
];

export function CohortListPage() {
  const theme = useTheme();
  const [cohorts, setCohorts] = useState<CohortDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    cohortService
      .list()
      .then((data) => {
        if (!cancelled) setCohorts(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    cohortService
      .list()
      .then(setCohorts)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
        <h1 style={{ margin: 0 }}>Cohort Definitions</h1>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>

      <Card title="3-Layer Architecture Demo">
        <p style={{ marginTop: 0, color: `${theme.colors.text}99` }}>
          API layer (AtlasApiClient) → Domain layer (CohortService) → UI layer (DataTable)
        </p>
      </Card>

      <div style={{ marginTop: theme.spacing.lg }}>
        {loading && <p>Loading cohorts…</p>}
        {error && (
          <Card>
            <p style={{ color: theme.colors.error, margin: 0 }}>Error: {error}</p>
          </Card>
        )}
        {!loading && !error && (
          <DataTable<CohortDefinition> columns={columns} data={cohorts} />
        )}
      </div>
    </div>
  );
}
