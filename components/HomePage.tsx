import React from 'react';
import { DrugIcon } from './icons/DrugIcon';
import { FlaskIcon } from './icons/FlaskIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { TargetIcon } from './icons/TargetIcon';
import { DnaIcon } from './icons/DnaIcon';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <DrugIcon className="w-20 h-20 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            GenMed AI
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Accelerating drug discovery with the power of AI. Analyze diseases, identify protein targets, 
            and design novel therapeutic compounds in minutes, not years.
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-blue-500/25"
          >
            Launch App →
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-colors">
            <FlaskIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Disease Analysis</h3>
            <p className="text-slate-400">Deep molecular analysis of disease mechanisms and pathways</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-colors">
            <TargetIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Target Identification</h3>
            <p className="text-slate-400">AI-powered identification of key protein targets</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-colors">
            <DnaIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Molecule Design</h3>
            <p className="text-slate-400">Generate novel compounds with optimized drug-like properties</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-colors">
            <BrainCircuitIcon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
            <p className="text-slate-400">Leveraging Google's Gemini AI for cutting-edge insights</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">10.5 Years</div>
              <div className="text-slate-400">Average time from Phase I to FDA approval</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">7.9%</div>
              <div className="text-slate-400">Success rate from Phase I to approval</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">$1.3B</div>
              <div className="text-slate-400">Average cost per approved drug (2024)</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to revolutionize drug discovery?</h2>
          <p className="text-xl text-slate-300 mb-8">Start analyzing diseases and designing molecules today</p>
          <button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};