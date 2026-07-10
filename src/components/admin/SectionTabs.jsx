export default function SectionTabs({ sections, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sections.map((s) => (
        <button
          key={s.key}
          onClick={() => onChange(s.key)}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            active === s.key
              ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/20'
              : 'bg-white/[0.03] text-gray-400 border-transparent hover:bg-white/[0.06] hover:text-gray-300'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
