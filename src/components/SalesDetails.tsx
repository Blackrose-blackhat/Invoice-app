import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SalesDetails: React.FC = () => {
  let navigate = useNavigate();
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
          Sales Order
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Sales Order</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/sales")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button className="bg-green-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Edit
          </button>
          <button className="bg-orange-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Add items
          </button>
          <button className="bg-blue-900 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            New Invoice
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
                <td className="flex-1 font-semibold">Sales Order Number</td>
                <td className="flex-1 ">924</td>
                <td className="flex-1 font-semibold">Sales Order Date</td>
                <td className="flex-1">15-Nov-2023</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold ">Po No.</td>
                <td className="flex-1">PO/150/22-23</td>
                <td className="flex-1 font-semibold">Po Date</td>
                <td className="flex-1">06 Nov 2023</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Shipping Company</td>
                <td className="flex-1">J P ENTERPRESISES</td>
                <td className="flex-1 font-semibold">Remarks</td>
                <td className="flex-1"></td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Shipping Charges</td>
                <td className="flex-1">0.00</td>
                <td className="flex-1 font-semibold">Insaurance</td>
                <td className="flex-1">0.00</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Transporter</td>
                <td className="flex-1 ">Pune</td>
                <td className="flex-1 font-semibold">Despatch Thru</td>
                <td className="flex-1">Blue Dart</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="w-full flex flex-col p-2 ">
            <h1 className="font-semibold text-neutral-700 py-3">Sales Order Items</h1>
          <table>
            <th className="text-sm text-neutral-700 ">Product Code</th>
            <th className="text-sm text-neutral-700">Quantity</th>
            <th className="text-sm text-neutral-700">Unit</th>
            <th className="text-sm text-neutral-700">Rate</th>
            <th className="text-sm text-neutral-700">Total Amount</th>
           
            <th className="text-sm text-neutral-700">Actions</th>

            <tr className="items-center justify-center p-1">
              <td className="text-sm text-neutral-700">D15V9-150-130*</td>
              <td className="text-sm text-neutral-700">3.00</td>
              <td className="text-sm text-neutral-700">Nos</td>
              <td className="text-sm text-neutral-700">1400.00</td>
              <td className="text-sm text-neutral-700">4200.00</td>
              
              <td className="text-sm text-neutral-700">
                <div className="flex flex-row items-center justify-center gap-5">
                  <button className= "p-1 bg-blue-500 text-white font-semibold text-sm rounded-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white font-semibold text-sm p-1 rounded-sm">
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          </table>

        </div>

      </div>
    </div>
  );
};
export default SalesDetails;
