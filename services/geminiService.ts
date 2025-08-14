import type { AnalysisResult, Molecule } from '../types';

const callApi = async (type: string, payload: unknown) => {
    try {
        console.log('🔄 Making API call:', { type, payload });
        
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, payload }),
        });

        console.log('📡 Response received:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error Response:', errorText);
            
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { error: `HTTP ${response.status}: ${errorText || response.statusText}` };
            }
            
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }
        
        const responseText = await response.text();
        console.log('📄 Raw response text:', responseText.substring(0, 200) + '...');
        
        let data;
        try {
            data = JSON.parse(responseText);
            console.log('✅ Successfully parsed response:', data);
            return data;
        } catch (parseError) {
            console.error('❌ JSON Parse Error:', parseError);
            console.error('❌ Response text that failed to parse:', responseText);
            throw new Error('Invalid JSON response from server');
        }
        
    } catch (error) {
        console.error('💥 API Call completely failed:', error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Network error: Unable to connect to the server. Make sure you\'re using the correct URL.');
        }
        throw error;
    }
}

export const generateDiseaseHypothesis = async (diseaseName: string): Promise<AnalysisResult> => {
    return callApi('analyze-disease', { diseaseName });
};

export const generateMoleculeForTarget = async (targetProtein: string, diseaseContext: string): Promise<Molecule> => {
    return callApi('generate-molecule', { targetProtein, diseaseContext });
};
