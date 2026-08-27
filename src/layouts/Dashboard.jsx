import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Table from '../components/table';

const Dashboard = () => {
const [ Filter, setFilter] = useState("Semua");

     
const stats = [
  { label: "TOTAL PESERTA", value: "128", note: "+6 minggu ini", noteColor: "text-neutral-400" },
  { label: "WPT SELESAI", value: "94", note: "73% dari total", noteColor: "text-neutral-400" },
  { label: "PAPI SELESAI", value: "81", note: "63% dari total", noteColor: "text-neutral-400" },
  { label: "MENUNGGU REVIEW", value: "17", note: "perlu ditinjau", noteColor: "text-orange-500" },
];

const participants = [
  {
    initials: "AL",
    name: "Ayu Lestari",
    code: "PSI-2031",
    wpt: "Selesai",
    papi: "Selesai",
    tanggal: "2 Agu 2026",
    profileSeed: 1,
  },
  {
    initials: "BS",
    name: "Bimo Saputra",
    code: "PSI-2032",
    wpt: "Selesai",
    papi: "Menunggu",
    tanggal: "2 Agu 2026",
    profileSeed: 2,
  },
  {
    initials: "CD",
    name: "Citra Dewi",
    code: "PSI-2033",
    wpt: "Menunggu",
    papi: "Selesai",
    tanggal: "1 Agu 2026",
    profileSeed: 3,
  },
  {
    initials: "DP",
    name: "Dimas Prakoso",
    code: "PSI-2034",
    wpt: "Selesai",
    papi: "Selesai",
    tanggal: "1 Agu 2026",
    profileSeed: 4,
  },
  {
    initials: "EW",
    name: "Eka Wulandari",
    code: "PSI-2035",
    wpt: "Belum mulai",
    papi: "Belum mulai",
    tanggal: "31 Jul 2026",
    profileSeed: 5,
  },
  {
    initials: "FN",
    name: "Farhan Nugraha",
    code: "PSI-2036",
    wpt: "Selesai",
    papi: "Selesai",
    tanggal: "31 Jul 2026",
    profileSeed: 6,
  },
];
 
    return (
           <main className="flex-1 px-10 py-8">
              
            {/* Stat cards */}
            <div className="mb-6 grid grid-cols-4 gap-5">
            {stats.map((s) => (
                <div
                key={s.label}
                className="rounded-xl border border-neutral-200 bg-white px-6 py-5 shadow-sm"
                >
                <p className="mb-3 text-[11px] font-medium tracking-wide text-neutral-400">
                    {s.label}
                </p>
                <p className="font-serif text-4xl leading-none text-neutral-900">
                    {s.value}
                </p>
                <p className={`mt-3 text-xs ${s.noteColor}`}>{s.note}</p>
                </div>
            ))}
            </div>

           {/* Main table  */}
          <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="font-serif text-xl text-neutral-900">Peserta Terbaru</h2>
            <div className="flex gap-2">
              {["Semua", "Menunggu", "Selesai"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    Filter === f
                      ? "bg-teal-800 text-white"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
             <Table participants={participants} />
          </div>

           </main>
    );
}

export default Dashboard;
