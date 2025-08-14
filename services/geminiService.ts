import type { AnalysisResult, Molecule } from '../types';

const callApi = async (type: string, payload: unknown) => {
    const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, payload }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // try to parse json, but don't fail if it's not
        console.error('API Error:', errorData);
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    
    return response.json();
}

export const generateDiseaseHypothesis = async (diseaseName: string): Promise<AnalysisResult> => {
    return callApi('analyze-disease', { diseaseName });
};

export const generateMoleculeForTarget = async (targetProtein: string, diseaseContext: string): Promise<Molecule> => {
    return callApi('generate-molecule', { targetProtein, diseaseContext });
};
