import React, { useState, useEffect } from 'react';
import type { DrillParams, Mathemagician } from './types';
import CommandCenter from './components/CommandCenter';
import TacticalScroll from './components/TacticalScroll';
import Barracks from './components/Barracks';
import { getMathemagicians } from './logic/storage';

type View = 'command' | 'drill' | 'barracks';

const App: React.FC = () => {
  const [view, setView] = useState<View>('command');
  const [params, setParams] = useState<DrillParams>({
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

  const handleStartDrill = (newParams: DrillParams) => {
    setParams(newParams);
    setView('drill');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src="/icons/orb-wand.svg" 
            alt="" 
            className="w-16 h-16 md:w-20 md:h-20 [mix-blend-mode:screen]"
          />
          <h1 
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-amber-500 cursor-pointer"
            onClick={() => setView('command')}
          >
            Arcane Tactical Drills
          </h1>
        </div>
        <button 
          onClick={() => setView('barracks')}
          className="bg-slate-700 hover:bg-slate-600 text-xl px-6 py-3 rounded-xl font-bold border-b-4 border-slate-800 transition-all active:border-b-0 active:translate-y-1"
        >
          The Barracks
        </button>
      </header>

      <main className="max-w-4xl mx-auto">
        {view === 'command' && (
          <CommandCenter 
            params={params} 
            onStart={handleStartDrill} 
            magicians={magicians}
            selectedMagicianId={selectedMagicianId}
            onSelectMagician={setSelectedMagicianId}
            onMagiciansChange={() => setMagicians(getMathemagicians())}
          />
        )}
        {view === 'drill' && (
          <TacticalScroll 
            params={params} 
            onBack={() => setView('command')} 
            magician={magicians.find(m => m.id === selectedMagicianId)}
          />
        )}
        {view === 'barracks' && (
          <Barracks 
            magicians={magicians} 
            onBack={() => setView('command')} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
