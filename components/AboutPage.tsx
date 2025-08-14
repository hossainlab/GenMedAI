
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { TargetIcon } from './icons/TargetIcon';
import { DrugIcon } from './icons/DrugIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { ComputerChipIcon } from './icons/ComputerChipIcon';
import { TestTubeIcon } from './icons/TestTubeIcon';
import { MouseIcon } from './icons/MouseIcon';
import { UsersIcon } from './icons/UsersIcon';

const WorkflowStep: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-700 text-teal-400">
            {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

const ValidationStep: React.FC<{ icon: React.ReactNode; title: string; description: string; step: number; }> = ({ icon, title, description, step }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-700 text-indigo-400">
                {icon}
            </div>
            <span className="text-xs font-bold text-slate-400 mt-2">STEP {step}</span>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
            <p className="text-slate-400 leading-relaxed mt-1">{description}</p>
        </div>
    </div>
);


export const AboutPage: React.FC = () => {
    return (
        <div className="animate-fade-in text-slate-200 bg-slate-800/30 rounded-lg p-6 md:p-10 border border-slate-700/50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-teal-400 mb-4">About GenoMed</h1>
                <p className="text-lg sm:text-xl text-center text-slate-300 mb-12">
                    An AI-powered prototype designed to accelerate the initial phases of drug discovery.
                </p>

                <div className="space-y-16">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">What is GenoMed?</h2>
                        <p className="text-slate-300 leading-relaxed">
                            GenoMed is a research tool that leverages the power of Google's Gemini generative AI model to simulate and shorten the drug discovery workflow. It helps scientists and researchers rapidly generate novel hypotheses, identify potential drug targets for diseases, and even design candidate molecules from scratch. It transforms a process that could take months or years into a matter of seconds.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-8 text-center">The Discovery Workflow</h2>
                        <div className="relative">
                           <div className="absolute top-8 left-0 w-full h-0.5 bg-slate-700 hidden sm:block" aria-hidden="true"></div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 relative">
                                <WorkflowStep
                                    icon={<SearchIcon width={32} height={32}/>}
                                    title="1. Disease Input"
                                    description="A researcher provides a disease or condition they want to investigate."
                                />
                                <WorkflowStep
                                    icon={<BrainCircuitIcon />}
                                    title="2. AI Analysis"
                                    description="The AI analyzes vast biomedical data to summarize the disease and its molecular mechanisms."
                                />
                                <WorkflowStep
                                    icon={<TargetIcon width={32} height={32}/>}
                                    title="3. Target ID"
                                    description="The model identifies key protein targets that are crucial in the disease's pathology."
                                />
                                <WorkflowStep
                                    icon={<DrugIcon width={32} height={32}/>}
                                    title="4. Molecule Design"
                                    description="For a selected target, the AI designs a novel, hypothetical drug molecule and predicts its properties."
                                />
                                <WorkflowStep
                                    icon={<ClipboardCheckIcon />}
                                    title="5. Validation"
                                    description="The output serves as a powerful starting point for real-world lab testing and scientific validation."
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-slate-700 pt-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">The Path to Validation: From Concept to Clinic</h2>
                         <div className="space-y-8">
                            <ValidationStep
                                step={1}
                                icon={<ComputerChipIcon />}
                                title="In Silico Simulation & Synthesis"
                                description="The AI's design is first tested in more advanced computer simulations (molecular docking, dynamics) to refine predictions. If promising, medicinal chemists devise a plan to synthesize the physical compound in a lab, a complex process guided by the molecule's structure."
                            />
                             <ValidationStep
                                step={2}
                                icon={<TestTubeIcon />}
                                title="In Vitro Preclinical Testing"
                                description="The synthesized compound is tested in controlled lab environments (e.g., in test tubes). Experiments confirm if it binds to the intended protein target and has the desired biological effect on isolated cells (e.g., stopping cancer cell growth)."
                            />
                             <ValidationStep
                                step={3}
                                icon={<MouseIcon />}
                                title="In Vivo Preclinical Testing"
                                description="If successful in vitro, the compound is tested in living organisms, typically animal models (like mice) that mimic the human disease. This stage is crucial for evaluating efficacy, dosage, and safety (toxicity) in a whole biological system."
                            />
                            <ValidationStep
                                step={4}
                                icon={<UsersIcon />}
                                title="Clinical Trials (in Humans)"
                                description="After extensive preclinical testing and regulatory approval, the candidate drug enters multi-phase human trials. Phase I (safety), Phase II (efficacy and side effects), and Phase III (large-scale effectiveness) can take many years and are required before a drug can be approved for public use."
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">Disclaimer</h2>
                        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                            <p className="text-yellow-200 leading-relaxed">
                                <span className="font-bold">This is a prototype for informational purposes only.</span> The content generated by the AI is not medical advice and has not been experimentally validated. All hypotheses, targets, and molecules generated by GenoMed must be rigorously tested and verified by qualified scientists in a laboratory setting before being considered for any real-world application.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};