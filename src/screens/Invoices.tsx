
import { InvoiceTable } from "../components/table";
import { invoice_data } from "../utils/data";
import React from "react";

 const Invoices = () => {
  
  return (
    <div className=" w-full h-screen flex flex-col py-20 gap-5">
      <div className="flex flex-row justify-between py-20 px-10 ">
        <h1 className="font-semibold text-slate-800 text-2xl">Invoices</h1>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>
      
      <div className="px-10 py-10 flex flex-col ">
        <div className=" w-full py-2 flex flex-col gap-5">

            <InvoiceTable invoices={invoice_data} />
          
        </div>
      </div>
    </div>
  );
};

export default Invoices;