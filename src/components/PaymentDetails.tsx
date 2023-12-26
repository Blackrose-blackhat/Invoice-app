import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  comma,
  deletePaymentById,
  getVoucherById,
} from "../utils/Actions";

const PaymentDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);
  const getPaymentDetails = () => {
    const res = getVoucherById(id);
    res.then((result) => {
      setPayment([result]);
      console.log(result);
    });
  };
  useEffect(() => {
    getPaymentDetails();
  }, [id]);
  

  const handleDelete = (id: string) => {
    const res = deletePaymentById(id);
    console.log(res);
    navigate("/home/payment");
    toast.success("Payment detail deleted successfully");
  };

  return (
    <div className="flex flex-col justify-center  w-full  gap-10 px-5 py-5 ">
      <div className=" flex flex-row  justify-between w-full -mt-44">
        <p className="font-semibold text-xl text-neutral-800">
          Payment Voucher
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Payment Voucher</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/payment")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button onClick={()=> navigate(`/home/payment/new/${id}`)} className="bg-green-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Edit
          </button>

          <button
            onClick={() => handleDelete(id)}
            className="bg-red-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col shadow-sm shadow-neutral-700 w-full p-2 rounded-md">
        <div className="flex flex-row w-full  p-2 rounded-md">
          <table className="w-full border">
            {payment.map((item: any) => (
              <tbody key={item._id}>
                <tr className="text-sm p-3 text-neutral-600  border ">
                  <td className="flex-1 font-semibold p-3">Payment Voucher ID</td>
                  <td className="flex-1 ">{item.voucherId}</td>
                  <td className="flex-1 font-semibold">Voucher Number</td>
                  <td className="flex-1">{item.voucherNumber}</td>
                </tr>
                <tr className="text-sm text-neutral-600  border px-4 py-2">
                  <td className="flex-1 p-3 font-semibold ">Voucher Date</td>
                  <td className="flex-1">{item.voucherDate}</td>
                  <td className="flex-1 font-semibold">Place Of Supply</td>
                  <td className="flex-1">{item.placeOfSupply}</td>
                </tr>
                <tr className="text-sm text-neutral-600  border px-4 py-2">
                  <td className="flex-1 p-3 font-semibold">Clinet Name</td>
                  <td className="flex-1">{item.clientName} </td>
                  <td className="flex-1 font-semibold">Address</td>
                  <td className="flex-1">{item.address}</td>
                </tr>
                <tr className="text-sm text-neutral-600  border px-4 py-2">
                  <td className="flex-1 p-3 font-semibold">State</td>
                  <td className="flex-1">{item.state}</td>
                  <td className="flex-1 font-semibold">GSTIN</td>
                  <td className="flex-1">{item.GSTINNumber}</td>
                </tr>
                <tr className="text-sm text-neutral-600  border px-4 py-2">
                  <td className="flex-1 p-3 font-semibold">Instrument Number</td>
                  <td className="flex-1">{item.Instumetno}</td>
                  <td className="flex-1 font-semibold">Amount</td>
                  <td className="flex-1">{comma(Number(item.Amount))}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className="w-full p-2">
          <h1 className="font-semibold text-neutral-700 py-3">
            Sales Order Items
          </h1>
          <table className="w-full border-collapse border border-neutral-300">
            <thead>
              <tr>
                <th className="py-2 text-sm text-neutral-700 border border-neutral-300">
                  Product
                </th>
                <th className="py-2 text-sm text-neutral-700 border border-neutral-300">
                  HSN Code
                </th>
                <th className="py-2 text-sm text-neutral-700 border border-neutral-300">
                  Taxable Value
                </th>
                <th className="py-2 text-sm text-neutral-700 border border-neutral-300">
                  SGST/CGST(%)
                </th>
                <th className="py-2 text-sm text-neutral-700 border border-neutral-300">
                  IGST
                </th>
                <th className="py-2 text-sm text-neutral-700 border border-neutral-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              
              {payment.map((item: any) =>
              
                item.AddedProduct?.map((prod: any) => (
                  <tr className="py-1 border-b border-neutral-300 text-center">
                    <td className="border border-neutral-300 py-2 text-sm text-neutral-700">{prod.productDescription}</td>
                    <td className="py-2 border border-neutral-300 text-sm text-neutral-700">{prod.hsnCode}</td>
                    <td className="py-2 border border-neutral-300 text-sm text-neutral-700">{comma(Number(prod.productRate * prod.quantity))}</td>
                    <td className="py-2 border border-neutral-300 text-sm text-neutral-700">{prod.CGST || prod.SGST}</td>
                    <td className="py-2 border border-neutral-300 text-sm text-neutral-700">{prod.IGST}</td>
                    <td className="py-2 border border-neutral-300 text-sm text-neutral-700">
                      <div className="flex  items-center justify-center gap-2">
                        
                        <button className="px-2 py-1 bg-red-500 text-white font-semibold text-sm rounded-sm hover:bg-red-600 focus:outline-none focus:shadow-outline-red">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default PaymentDetails;
