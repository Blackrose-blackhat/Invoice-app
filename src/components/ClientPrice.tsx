import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientPriceDetails: React.FC = () => {
  const navigate = useNavigate();
  // const [invoice, setInvoice] = useState<{ invoice_id: number; InvoiceNumber: string; InvoideDate: string; ShippingAddress: string; Destination: string; } | null>(null);

  // const { invoiceId } = useParams();
  // // useEffect(() => {
  // //   const result = getInvoiceById(Number(invoiceId));
  // //   if (result === "Invoice not found") {
  // //     setInvoice(null);
  // //   } else {
  // //     setInvoice(result);
  // //   }

  // // }, [invoiceId]);

  return (
    <div className="flex flex-col justify-center  w-full  gap-10 px-5 py-5 ">
      <div className=" flex flex-row  justify-between w-full -mt-44">
        <p className="font-semibold text-xl text-neutral-800">
          Client Price
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Client Price</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/clients")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button className="bg-green-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Edit
          </button>
          
          <button className="bg-red-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col shadow-sm shadow-neutral-700 w-full p-2 rounded-md">
        <div className="flex flex-row w-full  p-2 rounded-md">
          <table className="w-full border">
            <tbody>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Sl No.:</td>
                <td className="flex-1 ">1003</td>
               
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold ">Client Name</td>
                <td className="flex-1 upperacse">5-POINT profile tools</td>
                
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Product Info</td>
                <td className="flex-1">-d1a-1-150-10 </td>
               
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Unit</td>
                <td className="flex-1">Nos</td>
               
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Rate</td>
                <td className="flex-1">Rs. 2200.00</td>
               
              </tr>
            
              
            </tbody>
          </table>
        </div>

        

      </div>
    </div>
  );
};
export default ClientPriceDetails;
