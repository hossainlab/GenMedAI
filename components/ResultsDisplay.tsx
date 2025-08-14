
import React from 'react';
import { AnalysisResult, Molecule, Page } from '../types';
import { Loader } from './Loader';
import { MoleculeCard } from './MoleculeCard';
import { DrugIcon } from './icons/DrugIcon';
import { FlaskIcon } from './icons/FlaskIcon';
import { TargetIcon } from './icons/TargetIcon';


interface ResultsDisplayProps {
    isLoading: boolean;
    loadingMessage: string;
    error: string | null;
    analysisResult: AnalysisResult | null;
    generatedMolecule: Molecule | null;
    disease: string;
    onNavigate: (page: Page) => void;
}

const WelcomeScreen: React.FC = () => (
    <div className="text-center p-8 bg-gradient-to-br from-slate-800/50 to-blue-900/20 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
           <DrugIcon width={64} height={64} className="text-blue-400"/>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">Welcome to GenMed AI</h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Your AI-powered partner in drug discovery. Start by entering a disease or condition in the panel on the left to begin the analysis and discover potential therapeutic targets.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-700/30 p-4 rounded-lg">
                <div className="text-blue-400 font-semibold mb-1">Step 1</div>
                <div className="text-slate-300">Enter Disease</div>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
                <div className="text-purple-400 font-semibold mb-1">Step 2</div>
                <div className="text-slate-300">Analyze Targets</div>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
                <div className="text-pink-400 font-semibold mb-1">Step 3</div>
                <div className="text-slate-300">Design Molecule</div>
            </div>
        </div>
    </div>
);

const AnalysisSection: React.FC<{ result: AnalysisResult }> = ({ result }) => (
     <div className="space-y-8 animate-fade-in">
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-400 flex items-center gap-2 mb-4">
                <FlaskIcon className="h-6 w-6"/> 
                Disease Analysis
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">{result.diseaseSummary}</p>
        </div>
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-400 flex items-center gap-2 mb-4">
                <TargetIcon className="h-6 w-6" /> 
                Potential Protein Targets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.proteinTargets.map((target) => (
                    <div key={target.name} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-5 rounded-lg border border-slate-600 hover:border-purple-400/50 transition-all">
                        <h4 className="font-bold text-slate-100 text-lg mb-2">{target.name}</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">{target.function}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-green-400 flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                Therapeutic Hypothesis
            </h3>
            <div className="bg-gradient-to-r from-slate-700/30 to-green-900/20 p-5 rounded-lg border border-slate-600 border-l-4 border-l-green-400">
                <p className="text-slate-200 leading-relaxed italic text-base">"{result.therapeuticHypothesis}"</p>
            </div>
        </div>
    </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, loadingMessage, error, analysisResult, generatedMolecule, disease, onNavigate }) => {
    return (
        <section className="w-full md:w-2/3 lg:w-3/4 bg-slate-800/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-lg">
            {isLoading && <Loader message={loadingMessage} />}
            
            {!isLoading && error && (
                <div className="text-center p-8 bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm border border-red-500/50 rounded-xl shadow-lg">
                    <div className="flex justify-center mb-4">
                        <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-4">Connection Error</h2>
                    <p className="text-red-300 mb-6 max-w-md mx-auto">{error}</p>
                    <div className="bg-red-800/30 border border-red-600/30 rounded-lg p-4 text-left max-w-lg mx-auto">
                        <h3 className="text-red-300 font-semibold mb-2">To fix this issue:</h3>
                        <ul className="text-red-200 text-sm space-y-1 list-disc list-inside">
                            <li>Ensure you're running with: <code className="bg-red-700/30 px-1 rounded">npm run netlify-dev</code></li>
                            <li>Check that your Gemini API key is properly configured</li>
                            <li>Verify your internet connection</li>
                        </ul>
                    </div>
                </div>
            )}

            {!isLoading && !error && !analysisResult && !generatedMolecule && <WelcomeScreen />}
            
            {!isLoading && !error && (
                <div className="space-y-10">
                    {analysisResult && (
                        <div>
                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Disease Analysis</h2>
                                <p className="text-xl text-blue-400 font-semibold">{disease}</p>
                            </div>
                            <AnalysisSection result={analysisResult} />
                        </div>
                    )}
                    {generatedMolecule && (
                       <div className="border-t-2 border-slate-700 pt-10 mt-10 animate-fade-in">
                          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Generated Molecule Candidate</h2>
                          <MoleculeCard molecule={generatedMolecule} onNavigate={onNavigate} />
                       </div>
                    )}
                </div>
            )}
        </section>
    );
};