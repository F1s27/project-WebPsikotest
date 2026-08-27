import React from 'react';
import { IoIosSearch } from "react-icons/io";


const Searching = ({SetQuery}) => {
    return (
       <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3">
          <IoIosSearch size={16} className="text-neutral-400" />
          <input
              onChange={(e) => SetQuery(e.target.value)}
              placeholder="Cari nama atau kode akses..."
              className="w-full bg-transparent text-sm text-neutral-700 placeholder-neutral-400 outline-none"
                />
        </div>
    );
}

export default Searching;
