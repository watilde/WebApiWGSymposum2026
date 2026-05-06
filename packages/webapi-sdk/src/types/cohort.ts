export interface CohortDefinitionInfo {
  id: number;
  name: string;
  description: string;
  expressionType: string;
  createdBy: { login: string; name: string } | null;
  createdDate: string;
  modifiedBy: { login: string; name: string } | null;
  modifiedDate: string | null;
}

export interface CohortExpression {
  ConceptSets: unknown[];
  PrimaryCriteria: unknown;
  QualifiedLimit?: unknown;
  ExpressionLimit?: unknown;
  InclusionRules?: unknown[];
  EndStrategy?: unknown;
  CensoringCriteria?: unknown[];
  CollapseSettings?: unknown;
  CensorWindow?: unknown;
  cdmVersionRange?: string;
}

export interface CohortDefinitionDTO {
  id: number;
  name: string;
  description: string;
  expressionType: string;
  expression: CohortExpression;
}

export interface CohortGenerationInfo {
  id: {
    cohortDefinitionId: number;
    sourceId: number;
  };
  status: 'PENDING' | 'RUNNING' | 'COMPLETE' | 'ERROR';
  startTime: string | null;
  executionDuration: number | null;
  personCount: number | null;
  recordCount: number | null;
  isValid: boolean;
  hasResults: boolean;
}
