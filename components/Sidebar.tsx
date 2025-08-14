
import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { BeakerIcon } from './icons/BeakerIcon';
import { SearchIcon } from './icons/SearchIcon';

interface SidebarProps {
    onAnalyze: (diseaseName: string) => void;
    onGenerateMolecule: (targetProtein: string) => void;
    analysisResult: AnalysisResult | null;
    isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAnalyze, onGenerateMolecule, analysisResult, isLoading }) => {
    const [diseaseInput, setDiseaseInput] = useState<string>('');
    const [selectedTarget, setSelectedTarget] = useState<string>('');

    const handleAnalyzeClick = () => {
        onAnalyze(diseaseInput);
        setSelectedTarget('');
    };

    const handleGenerateClick = () => {
        if (selectedTarget) {
            onGenerateMolecule(selectedTarget);
        }
    };

    const handleTargetSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTarget(e.target.value);
    }
    
    React.useEffect(() => {
        if (analysisResult && analysisResult.proteinTargets.length > 0) {
            setSelectedTarget(analysisResult.proteinTargets[0].name);
        }
    }, [analysisResult]);

    return (
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 h-fit self-start sticky top-20 shadow-lg">
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                        <SearchIcon className="h-5 w-5" />
                        1. Identify Target
                    </h2>
                    <label htmlFor="disease" className="block text-sm font-medium text-slate-300 mb-1">
                        Disease or Condition
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="disease"
                            value={diseaseInput}
                            onChange={(e) => setDiseaseInput(e.target.value)}
                            placeholder="e.g., Alzheimer's Disease"
                            disabled={isLoading}
                            className="w-full bg-slate-700/80 border border-slate-600 rounded-lg shadow-sm pl-3 pr-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <button
                        onClick={handleAnalyzeClick}
                        disabled={isLoading || !diseaseInput}
                        className="mt-4 w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50"
                    >
                        Analyze Disease
                    </button>
                </div>

                {analysisResult && (
                    <div className="border-t border-slate-700 pt-6 animate-fade-in">
                        <h2 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                            <BeakerIcon className="h-5 w-5" />
                            2. Generate Molecule
                        </h2>
                        <label htmlFor="target" className="block text-sm font-medium text-slate-300 mb-1">
                            Select Protein Target
                        </label>
                        <select
                            id="target"
                            value={selectedTarget}
                            onChange={handleTargetSelection}
                            disabled={isLoading}
                            className="w-full bg-slate-700/80 border border-slate-600 rounded-lg shadow-sm pl-3 pr-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        >
                            {analysisResult.proteinTargets.map(target => (
                                <option key={target.name} value={target.name}>{target.name}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleGenerateClick}
                            disabled={isLoading || !selectedTarget}
                            className="mt-4 w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50"
                        >
                           <BeakerIcon className="mr-2 h-5 w-5" />
                            Design Candidate Drug
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};