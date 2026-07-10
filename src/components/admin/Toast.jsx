import { useEffect } from 'react';
import Svg from './Svg';
import { icons } from './constants';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slideDown">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl text-sm font-medium ${
          type === 'error'
            ? 'bg-red-900/80 border-red-500/20 text-red-200'
            : 'bg-emerald-900/80 border-emerald-500/20 text-emerald-200'
        }`}
      >
        <Svg
          d={type === 'error' ? icons.x : icons.save}
          className={`w-4 h-4 ${type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}
        />
        {message}
        <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
          <Svg d={icons.x} className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
