
import React from 'react';
import { DrugIcon } from './icons/DrugIcon';
import type { Page } from '../App';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const NavLink: React.FC<{
    page: Page;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
}> = ({ page, currentPage, onNavigate, children }) => {
    const isActive = currentPage === page;
    const activeClasses = 'text-blue-400 border-b-2 border-blue-400';
    const inactiveClasses = 'text-slate-300 hover:text-blue-400 border-b-2 border-transparent';

    return (
        <button 
            onClick={() => onNavigate(page)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${isActive ? activeClasses : inactiveClasses}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </button>
    );
};


export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    return (
        <header className="bg-slate-900/70 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div onClick={() => onNavigate('home')} className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" role="button" tabIndex={0} aria-label="Go to homepage">
                        <DrugIcon className="h-8 w-8 text-blue-400" />
                        <h1 className="text-lg sm:text-xl font-bold">
                            <span className="text-slate-100">GenMed</span><span className="text-blue-400"> AI</span>
                        </h1>
                    </div>
                    <nav className="flex items-center space-x-1 sm:space-x-2" aria-label="Main navigation">
                        {currentPage === 'discovery' && (
                            <div className="px-3 py-2 text-sm font-medium text-blue-400 border-b-2 border-blue-400">
                                Discovery
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};