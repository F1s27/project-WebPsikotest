import React, { useState } from 'react';
import Searching from '../components/searching';
import Table2 from '../components/table2';
import InviteModal from '../components/toaster';


const Peserta = () => {
    const [ Query, setQuery ] = useState(); 
    const [ Filter, setFilter ] = useState("Semua");
    const [modalOpen, setModalOpen] = useState(false);


    return (
        <>
         <div>
            <InviteModal 
            open={modalOpen}
            onClose={()=> setModalOpen(false)}/>
         </div>
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
            <div>
            <h1 className="font-serif text-4xl text-neutral-900">Manajemen Peserta</h1>
            <p className="mt-2 text-sm text-neutral-500">
                Kelola daftar peserta, kode akses, dan status pengerjaan test
            </p>
            </div>
            <button  onClick={() => setModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-teal-800 px-5 py-3 text-sm font-medium text-white shadow-sm">
            + Undang Peserta
            </button>
        </div>

        {/* Searching */}
        <div className="mb-6 flex items-center justify-between gap-4">
         <Searching SetQuery={setQuery}/>
        <div className="flex gap-2">
          {["Semua", "Belum Selesai", "Selesai", "Belum Mulai"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                Filter === f
                  ? "bg-teal-800 text-white"
                  : "bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        </div>

        {/* Table */}
       <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            <Table2/>
       </div>

        </>

    );
}

export default Peserta;
