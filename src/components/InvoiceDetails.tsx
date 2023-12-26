import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  comma,
  deleteInvoiceById,
  generateRandom3DigitNumber,
  getInvoiceById,
} from "../utils/Actions";
import toast from "react-hot-toast";

const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [invoice, setInvoice] = useState([]);
  const [salesItem, setSalesItem] = useState([]);
  const [salesId,setSalesId] = useState("");
  const [prod, setProd] = useState([]);
  const rand = generateRandom3DigitNumber();
  useEffect(() => {
    getInvoices();
    getSalesItem();
    getProductItems();
  }, []);

  const getInvoices = () => {
    const res = getInvoiceById(id);
    res.then((data) => {
      setInvoice([data]);
    });
  };
  const getSalesItem = () => {
    invoice.map((item: any) =>
      item.SalesDetails.map((salesItem: any) => {
        setSalesId(salesItem[0]._id)
      })
    );
  };
  const getProductItems = () => {
    salesItem.map((item: any) => {
      item.AddedProduct.map((prod: any) => {
        setProd([prod]);
      });
    });
  };
  const handleDelete = (id: string) => {
    try {
      const res = deleteInvoiceById(id);
      navigate("/home/invoices");
      toast.success("Invoice Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(salesId)
  return (
    <div className="flex flex-col py-20 w-full h-screen gap-10 px-5  ">
      <div className=" flex flex-row  justify-between w-full ">
        <p className="font-semibold text-xl text-neutral-800">
          Invoice Details
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Add new</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/invoices")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <Link to={`/home/sales/new/:${salesId}`}>
          <button className="bg-orange-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Add items
          </button>
          </Link>
          
          <button
            onClick={() => navigate(`/home/invoices/print/${id}`)}
            className="bg-blue-900 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Print
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
            {invoice.map((item: any) =>
              item.SalesDetails.map((salesItem: any) => (
                <tbody key={salesItem._id}>
                  <tr className="bg-gray-200 text-sm text-neutral-800 font-semibold border-b">
                    <td className="w-1/4 py-2 px-4">Invoice Id</td>
                    <td className="w-1/4 py-2 px-4">{item.invoiceId}</td>
                    <td className="w-1/4 py-2 px-4">Shipping Company Name</td>
                    <td className="w-1/4 py-2 px-4">
                      {salesItem.selectedClient}
                    </td>
                  </tr>
                  <tr className="bg-gray-100 text-sm text-neutral-800 font-semibold border-b">
                    <td className="py-2 px-4">Invoice No.</td>
                    <td className="py-2 px-4">{item.invoiceNo}</td>
                    <td className="py-2 px-4">Invoice Date</td>
                    <td className="py-2 px-4">{item.Date}</td>
                  </tr>
                  <tr className="bg-gray-200 text-sm text-neutral-800 font-semibold border-b">
                    <td className="py-2 px-4">Po No..</td>
                    <td className="py-2 px-4">{salesItem.purchaseOrderNo}</td>
                    <td className="py-2 px-4">Po Date</td>
                    <td className="py-2 px-4">{salesItem.salesOrderDate}</td>
                  </tr>
                  <tr className="bg-gray-100 text-sm text-neutral-800 font-semibold border-b">
                    <td className="py-2 px-4">Shipping Charges</td>
                    <td className="py-2 px-4">{salesItem.shippingCharges}</td>
                    <td className="py-2 px-4">Insurance</td>
                    <td className="py-2 px-4">{salesItem.insurance}</td>
                  </tr>
                  <tr className="bg-gray-200 text-sm text-neutral-800 font-semibold border-b">
                    <td className="py-2 px-4">Destination</td>
                    <td className="py-2 px-4">
                      {(salesItem.destination)}
                    </td>
                    <td className="py-2 px-4">Despatch Thru</td>
                    <td className="py-2 px-4">{salesItem.selectedClient}</td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
        </div>

        <div className="w-full flex flex-col p-4 space-y-4">
          {invoice.map((item: any) =>
            item.SalesDetails.map((salesItem: any) =>
              salesItem.AddedProduct.map((prod: any) => (
                <div
                  key={prod._id}
                  className="border rounded-lg overflow-hidden shadow-lg"
                >
                  <table className="table-auto w-full text-left">
                    <thead className="bg-gray-500 text-white">
                      <tr>
                        <th className="px-4 py-2 text-sm">Product Code</th>
                        <th className="px-4 py-2 text-sm">Quantity</th>
                        <th className="px-4 py-2 text-sm">Unit</th>
                        <th className="px-4 py-2 text-sm">Rate</th>
                        <th className="px-4 py-2 text-sm">Total Amount</th>
                       
                        <th className="px-4 py-2 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="px-4 py-2 text-sm">
                          {prod.productCode}
                        </td>
                        <td className="px-4 py-2 text-sm">{prod.quantity}</td>
                        <td className="px-4 py-2 text-sm">Nos</td>
                        <td className="px-4 py-2 text-sm">
                          {comma(Number(prod.productRate))}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {comma(Number(prod.productRate * prod.quantity))}
                        </td>
                        
                        <td className="px-4 py-2 text-sm">
                          <div className="flex justify-start gap-2">
                            <button
                              onClick={() =>
                                navigate(`/home/products/${prod._id}`)
                              }
                              className="p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                            >
                              View
                            </button>
                            <button className="p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default InvoiceList;
