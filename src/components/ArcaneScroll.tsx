import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ScrollParams, Mathemagician } from '../types';
import { generateScroll } from '../logic/scrollGenerator';
import { saveRecord } from '../logic/storage';
import ScrollUnfurled from '../assets/icons/scroll-unfurled.svg?react'
import TiedScroll from '../assets/icons/tied-scroll.svg?react'

interface Props {
  params: ScrollParams;
  magician?: Mathemagician;
}

const ArcaneScroll: React.FC<Props> = ({ params, magician }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shuffleKey, setShuffleKey] = useState(0);
  const runes = useMemo(() => generateScroll(params), [params, shuffleKey]);
  const [score, setScore] = useState<number>(0);
  const [minutesTaken, setMinutesTaken] = useState<number>(0);
  const [secondsTaken, setSecondsTaken] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);

  const isRevealed = searchParams.get('reveal') === 'true';

  const toggleReveal = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isRevealed) {
      newParams.set('reveal', 'false');
    } else {
      newParams.set('reveal', 'true');
    }
    setSearchParams(newParams);
  };

  const handleSave = () => {
    if (magician) {
      saveRecord({
        mathemagicianId: magician.id,
        params,
        score,
        timeTakenSeconds: minutesTaken * 60 + secondsTaken,
        totalQuestions: runes.length,
      });
      setIsSaved(true);
    }
  };

  return (
    <div className="space-y-8 print:space-y-0 print:m-0">
      <div className="flex justify-end items-center print:hidden">
        <button
          onClick={() => window.print()}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-xl px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          <ScrollUnfurled className="w-8 h-8" /> Print Scroll
        </button>
      </div>

      {/* The Printable Page */}
      <div className="bg-white text-slate-900 p-[20mm] rounded-none shadow-2xl mx-auto w-full max-w-[210mm] min-h-[297mm] border-2 border-slate-200 print:shadow-none print:border-0 print:p-0 print:m-0">
        <header className="border-b-4 border-double border-slate-900 pb-4 mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div className="flex items-center gap-4">
            <TiedScroll className="w-16 h-16 text-black" />
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">Arcane Scroll</h1>
              <p className="text-xl font-bold italic text-slate-600">The Mathemagician's Art</p>
            </div>
          </div>
          <div className="md:text-right space-y-1">
            <p className="text-xl font-bold">Magician: <span className="border-b-2 border-slate-400 min-w-[150px] inline-block text-center">{magician?.name || '_______________'}</span></p>
            <p className="text-xl font-bold">Date: <span className="border-b-2 border-slate-400 min-w-[150px] inline-block text-center">{new Date().toLocaleDateString()}</span></p>
          </div>
        </header>

        <div className="grid grid-cols-1 print:grid-cols-3 md:grid-cols-3 gap-y-10 gap-x-8 mb-12">
          {runes.map((p, idx) => (
            <div key={p.id} className="text-3xl font-bold flex items-center gap-2 pr-4">
              <span className="text-slate-400 text-base w-8">{idx + 1}.</span>
              <span>{p.num1}</span>
              <span className="text-slate-500 w-6 text-center">{p.operator === '*' ? '×' : p.operator === '/' ? '÷' : p.operator}</span>
              <span>{p.num2}</span>
              <span className="text-slate-500">=</span>
              {isRevealed ? (
                <span className="w-16 h-10 text-emerald-600 text-center">{p.answer}</span>
              ) : (
                <span className="w-16 h-10 border-b-2 border-slate-300"></span>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-auto border-t-4 border-double border-slate-900 pt-8">
          <h2 className="text-2xl font-black uppercase mb-4 italic hidden print:block">Spell Evaluation</h2>
          <div className="hidden print:grid grid-cols-2 gap-8">
            <div className="border-2 border-slate-900 p-4 rounded-lg">
              <p className="text-lg font-bold uppercase mb-2">Rune Accuracy</p>
              <div className="text-4xl font-black">_____ / {runes.length}</div>
            </div>
            <div className="border-2 border-slate-900 p-4 rounded-lg">
              <p className="text-lg font-bold uppercase mb-2">Time to Mastery</p>
              <div className="text-4xl font-black">_____ min _____ sec</div>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-400 font-mono text-sm">
            Rune Strength: {params.minNumber} to {params.maxNumber} | Elements: {params.operators.join(', ')}
          </div>
        </footer>
      </div>

      {/* Recording Results - Post-Print Interface */}
      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl print:hidden">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
          <span className="text-4xl">🏅</span> Chronicle Spell Mastery
        </h2>
        {!magician ? (
          <p className="text-xl text-amber-400 font-bold italic">Select a Mathemagician to chronicle mastery!</p>
        ) : isSaved ? (
          <div className="text-center p-8">
            <p className="text-4xl font-black text-emerald-500 mb-4">Spell Mastered!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            <div className="space-y-4">
              <label className="block text-xl font-bold uppercase tracking-wider text-slate-400">Rune Accuracy<br />(out of {runes.length})</label>
              <input
                type="number"
                max={runes.length}
                value={score}
                onChange={e => setScore(parseInt(e.target.value) || 0)}
                className="w-full h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-4xl font-black text-center focus:border-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-xl font-bold uppercase tracking-wider text-slate-400">Minutes</label>
              <input
                type="number"
                min={0}
                value={minutesTaken}
                onChange={e => setMinutesTaken(parseInt(e.target.value) || 0)}
                className="w-full h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-4xl font-black text-center focus:border-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-xl font-bold uppercase tracking-wider text-slate-400">Seconds</label>
              <input
                type="number"
                min={0}
                max={59}
                value={secondsTaken}
                onChange={e => setSecondsTaken(parseInt(e.target.value) || 0)}
                className="w-full h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-4xl font-black text-center focus:border-emerald-500 outline-none"
              />
            </div>
            <button
              onClick={handleSave}
              className="md:col-span-3 h-20 bg-emerald-600 hover:bg-emerald-500 text-2xl font-bold rounded-2xl border-b-8 border-emerald-800 transition-all active:border-b-0 active:translate-y-2"
            >
              Save to Spell Chronicle
            </button>
          </div>
        )}
      </section>

      {/* Reveal/Conceal Runes Button */}
      <div className="flex justify-center gap-4 print:hidden">
        <button
          onClick={toggleReveal}
          className="bg-purple-600 hover:bg-purple-500 text-xl px-8 py-4 rounded-xl font-bold transition-colors border-b-4 border-purple-800 active:border-b-0 active:translate-y-1"
        >
          {isRevealed ? '🔮 Conceal the Runes' : '✨ Reveal the Runes'}
        </button>
        <button
          onClick={() => setShuffleKey(k => k + 1)}
          className="bg-amber-600 hover:bg-amber-500 text-xl px-8 py-4 rounded-xl font-bold transition-colors border-b-4 border-amber-800 active:border-b-0 active:translate-y-1"
        >
          🎲 Shuffle the Runes
        </button>
      </div>
    </div>
  );
};

export default ArcaneScroll;
