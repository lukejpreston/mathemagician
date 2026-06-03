import React, { useState, useMemo } from 'react';
import type { Mathemagician } from '../types';
import { getRecords, deleteMathemagician, saveMathemagician } from '../logic/storage';
import BookPile from '../assets/icons/book-pile.svg?react'

interface Props {
  magicians: Mathemagician[];
  onMagicianDeleted: () => void;
}

const WizardTower: React.FC<Props> = ({ magicians, onMagicianDeleted }) => {
  const [selectedId, setSelectedId] = useState<string>(magicians[0]?.id || '');
  const [showExpellModal, setShowExpellModal] = useState(false);
  const [newMagicianName, setNewMagicianName] = useState('');
  
  const records = useMemo(() => {
    return getRecords(selectedId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedId]);

  const selectedMagician = magicians.find(m => m.id === selectedId);

  const handleExpell = () => {
    deleteMathemagician(selectedId);
    setShowExpellModal(false);
    // Reset selection to first remaining magician or empty
    const remainingMagicians = magicians.filter(m => m.id !== selectedId);
    setSelectedId(remainingMagicians[0]?.id || '');
    onMagicianDeleted();
  };

  const handleAddMagician = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMagicianName.trim()) {
      const newMagician = saveMathemagician(newMagicianName.trim());
      onMagicianDeleted();
      setSelectedId(newMagician.id);
      setNewMagicianName('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
          <BookPile className="w-10 h-10" /> Magician Chronicles
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 md:overflow-x-auto pb-4">
          {magicians.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className={`w-full md:w-auto px-8 py-4 rounded-2xl text-2xl font-bold md:whitespace-nowrap border-b-4 transition-all ${
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

        <form onSubmit={handleAddMagician} className="flex flex-col md:flex-row gap-4 mt-4">
          <input
            type="text"
            placeholder="New Initiate Name..."
            value={newMagicianName}
            onChange={e => setNewMagicianName(e.target.value)}
            className="flex-1 min-h-20 h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-2xl font-bold px-6 focus:border-emerald-500 outline-none"
          />
          <button
            type="submit"
            className="w-full md:w-auto h-20 px-8 bg-emerald-600 hover:bg-emerald-500 text-2xl font-bold rounded-2xl border-b-8 border-emerald-800 transition-all active:border-b-0 active:translate-y-2"
          >
            Initiate
          </button>
        </form>

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

        {selectedMagician && (
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setShowExpellModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
            >
              Expell Wizard
            </button>
          </div>
        )}
      </section>

      {showExpellModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl max-w-lg mx-4 animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Expell Wizard</h3>
            <p className="text-xl text-slate-300 mb-6">
              You wish to expell this Mathemagician from the tower? All their data will be lost to the annals of history (all data will be removed are you sure?)
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowExpellModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExpell}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Expell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WizardTower;
