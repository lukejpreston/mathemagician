import React, { useState, useEffect } from 'react';
import type { ScrollParams, Mathemagician } from './types';
import Sanctum from './components/Sanctum';
import ArcaneScroll from './components/ArcaneScroll';
import WizardTower from './components/WizardTower';
import About from './components/About';
import { getMathemagicians } from './logic/storage';

import OrbWand from './assets/icons/orb-wand.svg?react'
import TowerFlag from './assets/icons/tower-flag.svg?react'

type View = 'sanctum' | 'scroll' | 'tower' | 'about';

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
      <header className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <OrbWand className="w-16 h-16 md:w-20 md:h-20" />
          <h1 
            className="text-2xl md:text-6xl font-black tracking-tighter uppercase italic text-amber-500 cursor-pointer"
            onClick={() => setView('sanctum')}
          >
            Mathemagician
          </h1>
        </div>
<div className="flex flex-col w-full md:w-auto gap-2">
          <button 
            onClick={() => setView('tower')}
            className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-xl px-6 py-3 rounded-xl font-bold border-b-4 border-slate-800 transition-all active:border-b-0 active:translate-y-1"
          >
            <TowerFlag className="w-6 h-6 inline-block mr-2" /> Wizard Tower
          </button>
          <button 
            onClick={() => setView('sanctum')}
            className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-xl px-6 py-3 rounded-xl font-bold border-b-4 border-slate-800 transition-all active:border-b-0 active:translate-y-1"
          >
            Sanctum
          </button>
        </div>
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
            magician={magicians.find(m => m.id === selectedMagicianId)}
          />
        )}
        {view === 'tower' && (
          <WizardTower 
            magicians={magicians} 
            onMagicianDeleted={() => {
              const updated = getMathemagicians();
              setMagicians(updated);
              if (updated.length === 0) {
                setView('sanctum');
              }
            }}
          />
        )}
        {view === 'about' && (
          <About 
            onDeleteAll={() => {
              setMagicians([]);
              setSelectedMagicianId('');
            }}
          />
        )}
      </main>

      <footer className="max-w-4xl mx-auto mt-8 flex justify-center print:hidden">
        <button
          onClick={() => setView('about')}
          className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-xl px-6 py-3 rounded-xl font-bold border-b-4 border-slate-800 transition-all active:border-b-0 active:translate-y-1"
        >
          About
        </button>
      </footer>
    </div>
  );
};

export default App;
