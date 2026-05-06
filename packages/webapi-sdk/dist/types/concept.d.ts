export interface Concept {
    conceptId: number;
    conceptName: string;
    standardConcept: string | null;
    standardConceptCaption: string | null;
    invalidReason: string | null;
    invalidReasonCaption: string | null;
    conceptCode: string;
    domainId: string;
    vocabularyId: string;
    conceptClassId: string;
}
export interface ConceptSetItem {
    concept: Concept;
    isExcluded: boolean;
    includeDescendants: boolean;
    includeMapped: boolean;
}
export interface ConceptSetExpression {
    items: ConceptSetItem[];
}
export interface ConceptSetDTO {
    id: number;
    name: string;
    createdBy: {
        login: string;
        name: string;
    } | null;
    createdDate: string;
    modifiedBy: {
        login: string;
        name: string;
    } | null;
    modifiedDate: string | null;
    expression?: ConceptSetExpression;
}
export interface VocabularySearchRequest {
    QUERY: string;
    VOCABULARY_ID?: string[];
    DOMAIN_ID?: string[];
    CONCEPT_CLASS_ID?: string[];
    STANDARD_CONCEPT?: string[];
    INVALID_REASON?: string[];
    pageSize?: number;
    page?: number;
}
export interface RelatedConceptResult {
    concept: Concept;
    relationships: string[];
}
//# sourceMappingURL=concept.d.ts.map