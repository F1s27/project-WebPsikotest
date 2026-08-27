import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
const location = useLocation();

const navItems = [
  { 
    label: "Dashboard" ,
    Link : "/Dashboard"
  },
  { 
    label: "Peserta", 
    Link : "/Peserta"
  },
  { 
    label: "Soal WPT",
    Link : "/SoalWPT"
  },
  { 
    label: "Soal PAPI",
    Link : "/SoalPAPI"
  },
  { 
    label: "Hasil & Laporan",
    Link : "/Hasil&Laporan"
  },
  { 
    label: "Pengaturan", 
    Link : "/Pengaturan"
  },
];
 

    return (
         <>
        <aside className="flex w-64 flex-col justify-between bg-teal-950 px-4 py-6 text-white">
         <div>
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = location.pathname === item.Link;

                   return (
                   <Link to={item.Link}
                    key={item.label}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                    active
                        ? "bg-white text-teal-950 font-medium"
                        : "text-teal-100/80 hover:bg-white/5"
                    }`}
                     >
                    <span className="text-[10px]">{active ? "◆" : "◇"}</span>
                    {item.label}
                    </Link>
                   )
                })}
            </nav>
          </div>
          <div>
            <div className="mb-4 h-px w-full bg-teal-800" />
            <p className="text-xs text-teal-300/60">Klinika Admin v0.1 — Prototype</p>
            </div>
         </aside>
         </>
    );
}

export default Navbar;
