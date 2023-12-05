import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingDetails: React.FC = () => {
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
          Shipping Address
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Shipping Address</p>
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
                <td className="flex-1 font-semibold">Shiiping Address id</td>
                <td className="flex-1 ">191</td>
                <td className="flex-1 font-semibold">Shipping Company</td>
                <td className="flex-1  uppercase">OM TOOLS</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold ">Billing Company Name</td>
                <td className="flex-1 upperacse">OM TOOLS</td>
                <td className="flex-1 font-semibold">Address 1</td>
                <td className="flex-1">PAP j-38 , Indaryani Chowk , MIDC,Bhosari</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Address 2</td>
                <td className="flex-1"> </td>
                <td className="flex-1 font-semibold">Area</td>
                <td className="flex-1">India</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">City</td>
                <td className="flex-1">Pune</td>
                <td className="flex-1 font-semibold">State</td>
                <td className="flex-1">Maharashtra</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Country</td>
                <td className="flex-1">India</td>
                <td className="flex-1 font-semibold">Zip Code</td>
                <td className="flex-1">411026</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Phone</td>
                <td className="flex-1">9890652823</td>
                <td className="flex-1 font-semibold">Contact Person</td>
                <td className="flex-1"></td>
              </tr>
              
            </tbody>
          </table>
        </div>

        

      </div>
    </div>
  );
};
export default ShippingDetails;