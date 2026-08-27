import React from 'react';

const Table = ({participants}) => {
    return (
         <table className="w-full border-collapse">
            <thead>
              <tr className="border-t border-neutral-100 text-left text-[11px] tracking-wide text-neutral-400">
                <th className="px-6 py-3 font-medium">PESERTA</th>
                <th className="px-6 py-3 font-medium">WPT</th>
                <th className="px-6 py-3 font-medium">PAPI</th>
                <th className="px-6 py-3 font-medium">PROFIL</th>
                <th className="px-6 py-3 font-medium text-right">TANGGAL</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.code} className="border-t border-neutral-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-xs font-medium text-neutral-600">
                        {p.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{p.name}</p>
                        <p className="text-xs text-neutral-400">{p.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={p.wpt} />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={p.papi} />
                  </td>
                  <td className="px-6 py-4">
                    <ProfileIcon seed={p.profileSeed} />
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-xs text-neutral-500">
                    {p.tanggal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    );
}

export default Table;

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

function ProfileIcon({ seed }) {
  // Slightly varied organic blob outline per row, echoing the reference icon
  const rotations = [0, 40, 80, 120, 160, 200];
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${rotations[seed % rotations.length]}deg)` }}
      className="text-teal-700/70"
    >
      <path
        d="M12 2C15 2 17 4 18 7C19 10 22 11 21 14C20 17 17 17 15 19C13 21 10 22 8 20C6 18 3 18 2 15C1 12 3 10 4 7C5 4 9 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}