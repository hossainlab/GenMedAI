
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ResultsDisplay } from './components/ResultsDisplay';
import { HomePage } from './components/HomePage';
import { AnalysisResult, Molecule } from './types';
import { generateDiseaseHypothesis, generateMoleculeForTarget } from './services/geminiService';

export type Page = 'home' | 'discovery';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [disease, setDisease] = useState<string>('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [generatedMolecule, setGeneratedMolecule] = useState<Molecule | null>(null);

    const handleAnalyzeDisease = useCallback(async (diseaseName: string) => {
        if (!diseaseName) {
            setError('Please enter a disease name.');
            return;
        }
        setIsLoading(true);
        setLoadingMessage('Running disease mechanism analysis...');
        setError(null);
        setAnalysisResult(null);
        setGeneratedMolecule(null);
        setDisease(diseaseName);

        try {
            const result = await generateDiseaseHypothesis(diseaseName);
            setAnalysisResult(result);
        } catch (err) {
            console.error(err);
            setError('Failed to analyze disease. Please ensure your API key is configured correctly and try again.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, []);

    const handleGenerateMolecule = useCallback(async (targetProtein: string) => {
        if (!targetProtein || !disease) {
            setError('A target protein and disease context are required.');
            return;
        }
        setIsLoading(true);
        setLoadingMessage(`Designing novel compound for ${targetProtein}...`);
        setError(null);
        setGeneratedMolecule(null);

        try {
            const molecule = await generateMoleculeForTarget(targetProtein, disease);
            setGeneratedMolecule(molecule);
        } catch (err) {
            console.error(err);
            setError('Failed to generate molecule. The AI may have been unable to find a suitable compound. Please try another target.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [disease]);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
    };

    const handleGetStarted = () => {
        setCurrentPage('discovery');
    };

    if (currentPage === 'home') {
        return <HomePage onGetStarted={handleGetStarted} />;
    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
            <main className="flex-grow container mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
                {currentPage === 'discovery' && (
                    <div className="flex flex-col md:flex-row gap-8">
                        <Sidebar
                            onAnalyze={handleAnalyzeDisease}
                            onGenerateMolecule={handleGenerateMolecule}
                            analysisResult={analysisResult}
                            isLoading={isLoading}
                        />
                        <ResultsDisplay
                            isLoading={isLoading}
                            loadingMessage={loadingMessage}
                            error={error}
                            analysisResult={analysisResult}
                            generatedMolecule={generatedMolecule}
                            disease={disease}
                            onNavigate={handleNavigate}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;