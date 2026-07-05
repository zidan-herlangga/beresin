import { useState, useEffect } from 'react';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const done = sessionStorage.getItem('beresin-loaded');
    if (done) {
      setShow(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('beresin-loaded', 'true');
        document.body.style.overflow = '';
      }, 500);
    }, 1800);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[99] bg-white dark:bg-gray-950 flex items-center justify-center transition-opacity duration-500 ${
        fade ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="relative">
          <img
            src="/logo.svg"
            alt="Beresin"
            width="120"
            height="120"
            className="w-20 h-20 mx-auto drop-shadow-xl animate-[float-up_0.8s_ease-out]"
          />
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" />
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center gap-1.5">
            {['B', 'E', 'R', 'E', 'S', 'I', 'N'].map((letter, i) => (
              <span
                key={i}
                className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-bounce"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  animationDuration: '0.6s',
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{
                animation: `pulse-glow 0.8s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
