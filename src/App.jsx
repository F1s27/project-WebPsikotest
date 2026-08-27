import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Dashboardpage from './pages/Dashboardpage'
import Routers from './Routers';
import Pesertapage from './pages/Pesertapage';
import Laporanpage from './pages/Laporanpage';
import SoalPAPIpage from './pages/SoalPAPIpage'
import PetunjukPAPIpage from './pages/PetunjukPAPIpage'
import TestPAPIpage from './pages/TestPAPIpage'
import SoalWPTpage from './pages/SoalWPTpage'
import SelesaiPAPIpage from './pages/SelesaiPAPIpage'


function App() {

  return (
      <Routes>
         <Route path="/" element={<Navigate to="/Dashboard" replace />} />
         <Route path="/Dashboard" element={<Routers Children={<Dashboardpage/>}/>}/>
         <Route path="/Peserta" element={<Routers Children={<Pesertapage/>}/>}/>
         <Route path="/Hasil&Laporan" element={<Routers Children={<Laporanpage/>}/>}/>
         <Route path="/SoalPAPI" element={<Routers Children={<SoalPAPIpage/>}/>}/>
         <Route path="/SoalPAPI/petunjuk" element={<Routers Children={<PetunjukPAPIpage/>}/>}/>
         <Route path="/SoalPAPI/test" element={<Routers Children={<TestPAPIpage/>}/>}/>
         <Route path="/SoalWPT" element={<Routers Children={<SoalWPTpage/>}/>}/>
         <Route path="/SoalPAPI/selesai" element={<Routers Children={<SelesaiPAPIpage/>}/>}/>
      </Routes>
  )
}

export default App