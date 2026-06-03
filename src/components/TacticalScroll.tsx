import React, { useState, useMemo } from 'react';
import type { DrillParams, Mathemagician } from '../types';
import { generateDrill } from '../logic/drillGenerator';
import { saveRecord } from '../logic/storage';

interface Props {
  params: DrillParams;
  onBack: () => void;
  magician?: Mathemagician;
}

const TacticalScroll: React.FC<Props> = ({ params, onBack, magician }) => {
  const problems = useMemo(() => generateDrill(params), [params]);
  const [score, setScore] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (magician) {
      saveRecord({
        mathemagicianId: magician.id,
        params,
        score,
        timeTakenSeconds: timeTaken,
        totalQuestions: problems.length,
      });
      setIsSaved(true);
    }
  };

  return (
    <div className="space-y-8 print:space-y-0 print:m-0">
      <div className="flex justify-between items-center print:hidden">
        <button
          onClick={onBack}
          className="bg-slate-700 hover:bg-slate-600 text-xl px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2"
        >
          <img src="/icons/return-arrow.svg" className="w-6 h-6 invert" alt="" /> Abort Mission
        </button>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-500 text-xl px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2"
        >
          <img src="/icons/scroll-unfurled.svg" className="w-8 h-8 [mix-blend-mode:screen]" alt="" /> Print Scroll
        </button>
      </div>

      {/* The Printable Page */}
      <div className="bg-white text-slate-900 p-[20mm] rounded-none shadow-2xl mx-auto w-full max-w-[210mm] min-h-[297mm] border-2 border-slate-200 print:shadow-none print:border-0 print:p-0 print:m-0">
        <header className="border-b-4 border-double border-slate-900 pb-4 mb-8 flex justify-between items-end">
          <div className="flex items-center gap-4">
            <img 
              src="/icons/tied-scroll.svg" 
              alt="" 
              className="w-16 h-16 invert"
            />
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">Tactical Scroll</h1>
              <p className="text-xl font-bold italic text-slate-600">Arcane Combat Training</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xl font-bold">Recruit: <span className="border-b-2 border-slate-400 min-w-[150px] inline-block text-center">{magician?.name || '_______________'}</span></p>
            <p className="text-xl font-bold">Date: <span className="border-b-2 border-slate-400 min-w-[150px] inline-block text-center">{new Date().toLocaleDateString()}</span></p>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 mb-12">
          {problems.map((p, idx) => (
            <div key={p.id} className="text-3xl font-bold flex items-center justify-end gap-2 pr-4">
              <span className="text-slate-400 text-base mr-auto">{idx + 1}.</span>
              <span>{p.num1}</span>
              <span className="text-slate-500 w-6 text-center">{p.operator === '*' ? '×' : p.operator === '/' ? '÷' : p.operator}</span>
              <span>{p.num2}</span>
              <span className="text-slate-500">=</span>
              <span className="w-16 h-10 border-b-2 border-slate-300"></span>
            </div>
          ))}
        </div>

        <footer className="mt-auto border-t-4 border-double border-slate-900 pt-8">
          <h2 className="text-2xl font-black uppercase mb-4 italic">Performance Review</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="border-2 border-slate-900 p-4 rounded-lg">
              <p className="text-lg font-bold uppercase mb-2">Precision Score</p>
              <div className="text-4xl font-black">_____ / {problems.length}</div>
            </div>
            <div className="border-2 border-slate-900 p-4 rounded-lg">
              <p className="text-lg font-bold uppercase mb-2">Time to Completion</p>
              <div className="text-4xl font-black">_____ seconds</div>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-400 font-mono text-sm">
            Mana Range: {params.minNumber} to {params.maxNumber} | Operators: {params.operators.join(', ')}
          </div>
        </footer>
      </div>

      {/* Recording Results - Post-Print Interface */}
      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl print:hidden">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
          <span className="text-4xl">🏅</span> Record Campaign Results
        </h2>
        {!magician ? (
          <p className="text-xl text-amber-400 font-bold italic">Select a Mathemagician to record results!</p>
        ) : isSaved ? (
          <div className="text-center p-8">
            <p className="text-4xl font-black text-emerald-500 mb-4">Maneuver Recorded!</p>
            <button
              onClick={onBack}
              className="h-16 px-8 bg-slate-700 hover:bg-slate-600 text-2xl font-bold rounded-2xl"
            >
              Back to Command
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-xl font-bold uppercase tracking-wider text-slate-400">Precision Score (out of {problems.length})</label>
              <input
                type="number"
                max={problems.length}
                value={score}
                onChange={e => setScore(parseInt(e.target.value) || 0)}
                className="w-full h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-4xl font-black text-center focus:border-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-xl font-bold uppercase tracking-wider text-slate-400">Time Taken (seconds)</label>
              <input
                type="number"
                value={timeTaken}
                onChange={e => setTimeTaken(parseInt(e.target.value) || 0)}
                className="w-full h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-4xl font-black text-center focus:border-emerald-500 outline-none"
              />
            </div>
            <button
              onClick={handleSave}
              className="md:col-span-2 h-20 bg-emerald-600 hover:bg-emerald-500 text-2xl font-bold rounded-2xl border-b-8 border-emerald-800 transition-all active:border-b-0 active:translate-y-2"
            >
              Save to Campaign Log
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default TacticalScroll;
