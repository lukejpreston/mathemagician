import React, { useState } from 'react';
import OrbWand from '../assets/icons/orb-wand.svg?react';
import { deleteAllMathemagicians } from '../logic/storage';

interface Props {
  onDeleteAll: () => void;
}

const About: React.FC<Props> = ({ onDeleteAll }) => {
  const [showExpellAllModal, setShowExpellAllModal] = useState(false);

  const handleExpellAll = () => {
    deleteAllMathemagicians();
    setShowExpellAllModal(false);
    onDeleteAll();
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-amber-400">
          <OrbWand className="w-10 h-10" /> About Mathemagician
        </h2>

        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
          <p>
            <strong className="text-amber-400">Mathemagician</strong> is a magical math practice app 
            designed to help young wizards master arithmetic through enchanting exercises.
          </p>

          <div className="bg-slate-700/50 p-6 rounded-2xl space-y-4">
            <h3 className="text-2xl font-bold text-emerald-400">✨ Features</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Practice addition, subtraction, multiplication, and division</li>
              <li>Customizable difficulty with adjustable number ranges</li>
              <li>Create multiple magician profiles to track progress</li>
              <li>View your magical history in the Wizard Tower</li>
              <li>Print-friendly scrolls for offline practice</li>
            </ul>
          </div>

          <div className="bg-slate-700/50 p-6 rounded-2xl space-y-4">
            <h3 className="text-2xl font-bold text-purple-400">🧙 How to Use</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Create a magician profile in the Sanctum</li>
              <li>Configure your practice scroll with operators and number ranges</li>
              <li>Complete the arcane scroll to practice your math skills</li>
              <li>Visit the Wizard Tower to review your progress over time</li>
            </ol>
          </div>

          <div className="bg-slate-700/50 p-6 rounded-2xl space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">🔒 Your Data &amp; Privacy</h3>
            <p>
              All data is stored locally in your browser's <strong className="text-blue-300">local storage</strong>. 
              Nothing is tracked, sent, or stored outside of your device.
            </p>
            <p>
              Local storage is used solely to keep track of a mathemagician's progress over time.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="py-2 px-3 text-blue-300 font-bold">Data</th>
                    <th className="py-2 px-3 text-blue-300 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-600/50">
                    <td className="py-2 px-3 font-medium">Magician Name</td>
                    <td className="py-2 px-3">The name you choose for your profile</td>
                  </tr>
                  <tr className="border-b border-slate-600/50">
                    <td className="py-2 px-3 font-medium">Magician ID</td>
                    <td className="py-2 px-3">A unique identifier to link records to your profile</td>
                  </tr>
                  <tr className="border-b border-slate-600/50">
                    <td className="py-2 px-3 font-medium">Practice Date</td>
                    <td className="py-2 px-3">When each practice session was completed</td>
                  </tr>
                  <tr className="border-b border-slate-600/50">
                    <td className="py-2 px-3 font-medium">Scroll Settings</td>
                    <td className="py-2 px-3">Operators, number range, and question count used</td>
                  </tr>
                  <tr className="border-b border-slate-600/50">
                    <td className="py-2 px-3 font-medium">Score</td>
                    <td className="py-2 px-3">Number of correct answers out of total questions</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Time Taken</td>
                    <td className="py-2 px-3">How long the practice session took</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-400 italic">
              If you prefer not to store any data, simply don't create a magician — you can still 
              practice with the arcane scrolls without saving progress.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-600">
              <h4 className="text-xl font-bold text-red-400 mb-3">🗑️ Deleting Your Data</h4>
              <p className="mb-4">
                To delete an individual Mathemagician and their records, visit the <strong className="text-emerald-400">Wizard Tower</strong>, 
                select the magician, and click the <strong className="text-red-400">Expell Wizard</strong> button.
              </p>
              <p className="mb-4">
                To delete all data at once, use the button below:
              </p>
              <button
                onClick={() => setShowExpellAllModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Expell all Mathemagicians
              </button>
            </div>
          </div>

          <p className="text-slate-400 italic text-base mt-8">
            May your calculations be swift and your answers be true! 🌟
          </p>
        </div>
      </section>

      {showExpellAllModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 shadow-2xl max-w-lg mx-4 animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Expell All Mathemagicians</h3>
            <p className="text-xl text-slate-300 mb-6">
              You wish to expell ALL Mathemagicians from the tower? All magician profiles and their practice records will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowExpellAllModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExpellAll}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Expell All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
