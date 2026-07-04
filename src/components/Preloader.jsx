import { useState, useEffect } from "react";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const done = sessionStorage.getItem("jokiyuk-loaded");
    if (done) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("jokiyuk-loaded", "true");
      document.body.style.overflow = "";
    }, 1500);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99] bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
          <span className="text-2xl font-bold text-white">J</span>
        </div>
        <div className="mt-4 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Beresin
        </div>
        <div className="mt-5 flex gap-1.5 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
