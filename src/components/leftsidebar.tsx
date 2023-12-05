import React from 'react';
import { useNavigate , useLocation } from 'react-router-dom'

export const Leftsidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    console.log(pathname);
   
    
   
  return (
    <div className=' w-full bg-[#60AFF8] sticky left-0 top-1 z-20 flex h-screen flex-col justify-between overflow-auto '>
        <div className='w-full'>
            <ul className='gap-10 flex flex-col items-start w-full h-screen justify-start text-left  '>
                <li className='w-full' >
                    <img src='/logo.png' alt='logo' className='w-40 h-40 ' />
                </li>
                <li className={`cursor-pointer font-semibold text-xl px-4 ${pathname === '/home' ? 'text-white' : 'text-slate-200'}`}>
                    <a onClick={()=> navigate("/home") }>Home</a>
                </li>
                <li className={`cursor-pointer font-semibold  text-xl px-4 ${pathname === '/home/invoices' ? 'text-white' : 'text-slate-200'}`}>
                    <a onClick={ ()=> navigate("/home/invoices")}>Invoices</a>
                </li>
                <li className={`cursor-pointer font-semibold  text-xl px-4 ${pathname === '/home/sales' ? 'text-white' : 'text-slate-200'}`}>
                    <a onClick={ ()=> navigate("/home/sales")}>Sales Order</a>
                </li>
                <li className={`cursor-pointer font-semibold  text-xl px-4 ${pathname === '/home/products' ? 'text-white' : 'text-slate-200'}`}>
                    <a onClick={ ()=> navigate("/home/products")}>Products</a>
                </li>
                <li className={`cursor-pointer font-semibold  text-xl px-4 ${pathname === '/home/payment' ? 'text-white' : 'text-slate-200'}`}>
                    <a onClick={ ()=> navigate("/home/payment")}>Payment Voucher</a>
                </li>
                <li className={`cursor-pointer font-semibold  text-xl px-4 ${pathname === '/home/clients' ? 'text-white' : 'text-slate-200'}`}>
                    <a onClick={ ()=> navigate("/home/clients")}>Clients</a>
                </li>
                <li className={`cursor-pointer font-semibold l text-xl px-4 ${pathname === '/home/tax' ? 'text-white' : 'text-slate-200'}`}>
                    <a onClick={ ()=> navigate("/home/tax")}>Tax details</a>
                </li>
                <li className={`cursor-pointer font-semibold  text-xl px-4 ${pathname === '/home/monthly' ? 'text-white' : 'text-slate-200'}`}>
                    <a onClick={ ()=> navigate("/home/monthly")}>Monthly</a>
                </li>
                <li>

                </li>
                </ul>
        </div>
    </div>
  )
}

