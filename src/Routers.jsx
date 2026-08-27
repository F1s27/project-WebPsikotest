import React from 'react';
import Navbar from './components/navbar';

const Routers = ({Children}) => {
    return (
       <div className="flex min-h-screen w-full bg-neutral-100 font-sans text-neutral-800">
           <Navbar/>
            <div className='w-full p-6'>
               {Children}
            </div>
       </div>
    );
}

export default Routers;
