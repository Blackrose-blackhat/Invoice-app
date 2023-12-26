import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  comma,
  comma,
  deleteProductById,
  deleteSalesById,
  generateId,
  generateRandom3DigitNumber,
  getClientById,
  getCurrentDate,
  getCurrentDateFormatted,
  getNewSaledById,
  invoiceDB,
  ledgerDb,
} from "../utils/Actions";
import toast from "react-hot-toast";
import PouchDb from "pouchdb-browser";

import { useReactToPrint } from "react-to-print";
let tot = 0;
  let totalTaxRate = 0;
  let CGSTAmount = 0;
  let IGSTAmount = 0;
  let SGSTAmount = 0;
const SalesDetails: React.FC = () => {
  const rand = generateRandom3DigitNumber();
  const navigate = useNavigate();
  const [SalesDetails, setSalesDetails] = useState([]);
  const [prodDetails, setProdDetails] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getSalesDetails();





  }, []);

  const getSalesDetails = () => {
    const res = getNewSaledById(id);
    res.then((results) => {
      setSalesDetails([results]);
      console.log(results);
    });
  };
  SalesDetails.map((newSales: any) =>
    newSales.AddedProduct.map((prod: any) => console.log(prod))
  );



  const handleDelete = async (id: string) => {
    const res = await deleteSalesById(id);
    if (res) {
      navigate("/home/sales");
      toast.success("Sales Order Deleted Successfully");
    }
  };

  const handleNewInvoice = async () => {
    try {
      
      let newTotal = 0;
        let invoiceAmount = 0;
      SalesDetails?.forEach((sale: any) => {
        sale?.AddedProduct?.forEach((prod: any) => {
          tot += prod.productRate * prod.quantity;
          CGSTAmount +=
            (Number(prod.productRate) *
              Number(prod.quantity) *
              Number(prod.CGST)) /
            100;
          IGSTAmount +=
            (Number(prod.productRate) *
              Number(prod.quantity) *
              Number(prod.IGST)) /
            100;
          SGSTAmount +=
            (Number(prod.productRate) *
              Number(prod.quantity) *
              Number(prod.SGST)) /
            100;
        });
        totalTaxRate +=
          Number(CGSTAmount) + Number(IGSTAmount) + Number(SGSTAmount);
        newTotal +=
          Number(sale.insurance) +
          Number(sale.packagingAndForwarding) +
          Number(tot);
        // * CGST,ICGST
        invoiceAmount = Number(newTotal) + totalTaxRate;
      });
      const invoiceData = {
        _id: generateId(),
        Date: getCurrentDateFormatted(),
        invoiceId: rand,
        invoiceNo: rand,
        SalesDetails: [...SalesDetails],
        taxableValue: newTotal,
          invoiceAmount: invoiceAmount,
          totalTaxRate: totalTaxRate,
          CGSTAmount: CGSTAmount,
          SGSTAmount: SGSTAmount,
          IGSTAmount: IGSTAmount
      };

      // Assuming that invoiceDB is an instance of PouchDB
      const res = await invoiceDB.put(invoiceData);

      console.log(SalesDetails);

      try {
        const doc = await getClientById(SalesDetails[0].clientID);
        setInvoice([doc]);

        const clientDb = new PouchDb("clients");
        

        // Use async/await instead of promise chaining
        const existingDoc = await clientDb.get(doc._id);
        
        const existingInvoices = existingDoc && existingDoc.invoices ? existingDoc.invoices : [];
      
        const updatedInvoice = [ ...existingInvoices  , invoiceData];
      

        // Use await to wait for the put operation to complete
        await clientDb.put({
          ...doc,
          _id: doc._id,
          
          invoices: updatedInvoice,
        });
      

      } catch (error) {
        console.error(error);
      }

      if (res.ok) {
        toast.success("Invoice Generated Successfully");
        navigate("/home/invoices");
      }

      console.log("end");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center  w-full  gap-10 px-5 py-5 ">
      <div className=" flex flex-row  justify-between w-full -mt-44">
        <p className="font-semibold text-xl text-neutral-800">Sales Order</p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-lg bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Sales Order</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/sales")}
            className="bg-blue-500 rounded-md px-5 py-2 text-md text-slate-200 font-semibold"
          >
            Back
          </button>
          <button
            onClick={() => navigate(`/home/sales/new/${id}`)}
            className="bg-green-500 rounded-md px-5 py-2 text-md text-slate-200 font-semibold"
          >
            Edit
          </button>

          <button
            onClick={handleNewInvoice}
            className="bg-blue-900 rounded-md px-5 py-2 text-md text-slate-200 font-semibold"
          >
            New Invoice
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="bg-red-500 rounded-md px-5 py-2 text-md text-slate-200 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col shadow-sm shadow-neutral-700 w-full p-2 rounded-md">
        <div className="flex flex-row w-full  p-2 rounded-md">
          <table className="w-full border">
            {SalesDetails.map((newSales: any) => (
              <tbody>
                <tr className="text-md text-neutral-600 border px-4 py-2">
                  <td className="flex-1 p-2 font-semibold">
                    Sales Order Number
                  </td>
                  <td className="flex-1 p-2">{newSales.salesId}</td>
                  <td className="flex-1 p-2 font-semibold">Sales Order Date</td>
                  <td className="flex-1 p-2">{newSales.salesOrderDate}</td>
                </tr>
                <tr className="text-md text-neutral-600 border px-4 py-2">
                  <td className="flex-1 p-2 font-semibold">Po No.</td>
                  <td className="flex-1 p-2">{newSales.purchaseOrderNo}</td>
                  <td className="flex-1 p-2 font-semibold">Po Date</td>
                  <td className="flex-1 p-2">{newSales.purchaseOrderDate}</td>
                </tr>
                <tr className="text-md text-neutral-600 border px-4 py-2">
                  <td className="flex-1 p-2 font-semibold">Shipping Company</td>
                  <td className="flex-1 p-2">{newSales.selectedClient}</td>
                  <td className="flex-1 p-2 font-semibold">Remarks</td>
                  <td className="flex-1 p-2">{newSales.remarks}</td>
                </tr>
                <tr className="text-md text-neutral-600 border px-4 py-2">
                  <td className="flex-1 p-2 font-semibold">Shipping Charges</td>
                  <td className="flex-1 p-2">{comma(Number(newSales.shippingCharges))}</td>
                  <td className="flex-1 p-2 font-semibold">Insurance</td>
                  <td className="flex-1 p-2">{comma(Number(newSales.insurance))}</td>
                </tr>
                <tr className="text-md text-neutral-600 border px-4 py-2">
                  <td className="flex-1 p-2 font-semibold">Transporter</td>
                  <td className="flex-1 p-2">{newSales.transporter}</td>
                  <td className="flex-1 p-2 font-semibold">Destination</td>
                  <td className="flex-1 p-2">{newSales.destination}</td>
                </tr>
                <tr className="text-md text-neutral-600 border px-4 py-2">
                  <td className="flex-1 p-2 font-semibold">Due Date</td>
                  <td className="flex-1 p-2">{newSales.dueDate}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className="w-full flex flex-col p-2">
          <h1 className="font-semibold text-neutral-700 py-3">
            Sales Order Items
          </h1>

          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left text-md font-semibold text-neutral-700">
                  Product Code
                </th>
                <th className="py-2 px-4 text-left text-md font-semibold text-neutral-700">
                  Quantity
                </th>
                <th className="py-2 px-4 text-left text-md font-semibold text-neutral-700">
                  Unit
                </th>
                <th className="py-2 px-4 text-left text-md font-semibold text-neutral-700">
                  Rate
                </th>
                <th className="py-2 px-4 text-left text-md font-semibold text-neutral-700">
                  Total Amount
                </th>
                <th className="py-2 px-9 text-left text-md font-semibold text-neutral-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {SalesDetails.map((newSales: any) =>
                newSales.AddedProduct.map((prod: any) => (
                  <tr
                    key={prod.productCode}
                    className="border-b hover:bg-gray-100 items-center justify-center"
                  >
                    <td className="py-2 px-4 text-md text-neutral-700">
                      {prod.productCode}
                    </td>
                    <td className="py-2 px-4 text-md text-neutral-700">
                      {prod.quantity}
                    </td>
                    <td className="py-2 px-4 text-md text-neutral-700">Nos</td>
                    <td className="py-2 px-4 text-md text-neutral-700">
                      {comma(Number(prod.productRate))}
                    </td>
                    <td className="py-2 px-4 text-md text-neutral-700">
                      {comma(Number(prod.productRate * prod.quantity))}
                    </td>
                    <td className="py-2 px-4 text-md text-neutral-700">
                      <button
                        onClick={() => navigate(`/home/products/${prod._id}`)}
                        className="px-2 py-1 bg-blue-500 text-white font-semibold text-md rounded mr-2 hover:bg-blue-600"
                      >
                        View
                      </button>
                      {/* Add more buttons or interactive elements here */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default SalesDetails;
