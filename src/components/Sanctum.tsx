import React, { useState } from 'react';
import type { ScrollParams, Operator, Mathemagician } from '../types';
import { saveMathemagician } from '../logic/storage';

import SmallFire from '../assets/icons/small-fire.svg?react'
import Sparkles from '../assets/icons/sparkles.svg?react'
import RuneStone from '../assets/icons/rune-stone.svg?react'
import ScrollUnfurled from '../assets/icons/scroll-unfurled.svg?react'
import WizardFace from '../assets/icons/wizard-face.svg?react'

interface Props {
  params: ScrollParams;
  onStart: (params: ScrollParams) => void;
  magicians: Mathemagician[];
  selectedMagicianId: string;
  onSelectMagician: (id: string) => void;
  onMagiciansChange: () => void;
}

const Sanctum: React.FC<Props> = ({ 
  params: initialParams, 
  onStart, 
  magicians, 
  selectedMagicianId, 
  onSelectMagician,
  onMagiciansChange 
}) => {
  const [params, setParams] = useState(initialParams);
  const [newMagicianName, setNewMagicianName] = useState('');

  const toggleOperator = (op: Operator) => {
    const newOps = params.operators.includes(op)
      ? params.operators.filter(o => o !== op)
      : [...params.operators, op];
    if (newOps.length > 0) {
      setParams({ ...params, operators: newOps });
    }
  };

  const handleAddMagician = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMagicianName.trim()) {
      const newMagician = saveMathemagician(newMagicianName.trim());
      onMagiciansChange();
      onSelectMagician(newMagician.id);
      setNewMagicianName('');
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-amber-400">
          <Sparkles className="w-10 h-10" /> Arcane Elements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['+', '-', '*', '/'] as Operator[]).map(op => (
            <button
              key={op}
              onClick={() => toggleOperator(op)}
              className={`h-24 text-4xl font-black rounded-2xl border-b-8 transition-all active:border-b-0 active:translate-y-2 ${
                params.operators.includes(op)
                  ? 'bg-amber-500 text-slate-900 border-amber-700'
                  : 'bg-slate-700 text-slate-400 border-slate-900 opacity-50'
              }`}
            >
              {op === '*' ? '×' : op === '/' ? '÷' : op}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-purple-400">
          <RuneStone className="w-10 h-10" /> Rune Strength
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-xl font-bold uppercase tracking-wider text-slate-400">Min Power</label>
            <input
              type="number"
              value={params.minNumber}
              onChange={e => setParams({ ...params, minNumber: parseInt(e.target.value) || 0 })}
              className="w-full h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-4xl font-black text-center focus:border-purple-500 outline-none transition-colors"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-xl font-bold uppercase tracking-wider text-slate-400">Max Power</label>
            <input
              type="number"
              value={params.maxNumber}
              onChange={e => setParams({ ...params, maxNumber: parseInt(e.target.value) || 0 })}
              className="w-full h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-4xl font-black text-center focus:border-purple-500 outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-blue-400">
          <ScrollUnfurled className="w-10 h-10" /> Scroll Length
        </h2>
        <div className="space-y-4">
          <label className="block text-xl font-bold uppercase tracking-wider text-slate-400">Total Runes</label>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={params.questionCount}
            onChange={e => setParams({ ...params, questionCount: parseInt(e.target.value) })}
            className="w-full h-12 accent-blue-500 cursor-pointer"
          />
          <div className="text-center text-6xl font-black text-blue-500">{params.questionCount}</div>
        </div>
      </section>

      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
          <WizardFace className="w-10 h-10" /> Select Mathemagician
        </h2>
        <div className="space-y-6">
          <select
            value={selectedMagicianId}
            onChange={e => onSelectMagician(e.target.value)}
            className="w-full h-20 bg-slate-900 border-4 border-slate-700 rounded-2xl text-2xl font-bold px-6 focus:border-emerald-500 outline-none appearance-none"
          >
            <option value="">-- Choose Initiate --</option>
            {magicians.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <form onSubmit={handleAddMagician} className="flex flex-col md:flex-row gap-4">
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
        </div>
      </section>

      <button
        onClick={() => onStart(params)}
        className="w-full h-24 bg-amber-500 hover:bg-amber-400 text-slate-900 text-2xl font-black rounded-3xl border-b-12 border-amber-700 shadow-2xl transition-all active:border-b-0 active:translate-y-3 mb-12 flex items-center justify-center gap-6"
      >
        <SmallFire className="w-10 h-10 fill-black bg-transparent" /> MASTER THE SPELL <SmallFire className="w-10 h-10 fill-black bg-transparent" />
      </button>
    </div>
  );
};

export default Sanctum;
