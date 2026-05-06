export type DaimonType = 'CDM' | 'Vocabulary' | 'Results' | 'CEM' | 'CEMResults' | 'Temp';
export interface SourceDaimon {
    sourceDaimonId: number;
    daimonType: DaimonType;
    tableQualifier: string;
    priority: number;
}
export interface SourceInfo {
    sourceId: number;
    sourceName: string;
    sourceDialect: string;
    sourceKey: string;
    daimons: SourceDaimon[];
}
export interface SourceCreate {
    sourceName: string;
    sourceKey: string;
    sourceDialect: string;
    connectionString: string;
    username?: string;
    password?: string;
    daimons: Omit<SourceDaimon, 'sourceDaimonId'>[];
}
//# sourceMappingURL=source.d.ts.map