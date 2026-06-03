import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import type { ScrollParams, Mathemagician } from './types';
import Sanctum from './components/Sanctum';
import ArcaneScroll from './components/ArcaneScroll';
import WizardTower from './components/WizardTower';
import About from './components/About';
import { getMathemagicians } from './logic/storage';

import OrbWand from './assets/icons/orb-wand.svg?react'
import TowerFlag from './assets/icons/tower-flag.svg?react'

interface AppContextType {
  magicians: Mathemagician[];
  selectedMagicianId: string;
  setSelectedMagicianId: (id: string) => void;
  refreshMagicians: () => void;
  setMagicians: (magicians: Mathemagician[]) => void;
  params: ScrollParams;
  setParams: (params: ScrollParams) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <OrbWand className="w-16 h-16 md:w-20 md:h-20" />
          <Link to="/sanctum">
            <h1 className="text-2xl md:text-6xl font-black tracking-tighter uppercase italic text-amber-500 cursor-pointer">
              Mathemagician
            </h1>
          </Link>
        </div>
        <div className="flex flex-col w-full md:w-auto gap-2">
          <Link 
            to="/tower"
            className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-xl px-6 py-3 rounded-xl font-bold border-b-4 border-slate-800 transition-all active:border-b-0 active:translate-y-1 text-center"
          >
            <TowerFlag className="w-6 h-6 inline-block mr-2" /> Wizard Tower
          </Link>
          <Link 
            to="/sanctum"
            className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-xl px-6 py-3 rounded-xl font-bold border-b-4 border-slate-800 transition-all active:border-b-0 active:translate-y-1 text-center"
          >
            Sanctum
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {children}
      </main>

      <footer className="max-w-4xl mx-auto mt-8 flex justify-center print:hidden">
        <Link
          to="/about"
          className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-xl px-6 py-3 rounded-xl font-bold border-b-4 border-slate-800 transition-all active:border-b-0 active:translate-y-1 text-center"
        >
          About
        </Link>
      </footer>
    </div>
  );
};

const SanctumPage: React.FC = () => {
  const { params, setParams, magicians, selectedMagicianId, setSelectedMagicianId, refreshMagicians } = useAppContext();
  const navigate = useNavigate();

  const handleStartScroll = (newParams: ScrollParams) => {
    setParams(newParams);
    navigate('/scroll');
  };

  return (
    <Sanctum 
      params={params} 
      onStart={handleStartScroll} 
      magicians={magicians}
      selectedMagicianId={selectedMagicianId}
      onSelectMagician={setSelectedMagicianId}
      onMagiciansChange={refreshMagicians}
    />
  );
};

const ScrollPage: React.FC = () => {
  const { params, magicians, selectedMagicianId } = useAppContext();
  
  return (
    <ArcaneScroll 
      params={params} 
      magician={magicians.find(m => m.id === selectedMagicianId)}
    />
  );
};

const TowerPage: React.FC = () => {
  const { refreshMagicians, magicians } = useAppContext();
  const navigate = useNavigate();

  return (
    <WizardTower 
      magicians={magicians} 
      onMagicianDeleted={() => {
        const updated = getMathemagicians();
        refreshMagicians();
        if (updated.length === 0) {
          navigate('/sanctum');
        }
      }}
    />
  );
};

const AboutPage: React.FC = () => {
  const { setMagicians, setSelectedMagicianId } = useAppContext();

  return (
    <About 
      onDeleteAll={() => {
        setMagicians([]);
        setSelectedMagicianId('');
      }}
    />
  );
};

const AppRoutes: React.FC = () => {
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

  const refreshMagicians = () => setMagicians(getMathemagicians());

  const contextValue: AppContextType = {
    magicians,
    selectedMagicianId,
    setSelectedMagicianId,
    refreshMagicians,
    setMagicians,
    params,
    setParams,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Navigate to="/sanctum" replace />} />
        <Route path="/sanctum" element={<Layout><SanctumPage /></Layout>} />
        <Route path="/scroll" element={<Layout><ScrollPage /></Layout>} />
        <Route path="/tower" element={<Layout><TowerPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      </Routes>
    </AppContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/mathemagician">
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
