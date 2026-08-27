import React, { useState } from 'react';
import { GoDownload } from "react-icons/go";
import Searching from '../components/searching';
import { IoIosSearch } from 'react-icons/io';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";


const participants = [
  { initials: "AL", name: "Ayu Lestari", code: "PSI-2031" },
  { initials: "BS", name: "Bimo Saputra", code: "PSI-2032" },
  { initials: "CD", name: "Citra Dewi", code: "PSI-2033" },
  { initials: "DP", name: "Dimas Prakoso", code: "PSI-2034" },
  { initials: "EW", name: "Eka Wulandari", code: "PSI-2035" },
  { initials: "FN", name: "Farhan Nugraha", code: "PSI-2036" },
];

const papiData = [
  { axis: "N", value: 7 },
  { axis: "G", value: 8 },
  { axis: "A", value: 8 },
  { axis: "L", value: 9 },
  { axis: "P", value: 6 },
  { axis: "I", value: 5 },
  { axis: "X", value: 4 },
  { axis: "B", value: 6 },
  { axis: "O", value: 8 },
  { axis: "R", value: 6 },
];


const HasilLaporan = () => {
  const [selected, setSelected] = useState("PSI-2031");
  const active = participants.find((p) => p.code === selected);

    return (
        <>
          {/* Page header */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                    <h1 className="font-serif text-3xl text-neutral-900">Hasil &amp; Laporan</h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Skor WPT dan profil PAPI peserta dalam satu tampilan
                    </p>
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                    <GoDownload size={14} />
                    Cetak / Export PDF
                </button>
            </div>

         {/* Main content */}
          <div className="flex gap-6">
                {/* Sidebar list */}
             <div className="w-80 shrink-0 rounded-xl border border-neutral-200 bg-white p-4">
                         <h2 className="mb-4 px-2 font-serif text-lg text-neutral-900">Peserta</h2>
                         <div className="mb-3 flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5">
                           <IoIosSearch size={14} className="text-neutral-400" />
                           <input
                             placeholder="Cari peserta..."
                             className="w-full bg-transparent text-sm text-neutral-600 placeholder-neutral-400 outline-none"
                           />
                         </div>
                         <div className="flex flex-col gap-1">
                           {participants.map((p) => {
                             const isActive = p.code === selected;
                             return (
                               <button
                                 key={p.code}
                                 onClick={() => setSelected(p.code)}
                                 className={`flex items-center justify-between rounded-lg px-3 py-3 text-left transition-colors ${
                                   isActive ? "bg-teal-950 text-white" : "hover:bg-neutral-50 text-neutral-800"
                                 }`}
                               >
                                 <div className="flex items-center gap-3">
                                   <div
                                     className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-medium ${
                                       isActive ? "bg-white/15 text-white" : "bg-neutral-100 text-neutral-600"
                                     }`}
                                   >
                                     {p.initials}
                                   </div>
                                   <div>
                                     <p className="text-sm font-medium">{p.name}</p>
                                     <p className={`text-xs ${isActive ? "text-teal-100/70" : "text-neutral-400"}`}>
                                       {p.code}
                                     </p>
                                   </div>
                                 </div>
                               </button>
                             );
                           })}
                         </div>
              </div>

              {/* Main content */}
                      <div className="flex-1">
                        <h2 className="font-serif text-2xl text-neutral-900">{active.name}</h2>
                        <p className="mt-1 font-mono text-sm text-neutral-500">
                          {active.code} · Terakhir aktivitas 2 Agu 2026
                        </p>
              
                        {/* Banner */}
                        <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/60 px-6 py-5">
                          <p className="mb-1 text-sm font-semibold text-neutral-900">
                            Ringkasan gabungan tersedia
                          </p>
                          <p className="text-sm leading-relaxed text-neutral-600">
                            Kedua test sudah diselesaikan peserta ini — skor kognitif (WPT) dan profil
                            kepribadian (PAPI) dapat dilihat bersamaan di bawah untuk mendukung interpretasi
                            menyeluruh.
                          </p>
                        </div>
              
                        {/* Two cards */}
                        <div className="mt-6 grid grid-cols-2 gap-6">
                          {/* Skor kognitif */}
                          <div className="rounded-xl border border-neutral-200 bg-white p-6">
                            <p className="text-xs font-medium tracking-wide text-neutral-400">
                              SKOR KOGNITIF
                            </p>
                            <h3 className="mt-1 font-serif text-lg text-neutral-900">
                              Wonderlic Personnel Test
                            </h3>
              
                            <div className="mt-6 flex items-baseline gap-2">
                              <span className="font-serif text-5xl text-neutral-900">28</span>
                              <span className="text-sm text-neutral-500">/ 50 soal benar</span>
                            </div>
              
                            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                              <div className="h-full rounded-full bg-teal-800" style={{ width: "56%" }} />
                            </div>
              
                            <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                              <span>Waktu pengerjaan: 11m 40s</span>
                              <span>Persentil est.: 56%</span>
                            </div>
                          </div>
              
                          {/* PAPI radar */}
                          <div className="rounded-xl border border-neutral-200 bg-white p-6">
                            <p className="text-xs font-medium tracking-wide text-neutral-400">
                              PROFIL KEPRIBADIAN
                            </p>
                            <h3 className="mt-1 font-serif text-lg text-neutral-900">PAPI Kostick</h3>
              
                            <div className="mt-2 h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={papiData} outerRadius="75%">
                                  <PolarGrid stroke="#e5e5e5" />
                                  <PolarAngleAxis
                                    dataKey="axis"
                                    tick={{ fill: "#737373", fontSize: 12 }}
                                  />
                                  <Radar
                                    dataKey="value"
                                    stroke="#b45309"
                                    strokeWidth={2}
                                    fill="#d97706"
                                    fillOpacity={0.25}
                                  />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </div>
          </div>
        </>
    );
}

export default HasilLaporan;
