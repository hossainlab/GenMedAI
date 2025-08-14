import { GoogleGenAI, Type } from "@google/genai";
import type { Handler } from "@netlify/functions";

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("API_KEY or GEMINI_API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        diseaseSummary: {
            type: Type.STRING,
            description: "A concise summary of the disease, its causes, and effects, focusing on molecular pathology and potential therapeutic avenues."
        },
        proteinTargets: {
            type: Type.ARRAY,
            description: "A list of 2-3 key protein targets associated with the disease.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING,
                        description: "The name of the protein target (e.g., 'EGFR')."
                    },
                    function: {
                        type: Type.STRING,
                        description: "The function of the protein and its role in the disease pathology."
                    }
                },
                required: ["name", "function"]
            }
        },
        therapeuticHypothesis: {
            type: Type.STRING,
            description: "A novel therapeutic hypothesis for treating the disease, explaining a potential strategy."
        }
    },
    required: ["diseaseSummary", "proteinTargets", "therapeuticHypothesis"]
};

const moleculeSchema = {
    type: Type.OBJECT,
    properties: {
        moleculeName: {
            type: Type.STRING,
            description: "A plausible, scientific-sounding name for the hypothetical drug molecule."
        },
        mechanismOfAction: {
            type: Type.STRING,
            description: "A detailed explanation of how the proposed molecule would interact with the target protein to achieve a therapeutic effect."
        },
        smilesString: {
            type: Type.STRING,
            description: "The molecule's structure represented as a SMILES (Simplified Molecular-Input Line-Entry System) string."
        },
        predictedProperties: {
            type: Type.OBJECT,
            description: "A set of predicted properties for the molecule, with values between 0 and 100.",
            properties: {
                bindingAffinity: {
                    type: Type.NUMBER,
                    description: "Predicted binding affinity to the target (0-100, higher is better)."
                },
                solubility: {
                    type: Type.NUMBER,
                    description: "Predicted aqueous solubility (0-100, higher is better)."
                },
                toxicity: {
                    type: Type.NUMBER,
                    description: "Predicted toxicity level (0-100, lower is better)."
                },
                bioavailability: {
                    type: Type.NUMBER,
                    description: "Predicted oral bioavailability (0-100, higher is better)."
                },
                syntheticAccessibility: {
                    type: Type.NUMBER,
                    description: "Score representing ease of synthesis (0-100, higher is easier)."
                }
            },
            required: ["bindingAffinity", "solubility", "toxicity", "bioavailability", "syntheticAccessibility"]
        },
        pubchemCid: {
            type: Type.STRING,
            description: "The PubChem Compound ID (CID) of a real, structurally similar compound if one exists. Omit if the design is entirely novel."
        }
    },
    required: ["moleculeName", "mechanismOfAction", "smilesString", "predictedProperties"]
};


export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { type, payload } = body;

        let prompt: string;
        let schema: object;
        let temperature: number;
        const model = "gemini-2.5-flash";

        if (type === 'analyze-disease') {
            const { diseaseName } = payload;
            if (!diseaseName) return { statusCode: 400, body: JSON.stringify({ error: "diseaseName is required" }) };
            
            prompt = `
                Act as a world-class biomedical researcher and pharmacologist.
                Your task is to analyze the disease: "${diseaseName}".
                Provide a detailed analysis with a focus on molecular biology and potential therapeutic interventions.
                Generate a response that adheres strictly to the provided JSON schema.
            `;
            schema = analysisSchema;
            temperature = 0.5;

        } else if (type === 'generate-molecule') {
            const { targetProtein, diseaseContext } = payload;
             if (!targetProtein || !diseaseContext) return { statusCode: 400, body: JSON.stringify({ error: "targetProtein and diseaseContext are required" }) };

            prompt = `
                Act as an expert computational chemist specializing in generative drug design.
                Your task is to design a novel small molecule inhibitor for the protein target "${targetProtein}" in the context of "${diseaseContext}".
                Propose a molecule with a plausible mechanism of action and provide its structure as a SMILES string.
                Also, predict its key drug-like properties.
                After designing the molecule, search PubChem for an existing compound that is structurally similar.
                Your selection of a PubChem CID is critical. You MUST prioritize CIDs that are confirmed to have a 3D conformer. If you suggest a CID that does not have a 3D model, the application will show an error. Double-check your suggestion for the availability of the 3D model before outputting the JSON.
                Generate a response that adheres strictly to the provided JSON schema.
            `;
            schema = moleculeSchema;
            temperature = 0.8;
        } else {
            return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request type' }) };
        }
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: temperature,
            },
        });
        
        const jsonString = response.text;
        if (!jsonString) {
            throw new Error("Received an empty response from the API.");
        }
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: jsonString,
        };

    } catch (error) {
        console.error("Gemini Function Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An internal server error occurred while contacting the AI service.', details: errorMessage }),
        };
    }
};
