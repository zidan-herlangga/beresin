import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Layanan from "./components/Layanan";
import Harga from "./components/Harga";
import CaraOrder from "./components/CaraOrder";
import TimAhli from "./components/TimAhli";
import Portofolio from "./components/Portofolio";
import Garansi from "./components/Garansi";
import Testimoni from "./components/Testimoni";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import Kontak from "./components/Kontak";
import Footer from "./components/Footer";
import FloatingButton from "./components/FloatingButton";

import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";
import SyaratKetentuan from "./components/SyaratKetentuan";
import CookieConsent from "./components/CookieConsent";
import Preloader from "./components/Preloader";
import Tentang from "./pages/Tentang";
import LayananPage from "./pages/Layanan";
import CaraOrderPage from "./pages/CaraOrder";
import KontakPage from "./pages/Kontak";
import Admin from "./pages/Admin";

function HomePage({ onOpenSyarat }) {
  return (
    <>
      <Hero />
      <Layanan />
      <Harga />
      <CaraOrder />
      <TimAhli />
      <Portofolio />
      <Garansi />
      <Testimoni />
      <FAQ />
      <Blog />
      <Kontak />
    </>
  );
}

function App() {
  const [syaratOpen, setSyaratOpen] = useState(false);

  const layout = (page) => (
    <>
      <Navbar />
      {page}
      <Footer onOpenSyarat={() => setSyaratOpen(true)} />
      <FloatingButton />
      <BackToTop />
      <SyaratKetentuan open={syaratOpen} setOpen={setSyaratOpen} />
      <CookieConsent />
    </>
  );

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <Preloader />
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Routes>
            <Route path="/" element={layout(<HomePage onOpenSyarat={() => setSyaratOpen(true)} />)} />
            <Route path="/tentang" element={layout(<Tentang />)} />
            <Route path="/layanan" element={layout(<LayananPage />)} />
            <Route path="/cara-order" element={layout(<CaraOrderPage />)} />
            <Route path="/kontak" element={layout(<KontakPage />)} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
