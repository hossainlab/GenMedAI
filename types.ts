export type Page = 'home' | 'discovery' | 'about';

export interface ProteinTarget {
    name: string;
    function: string;
}

export interface AnalysisResult {
    diseaseSummary: string;
    proteinTargets: ProteinTarget[];
    therapeuticHypothesis: string;
}

export interface PredictedProperties {
    bindingAffinity: number;
    solubility: number;
    toxicity: number;
    bioavailability: number;
    syntheticAccessibility: number;
}

export interface Molecule {
    moleculeName: string;
    mechanismOfAction: string;
    smilesString: string;
    predictedProperties: PredictedProperties;
    pubchemCid?: string;
}