import React, { useState, useMemo } from 'react';
import type { Mathemagician } from '../types';
import { getRecords } from '../logic/storage';
import BookPile from '../assets/icons/book-pile.svg?react'
import ReturnArrow from '../assets/icons/return-arrow.svg?react'

interface Props {
  magicians: Mathemagician[];
  onBack: () => void;
}

const WizardTower: React.FC<Props> = ({ magicians, onBack }) => {
  const [selectedId, setSelectedId] = useState<string>(magicians[0]?.id || '');
  
  const records = useMemo(() => {
    return getRecords(selectedId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedId]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="bg-slate-700 hover:bg-slate-600 text-xl px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2"
      >
        <ReturnArrow className="w-6 h-6" /> Return to Sanctum
      </button>

      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
          <BookPile className="w-10 h-10" /> Magician Chronicles
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-4">
          {magicians.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className={`px-8 py-4 rounded-2xl text-2xl font-bold whitespace-nowrap border-b-4 transition-all ${
                selectedId === m.id
                  ? 'bg-emerald-600 text-white border-emerald-800'
                  : 'bg-slate-700 text-slate-400 border-slate-900'
              }`}
            >
              {m.name}
            </button>
          ))}
          {magicians.length === 0 && (
            <p className="text-slate-500 text-xl italic">No magicians initiated yet.</p>
          )}
        </div>

        <div className="mt-8 space-y-4">
          {records.length === 0 ? (
            <div className="bg-slate-900 p-12 rounded-2xl text-center text-slate-500 italic text-2xl">
              No spell chronicles found for this magician.
            </div>
          ) : (
            records.map(record => (
              <div key={record.id} className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div>
                  <div className="text-slate-500 uppercase text-xs font-black tracking-widest mb-1">Date</div>
                  <div className="text-xl font-bold">{new Date(record.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-slate-500 uppercase text-xs font-black tracking-widest mb-1">Incantation</div>
                  <div className="text-xl font-bold">
                    {record.params.operators.join(', ')} ({record.params.minNumber} to {record.params.maxNumber})
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 uppercase text-xs font-black tracking-widest mb-1">Accuracy</div>
                  <div className="text-3xl font-black text-amber-500">
                    {record.score} <span className="text-xl text-slate-600">/ {record.totalQuestions}</span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 uppercase text-xs font-black tracking-widest mb-1">Time Taken</div>
                  <div className="text-3xl font-black text-blue-500">
                    {Math.floor(record.timeTakenSeconds / 60)} <span className="text-xl text-slate-600">min</span>{' '}
                    {record.timeTakenSeconds % 60} <span className="text-xl text-slate-600">sec</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default WizardTower;
