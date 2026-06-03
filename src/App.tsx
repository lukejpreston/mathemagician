import React, { useState, useEffect } from 'react';
import type { ScrollParams, Mathemagician } from './types';
import Sanctum from './components/Sanctum';
import ArcaneScroll from './components/ArcaneScroll';
import WizardTower from './components/WizardTower';
import { getMathemagicians } from './logic/storage';

import OrbWand from './assets/icons/orb-wand.svg?react'

type View = 'sanctum' | 'scroll' | 'tower';

const App: React.FC = () => {
  const [view, setView] = useState<View>('sanctum');
  const [params, setParams] = useState<ScrollParams>({
    operators: ['+', '-'],
    minNumber: 0,
    maxNumber: 10,
    questionCount: 20,
  });
  const [magicians, setMagicians] = useState<Mathemagician[]>([]);
  const [selectedMagicianId, setSelectedMagicianId] = useState<string>('');

  useEffect(() => {
    setMagicians(getMathemagicians());
  }, []);

  const handleStartScroll = (newParams: ScrollParams) => {
    setParams(newParams);
    setView('scroll');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <OrbWand className="w-16 h-16 md:w-20 md:h-20" />
          <h1 
            className="text-2xl md:text-6xl font-black tracking-tighter uppercase italic text-amber-500 cursor-pointer"
            onClick={() => setView('sanctum')}
          >
            Mathemagician
          </h1>
        </div>
        <button 
          onClick={() => setView('tower')}
          className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-xl px-6 py-3 rounded-xl font-bold border-b-4 border-slate-800 transition-all active:border-b-0 active:translate-y-1"
        >
          The Wizard Tower
        </button>
      </header>

      <main className="max-w-4xl mx-auto">
        {view === 'sanctum' && (
          <Sanctum 
            params={params} 
            onStart={handleStartScroll} 
            magicians={magicians}
            selectedMagicianId={selectedMagicianId}
            onSelectMagician={setSelectedMagicianId}
            onMagiciansChange={() => setMagicians(getMathemagicians())}
          />
        )}
        {view === 'scroll' && (
          <ArcaneScroll 
            params={params} 
            onBack={() => setView('sanctum')} 
            magician={magicians.find(m => m.id === selectedMagicianId)}
          />
        )}
        {view === 'tower' && (
          <WizardTower 
            magicians={magicians} 
            onBack={() => setView('sanctum')} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
