
import React from 'react';
import type { Molecule, Page } from '../types';
import { BeakerIcon } from './icons/BeakerIcon';
import { PropertyChart } from './PropertyChart';

interface MoleculeCardProps {
    molecule: Molecule;
    onNavigate: (page: Page) => void;
}

export const MoleculeCard: React.FC<MoleculeCardProps> = ({ molecule, onNavigate }) => {
    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-400">{molecule.moleculeName}</h3>
                <div className="mt-2">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-200 bg-indigo-800">
                        SMILES STRING
                    </span>
                    <p className="mt-1 text-sm text-slate-300 font-mono bg-slate-900 p-2 rounded break-words">
                        {molecule.smilesString}
                    </p>
                </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-100 text-lg mb-2">Mechanism of Action</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {molecule.mechanismOfAction}
                        </p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-slate-100 text-lg mb-3">Predicted Properties</h4>
                        <div className="w-full h-64 sm:h-80">
                           <PropertyChart data={molecule.predictedProperties} />
                        </div>
                    </div>
                </div>

                <div className="w-full aspect-square bg-slate-900 rounded-lg border border-slate-700 flex flex-col justify-center items-center min-h-[300px]">
                    {molecule.pubchemCid ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="flex-grow w-full h-full relative">
                                <iframe
                                    key={molecule.pubchemCid}
                                    src={`https://pubchem.ncbi.nlm.nih.gov/compound/${molecule.pubchemCid}#section=3D-Conformer&fullscreen=true`}
                                    className="w-full h-full absolute top-0 left-0 rounded-t-lg"
                                    title={`PubChem 3D Conformer for CID ${molecule.pubchemCid}`}
                                />
                            </div>
                            <div className="flex-shrink-0 w-full p-3 bg-slate-800 border-t border-slate-700 text-center">
                                <a
                                    href={`https://pubchem.ncbi.nlm.nih.gov/compound/${molecule.pubchemCid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-semibold text-slate-300 hover:text-teal-400 transition-colors"
                                >
                                    View on PubChem (CID: {molecule.pubchemCid})
                                </a>
                                <p className="text-xs text-slate-500 mt-1">
                                    A 3D model is displayed above if available in the PubChem database.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 text-center">
                            <BeakerIcon className="h-10 w-10 text-indigo-400 mx-auto" />
                            <h4 className="font-semibold text-slate-100 mt-2">Novel Compound</h4>
                            <p className="text-slate-400 text-sm mt-1">
                                No direct analog found in PubChem. 3D visualization is unavailable for this novel structure.
                            </p>
                        </div>
                    )}
                </div>
            </div>

             <div className="bg-slate-900/50 p-4 text-center border-t border-slate-700">
                <p className="text-xs sm:text-sm text-slate-400 mb-2">This is a promising start, but how is it validated?</p>
                <button 
                    onClick={() => onNavigate('about')}
                    className="text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                >
                    Learn about the validation process &rarr;
                </button>
            </div>
        </div>
    );
};