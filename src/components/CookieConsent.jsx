import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("beresin-cookie");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("beresin-cookie", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Website ini pake cookie buat pengalaman terbaik. Dengan lanjut, kamu setuju{" "}
            <button
              onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
              className="text-indigo-600 dark:text-indigo-400 underline"
            >
              kebijakan cookie
            </button>{" "}
            kami.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Setuju
          </button>
        </div>
      </div>
    </div>
  );
}
