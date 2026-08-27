import React from "react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


export default function InviteModal({ open, onClose, onSubmit }) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [testType, setTestType] = useState("WPT + PAPI");
 
  if (!open) return null;
 
  const handleSubmit = () => {
    onSubmit({ nama, email, testType });
  };
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-6">
          <h2 className="font-serif text-2xl text-neutral-900">Undang Peserta Baru</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          >
            <span size={16}>X</span>
          </button>
        </div>
 
        <div className="h-px w-full bg-neutral-100" />
 
        {/* Form */}
        <div className="flex flex-col gap-5 px-8 py-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">
              Nama lengkap
            </label>
            <input
              onChange={(e) => setNama(e.target.value)}
              placeholder="cth. Gita Permata"
              className="w-full rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-700 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-teal-800/40"
            />
          </div>
 
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cth. gita@email.com"
              className="w-full rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-700 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-teal-800/40"
            />
          </div>
 
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">
              Test yang ditugaskan
            </label>
            <div className="relative">
              <select
                onChange={(e) => setTestType(e.target.value)}
                className="w-full appearance-none rounded-lg border border-teal-800 bg-neutral-100 px-4 py-3 text-sm text-neutral-700 outline-none"
              >
                <option>WPT + PAPI</option>
                <option>WPT saja</option>
                <option>PAPI saja</option>
              </select>
              <FaChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
              />
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              Kode akses unik akan dibuat otomatis dan dikirim ke email peserta.
            </p>
          </div>
        </div>
 
        <div className="h-px w-full bg-neutral-100" />
 
        {/* Footer */}
        <div className="flex justify-end gap-3 px-8 py-6">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-teal-950 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-teal-900"
          >
            Kirim Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
 
function Toast({ show, email }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl bg-teal-950 px-5 py-4 text-white shadow-lg animate-in fade-in slide-in-from-bottom-2">
      <FaChevronDown size={20} className="mt-0.5 shrink-0 text-emerald-400" />
      <div>
        <p className="text-sm font-medium">Undangan berhasil dikirim</p>
        <p className="text-xs text-teal-100/70">
          Kode akses telah dikirim ke {email || "email peserta"}
        </p>
      </div>
    </div>
  );
}