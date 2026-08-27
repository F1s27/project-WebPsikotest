import React from 'react';
import { FaRegCopy } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";
import { LuRotateCcw } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";



const Table2 = () => {
    const participants = [
  {
    initials: "AL",
    name: "Ayu Lestari",
    email: "ayu.lestari@email.com",
    kode: "PSI-2031",
    wpt: "Selesai",
    papi: "Selesai",
    tanggal: "2 Agu 2026",
  },
  {
    initials: "BS",
    name: "Bimo Saputra",
    email: "bimo.s@email.com",
    kode: "PSI-2032",
    wpt: "Selesai",
    papi: "Menunggu",
    tanggal: "2 Agu 2026",
  },
  {
    initials: "CD",
    name: "Citra Dewi",
    email: "citra.dewi@email.com",
    kode: "PSI-2033",
    wpt: "Menunggu",
    papi: "Selesai",
    tanggal: "1 Agu 2026",
  },
  {
    initials: "DP",
    name: "Dimas Prakoso",
    email: "dimas.p@email.com",
    kode: "PSI-2034",
    wpt: "Selesai",
    papi: "Selesai",
    tanggal: "1 Agu 2026",
  },
  {
    initials: "EW",
    name: "Eka Wulandari",
    email: "eka.w@email.com",
    kode: "PSI-2035",
    wpt: "Belum mulai",
    papi: "Belum mulai",
    tanggal: "31 Jul 2026",
  },
  {
    initials: "FN",
    name: "Farhan Nugraha",
    email: "farhan.n@email.com",
    kode: "PSI-2036",
    wpt: "Selesai",
    papi: "Selesai",
    tanggal: "31 Jul 2026",
  },
  {
    initials: "GR",
    name: "Gita Ramadhani",
    email: "gita.r@email.com",
    kode: "PSI-2037",
    wpt: "Menunggu",
    papi: "Belum mulai",
    tanggal: "30 Jul 2026",
  },
];
    return (
        <>
           {/* Table card */}
             
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left text-[11px] tracking-wide text-neutral-400">
                      <th className="px-6 py-4 font-medium">PESERTA</th>
                      <th className="px-6 py-4 font-medium">KODE AKSES</th>
                      <th className="px-6 py-4 font-medium">WPT</th>
                      <th className="px-6 py-4 font-medium">PAPI</th>
                      <th className="px-6 py-4 font-medium">DIUNDANG</th>
                      <th className="px-6 py-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p) => (
                      <tr key={p.kode} className="border-t border-neutral-100">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-xs font-medium text-neutral-600">
                              {p.initials}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-neutral-900">{p.name}</p>
                              <p className="text-xs text-neutral-400">{p.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-mono text-xs text-neutral-600">
                            {p.kode}
                            <FaRegCopy size={12} className="text-neutral-400" />
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={p.wpt} />
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={p.papi} />
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-neutral-500">
                          {p.tanggal}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50">
                              <FiMoreVertical size={14} />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50">
                              <LuRotateCcw size={14} />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50">
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            
        
        </>
    );
}


export default Table2;
 
function StatusBadge({ status }) {
  const styles = {
    Selesai: "bg-emerald-50 text-emerald-700",
    Menunggu: "bg-orange-50 text-orange-600",
    "Belum mulai": "bg-neutral-100 text-neutral-500",
  };
  const dotStyles = {
    Selesai: "bg-emerald-500",
    Menunggu: "bg-orange-500",
    "Belum mulai": "bg-neutral-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}
