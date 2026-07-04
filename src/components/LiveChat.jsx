import { useState } from "react";

const messages = [
  { from: "bot", text: "Halo! 👋 Ada yang bisa kami bantu?" },
  { from: "bot", text: "Tanya-tanya dulu aja, gratis kok!" },
];

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const body = encodeURIComponent(`Halo Beresin! ${input}`);
    window.open(`https://wa.me/6281234567890?text=${body}`, "_blank");
    setInput("");
  };

  return (
    <div className="fixed bottom-5 left-5 z-[70]">
      {open && (
        <div className="absolute bottom-16 left-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up">
          <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
              J
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Beresin Chat</p>
              <p className="text-[10px] text-indigo-200">Online • Balas dalam &lt; 5 menit</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto p-1 text-white/80 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 py-3 space-y-3 min-h-[200px] max-h-[260px] overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 text-sm rounded-2xl ${
                    m.from === "bot"
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-bl-sm"
                      : "bg-indigo-600 text-white rounded-br-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-xl focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            <button
              onClick={send}
              className="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center ${
          open ? "rotate-90" : ""
        }`}
        aria-label="Chat"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
