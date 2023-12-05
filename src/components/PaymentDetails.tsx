import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentDetails: React.FC = () => {
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
            onClick={() => navigate("/home/payment")}
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
            Print
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
                <td className="flex-1 font-semibold">Payment Voucher ID</td>
                <td className="flex-1 ">924</td>
                <td className="flex-1 font-semibold">Voucher Number</td>
                <td className="flex-1">1</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold ">Voucher Date</td>
                <td className="flex-1">15-22-23</td>
                <td className="flex-1 font-semibold">Place Of Supply</td>
                <td className="flex-1">TamilNadu</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Clinet Name</td>
                <td className="flex-1">SHREE MURUGAN LATHE WORKS </td>
                <td className="flex-1 font-semibold">Address</td>
                <td className="flex-1">TamilNAdu</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">State</td>
                <td className="flex-1">TamilNadu</td>
                <td className="flex-1 font-semibold">GSTIN</td>
                <td className="flex-1">0.00</td>
              </tr>
              
            </tbody>
          </table>
        </div>

        <div className="w-full flex flex-col p-2 ">
            <h1 className="font-semibold text-neutral-700 py-3">Sales Order Items</h1>
          <table>
            <th className="text-sm text-neutral-700 ">Product </th>
            <th className="text-sm text-neutral-700">HSN Code</th>
            <th className="text-sm text-neutral-700">Taxable Value</th>
            <th className="text-sm text-neutral-700">SGST/CGST(%)</th>
            <th className="text-sm text-neutral-700">IGST</th>
           
            <th className="text-sm text-neutral-700">Actions</th>

            <tr className="items-center justify-center p-1">
              <td className="text-sm text-neutral-700">Iron dies</td>
              <td className="text-sm text-neutral-700">2620</td>
              <td className="text-sm text-neutral-700">18500</td>
              <td className="text-sm text-neutral-700">9.00</td>
              <td className="text-sm text-neutral-700">0.00</td>
              
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
export default PaymentDetails;
