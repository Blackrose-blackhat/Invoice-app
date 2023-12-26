/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../components/init";
import PouchDb from "pouchdb-browser";
import {
  comma,
  getAllClients,
  getClientById,
  invoiceDB,
  productDb,
  searchAndHighlight,
  usePouchDbSearch,
} from "../utils/Actions";

import FindPlugin from "pouchdb-find";

PouchDb.plugin(FindPlugin);

export const SalesOrderTable = () => {
  const db = new PouchDb("newSales");
  const navigate = useNavigate();
  const [salesOrder, setsalesOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const performSearch = async (term: string) => {
    try {
      // Convert search term to lowercase

      // Create an index if not already created

      // Search for the value (case-insensitive)
      const result = await db.find({
        selector: {
          $or: [
            { selectedClient: { $regex: term } },
            { salesOrderDate: { $regex: term } },
            { destination: { $regex: term } },
          ],
        },
      });

      console.log("Search Results:", result.docs);
      setSearchResults(result.docs);
    } catch (error) {
      console.error("Error searching in PouchDB:", error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceTimeout);
  });
  useEffect(() => {
    // Trigger search when the debounced search term changes
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const getSalesOrder = async () => {
      const salesDb = new PouchDb("newSales");
      const sales = salesDb.allDocs({ include_docs: true });
      const salesData = (await sales).rows.map((row) => row.doc);
      setsalesOrder(salesData);
      console.log(salesData);
    };

    getSalesOrder();
  }, []);

  return (
    <div className="w-full flex flex-row  justify-center">
    <div className="p-2 w-2/3  bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center"></div>
        <div className="p-2 flex flex-row-reverse gap-2 items-center">
          <input
            type="text"
            className="p-1 border border-gray-300 rounded-md"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <p onClick={performSearch} className="font-semibold text-slate-700">
            Search:
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className=" border text-md font-semibold text-neutral-600">
                Sales Order Date
              </th>
              <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                Shipping Address
              </th>
              <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                Destination
              </th>
              <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResults?.map((res) => (
              <tr key={res._id} className="hover:bg-gray-50 transition">
                <td className="  px-4 border text-sm text-neutral-500">
                  {res.dueDate}
                </td>
                <td className="py-1 px-4 border text-sm text-neutral-500">
                  {res.selectedClient}
                </td>
                <td className="py-1 px-4 border text-sm text-neutral-500">
                  {res.destination}
                </td>
                <td className="py-1">
                  <button
                    onClick={() => navigate(`/home/sales/${res._id}`)}
                    className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {searchResults.length === 0 &&
              salesOrder.map((saleOrder) => (
                <tr key={saleOrder._id} className="hover:bg-gray-50 transition">
                  <td className=" text-center  border text-sm text-neutral-800">
                    {saleOrder.salesOrderDate}
                  </td>
                  <td className=" text-center py-1 px-4 border text-sm text-neutral-800">
                    {saleOrder.selectedClient}
                  </td>
                  <td className=" text-center py-1 px-4 border text-sm text-neutral-8000">
                    {saleOrder.destination}
                  </td>
                  <td className="py-1 text-xs flex flex-row justify-center px-2">
                    <button
                      onClick={() => navigate(`/home/sales/${saleOrder._id}`)}
                      className="bg-blue-400 p-1 text-white font-semibold rounded-md text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const performSearch = async (term: string) => {
    try {
      // Convert search term to lowercase

      // Create an index if not already created

      // Search for the value (case-insensitive)
      const result = await invoiceDB.find({
        selector: {
          $or: [
            { invoiceNo: { $eq: Number(term) } },
            { Date: { $regex: term } },
            { destination: { $regex: term } },
          ],
        },
      });

      console.log("Search Results:", result.docs);
      setSearchResults(result.docs);
    } catch (error) {
      console.error("Error searching in PouchDB:", error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400); // Adjust the debounce time as needed

    return () => clearTimeout(debounceTimeout);
  });
  useEffect(() => {
    // Trigger search when the debounced search term changes
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const getInvoices = async () => {
      const invoice = invoiceDB.allDocs({ include_docs: true });
      const invoiceData = (await invoice).rows.map((row) => row.doc);
      setInvoices([invoiceData]);
      console.log(invoiceData);
    };
    getInvoices();
  }, []);

  return (
    <div className="w-full justify-center flex flex-row">
      <div className="p-2 bg-white shadow-md shadow-neutral-500 w-2/3 ">
        <div className="flex flex-row justify-end">
          <div className="p-2 flex flex-row-reverse gap-2 items-center">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="font-semibold text-slate-700">Search:</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Invoice No.
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Invoice Date
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Shipping Address
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Destination
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults?.map((res) =>
                res?.SalesDetails.map((item: any) => (
                  <tr key={res._id} className="hover:bg-gray-50 transition">
                    <td className="text-center py-1 px-4 border text-sm text-neutral-800">
                      {res.invoiceId}
                    </td>
                    <td className="text-center py-1 px-4 border text-sm text-neutral-800">
                      {res.Date}
                    </td>
                    <td className="text-center py-1 px-4 border text-sm text-neutral-800">
                      {/* Uncomment and replace with the actual shipping company name */}
                      {/* {item.selectedShipping.shippingCompanyName } */}
                    </td>
                    <td className="text-center py-1 px-4 border text-sm text-neutral-800">
                      {item.destination}
                    </td>
                    <td className="justify-center text-center py-1 flex flex-row items-center gap-2 border">
                      <Link to={`/home/invoices/${res._id}`}>
                        <button className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm">
                          View
                        </button>
                      </Link>
                      <Link to={`/home/invoices/print/${res._id}`}>
                        <button className="bg-orange-400 p-1 text-sm text-white font-semibold">
                          Print
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
              {searchResults.length === 0 &&
                invoices?.map((idx) =>
                  idx?.map((item: any) =>
                    item?.SalesDetails?.map((sales: any) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition text-center"
                      >
                        <td className="py-1 px-4 border text-sm text-neutral-800">
                          {item.invoiceId}
                        </td>
                        <td className="uppercase py-1 px-4 border text-sm text-neutral-800">
                          {item.Date}
                        </td>
                        <td className="uppercase py-1 px-4 border text-sm text-neutral-800">
                          {sales.selectedShipping.billingAddress1}
                        </td>

                        <td className="py-1 px-4 border text-sm text-neutral-800">
                          {sales.destination}
                        </td>
                        <td className="py-1 flex flex-row items-center w-full justify-center gap-2 border">
                          <Link to={`/home/invoices/${item._id}`}>
                            <button className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-md">
                              View
                            </button>
                          </Link>
                          <Link to={`/home/invoices/print/${item._id}`}>
                            <button className="bg-orange-400 p-1 text-sm text-white font-semibold rounded-md">
                              Print
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export const ProductTable = (props: { products: any }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const productDb = new PouchDb("products");
      const products = productDb.allDocs({ include_docs: true });
      const productData = (await products).rows.map((row) => row.doc);
      setProducts(productData);
      console.log(productData);
    };
    getProducts();
  }, []);
  const navigate = useNavigate();
  // const { products } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const performSearch = async (term: string) => {
    try {
      // Convert search term to lowercase

      // Create an index if not already created

      // Search for the value (case-insensitive)
      const result = await productDb.find({
        selector: {
          $or: [
            { productCode: { $regex: term } },
            { productDescription: { $regex: term } },
            { hsnCode: { $regex: term } },
          ],
        },
      });

      console.log("Search Results:", result.docs);
      setSearchResults(result.docs);
    } catch (error) {
      console.error("Error searching in PouchDB:", error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceTimeout);
  });
  useEffect(() => {
    // Trigger search when the debounced search term changes
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex flex-row justify-center">
      <div className="p-2 bg-white shadow-md shadow-neutral-500 w-2/3 ">
        <div className="flex flex-row justify-end">
          <div className="p-2 flex flex-row-reverse gap-2 items-center">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="font-semibold text-slate-700">Search:</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Product Code
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Product Description
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  HSN Code
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Tax Rate
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults?.map((res) => (
                <tr key={res._id} className="hover:bg-gray-50 transition">
                  <td className="py-1 px-4 border text-sm text-neutral-500">
                    {res.productCode}
                  </td>
                  <td className="py-1 px-4 border text-sm text-neutral-500">
                    {res.productDescription}
                  </td>
                  <td className="py-1 px-4 border text-sm text-neutral-500">
                    {res.hsnCode}
                  </td>
                  <td className="py-1 px-4 border text-sm text-neutral-500">
                    {res.CGST || res.SGST || res.IGST}
                  </td>
                  <td className="py-1">
                    <button
                      onClick={() => navigate(`/home/sales/${res._id}`)}
                      className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              )).reverse()}

              {searchResults.length === 0 &&
                products
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-1 text-center px-4 border text-sm text-neutral-500">
                        {product.productCode}
                      </td>
                      <td className="py-1 text-center uppercase px-4 border text-sm text-neutral-500">
                        {product.productDescription}
                      </td>
                      <td className="py-1 text-center px-4 border text-sm text-neutral-500">
                        {product.hsnCode}
                      </td>
                      <td className="py-1 text-center px-4 border text-sm text-neutral-500">
                        {product.CGST || product.SGST || product.IGST}
                      </td>
                      <td className="py-1 text-center px-4 border text-sm text-neutral-500">
                        <button
                          onClick={() =>
                            navigate(`/home/products/${product._id}`)
                          }
                          className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )).reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const PaymentTable = (props: { payment: any }) => {
  const [payment, setPayment] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getPayment = async () => {
      const paymentDb = new PouchDb("vouchers");
      const payments = paymentDb.allDocs({ include_docs: true });
      const paymentData = (await payments).rows.map((row) => row.doc);
      setPayment(paymentData);
      console.log(paymentData);
    };

    getPayment();
  }, []);

  const navigate = useNavigate();
  const db = new PouchDb("vouchers");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const performSearch = async (term: string) => {
    try {
      // Convert search term to lowercase

      // Create an index if not already created

      // Search for the value (case-insensitive)
      const result = await db.find({
        selector: {
          $or: [
            { voucherNumber: { $regex: term } },
            { clientName: { $regex: term } },
            { GSTINNumber: { $regex: term } },
            { state: { $regex: term } },
            {Amount: { $regex: term }},
          ],
        },
      });

      console.log("Search Results:", result.docs);
      setSearchResults(result.docs);
    } catch (error) {
      console.error("Error searching in PouchDB:", error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceTimeout);
  });
  useEffect(() => {
    // Trigger search when the debounced search term changes
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full  flex flex-row justify-center bg-transparent">
      <div className="p-2 w-2/3 bg-white shadow-md shadow-neutral-500 ">
        <div className="flex flex-row justify-end">
          <div className="p-2 flex flex-row-reverse gap-2 items-center">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="font-semibold text-slate-700">Search:</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Voucher Date
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Voucher No.
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Client Name
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  GSTIN
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Amount
                </th>
                <th className="py-2 px-4 border text-md font-semibold text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults?.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition">
                <td className="py-1 text-center px-4 border text-sm text-neutral-500">
                  {payment.voucherDate}
                </td>
                <td className="py-1 text-center uppercase px-4 border text-sm text-neutral-500">
                  {payment.voucherNumber}
                </td>
                <td className="py-1 px-4 border text-center text-sm text-neutral-500">
                  {payment.clientName}
                </td>
                <td className="py-1 px-4 border text-center text-sm text-neutral-500">
                  {payment.GSTINNumber}
                </td>
                <td className="py-1 px-4 border text-center text-sm text-neutral-500">
                  {comma(Number(payment.Amount))}
                </td>
                <td className="py-1 px-4 border text-center text-sm text-neutral-500 flex flex-row justify-center">
                  <button
                    onClick={() => navigate(`/home/payment/${payment._id}`)}
                    className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm "
                  >
                    View
                  </button>
                </td>
              </tr>
              )).reverse()}

              {searchResults.length === 0 &&
                payment.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition">
                    <td className="py-1 text-center px-4 border text-sm text-neutral-500">
                      {payment.voucherDate}
                    </td>
                    <td className="py-1 text-center uppercase px-4 border text-sm text-neutral-500">
                      {payment.voucherNumber}
                    </td>
                    <td className="py-1 px-4 border text-center text-sm text-neutral-500">
                      {payment.clientName}
                    </td>
                    <td className="py-1 px-4 border text-center text-sm text-neutral-500">
                      {payment.GSTINNumber}
                    </td>
                    <td className="py-1 px-4 border text-center text-sm text-neutral-500">
                      {comma(Number(payment.Amount))}
                    </td>
                    <td className="py-1 px-4 border text-center text-sm text-neutral-500 flex flex-row justify-center">
                      <button
                        onClick={() => navigate(`/home/payment/${payment._id}`)}
                        className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm "
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )).reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ClientTable = (props: { client: any }) => {
  const [clientData, setClientData] = useState([]);
  useEffect(() => {
    const getClients = async () => {
      const clientDb = new PouchDb("clients");
      const clients = clientDb.allDocs({ include_docs: true });
      const clientData = (await clients).rows.map((row) => row.doc);
      setClientData(clientData);
      console.log(clientData);
    };
    getClients();
  }, []);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const db = new PouchDb("clients");
  const performSearch = async (term: string) => {
    try {
      // Convert search term to lowercase

      // Create an index if not already created

      // Search for the value (case-insensitive)
      const result = await db.find({
        selector: {
          $or: [
            { clientName: { $regex: term } },
            { city: { $regex: term } },
            { state: { $regex: term } },
          ],
        },
      });

      console.log("Search Results:", result.docs);
      setSearchResults(result.docs);
    } catch (error) {
      console.error("Error searching in PouchDB:", error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceTimeout);
  });
  useEffect(() => {
    // Trigger search when the debounced search term changes
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex flex-row justify-center">
      <div className="p-2 bg-white shadow-md shadow-neutral-500 w-2/3 ">
        <div className="flex flex-row justify-end">
          <div className="p-2 flex flex-row-reverse gap-2 items-center">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="font-semibold text-slate-700">Search:</p>
          </div>
        </div>
        <table className="p-5 w-full border-collapse border border-gray-300">
          <thead>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">CI ID</p>
            </td>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Client Name</p>
            </td>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">City</p>
            </td>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">State</p>
            </td>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Actions</p>
            </td>
          </thead>
          <tbody>
            {searchResults?.map((res, idx) => (
              <tr>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{idx + 1}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.clientName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.city}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.state}</p>
                </td>
                <td className="p-1">
                  <button
                    onClick={() => navigate(`/home/sales/${res._id}`)}
                    className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            )).reverse()}

            {searchResults.length == 0 &&
              clientData.map(
                (
                  client: {
                    _id: React.Key;
                    CIID: number;

                    clientName: string;

                    city: string;

                    state: string;
                  },
                  idx
                ) => (
                  <tr key={client._id}>
                    <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                      <p className="w-full">{idx + 1}</p>
                    </td>
                    <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                      <p className="w-full">{client.clientName}</p>
                    </td>
                    <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                      <p className="w-full">{client.city}</p>
                    </td>
                    <td className="capitalize p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                      <p className="w-full">{client.state}</p>
                    </td>

                    <td className="   p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                      <div className="flex flex-row items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/home/clients/${client._id}`)
                          }
                          className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              ).reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TaxTable = () => {
  const [tax, setTax] = useState([]);

  useEffect(() => {
    const getTax = async () => {
      const invoiceDB = new PouchDb("invoices");
      const invoices = invoiceDB.allDocs({ include_docs: true });
      const invoiceData = (await invoices).rows.map((row) => row.doc);
      setTax(invoiceData);
      console.log(invoiceData);
    };

    aggregateMonthlyValues();

    getTax();
  }, []);

  const aggregateMonthlyValues = async () => {
    try {
      // Initialize databases
      const invoiceDb = new PouchDb("invoices");
      const monthlyDb = new PouchDb("monthly");

      // Fetch all documents from the invoices database
      const invoices = await invoiceDb.allDocs({ include_docs: true });

      // Create objects to store aggregated monthly values
      const aggregatedMonthlyTaxableValues = {};
      const aggregatedMonthlyCGSTValues = {};
      const aggregatedMonthlyICGSTValues = {};
      const aggregatedMonthlySGSTValues = {};

      // Iterate through each invoice and aggregate values by month
      invoices.rows.forEach((row) => {
        const invoice = row.doc;
        
        const [day, month, year] = invoice.Date.split("-");
        const formattedDate = `${month}-${day}-${year}`;
        const monthKey = new Date(formattedDate).toISOString().slice(0, 7);        

        // Initialize values for each category if not already present
        if (!aggregatedMonthlyTaxableValues[monthKey]) {
          aggregatedMonthlyTaxableValues[monthKey] = 0;
          aggregatedMonthlyCGSTValues[monthKey] = 0;
          aggregatedMonthlyICGSTValues[monthKey] = 0;
          aggregatedMonthlySGSTValues[monthKey] = 0;
        }

        // Update values based on the tax type of the invoice
        aggregatedMonthlyTaxableValues[monthKey] += invoice.taxableValue;
        aggregatedMonthlyCGSTValues[monthKey] += invoice.CGSTAmount;
        aggregatedMonthlyICGSTValues[monthKey] += invoice.IGSTAmount;
        aggregatedMonthlySGSTValues[monthKey] += invoice.SGSTAmount;
      });

      // Save the aggregated values in the monthly database
      for (const monthKey in aggregatedMonthlyTaxableValues) {
        if (aggregatedMonthlyTaxableValues.hasOwnProperty(monthKey)) {
          try {
            // Fetch the existing document from the database
            const existingDocument = await monthlyDb.get(monthKey);

            // Calculate the updated values
            const updatedTotalTaxableValue =
              aggregatedMonthlyTaxableValues[monthKey];
            const updatedTotalAmount =
              existingDocument.totalTaxableValue + existingDocument.TotalTax;

            const updatedCGSTValue = aggregatedMonthlyCGSTValues[monthKey];
            const updatedICGSTValue = aggregatedMonthlyICGSTValues[monthKey];
            const updatedSGSTValue = aggregatedMonthlySGSTValues[monthKey];

            // Update the document with the new values
            await monthlyDb.put({
              _id: monthKey,
              _rev: existingDocument._rev, // Include the revision to avoid conflicts
              ...existingDocument, // Copy existing fields
              totalTaxableValue: updatedTotalTaxableValue,
              totalAmount: updatedTotalAmount,
              CGST: updatedCGSTValue,
              ICGST: updatedICGSTValue,
              SGST: updatedSGSTValue,
            });
          } catch (error) {
            if (error.name === "not_found") {
              // The document doesn't exist, you can create a new one or handle it as needed
              console.log("Document does not exist:", monthKey);
              await monthlyDb.put({
                _id: monthKey,
                totalTaxableValue: aggregatedMonthlyTaxableValues[monthKey],
                // ... other fields ...
              });
            } else {
              // Handle other errors
              console.error("Error updating document:", error);
            }
          }
        }
      }

      console.log("Aggregated monthly values:", {
        aggregatedMonthlyTaxableValues,
        aggregatedMonthlyCGSTValues,
        aggregatedMonthlyICGSTValues,
        aggregatedMonthlySGSTValues,
      });
    } catch (error) {
      console.error("Error aggregating monthly values:", error);
    }
  };

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="p-2 bg-white shadow-md shadow-neutral-500 w-full ">
        <div className="flex flex-row justify-between"></div>
        <div className="overflow-x-auto w-full">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  Invoice No.
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  Invoice Date
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  Consignee Name
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  Consignee GSTIN
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  Taxable Value
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  CGST
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  SGST
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  IGST
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  Tax Amount
                </th>
                <th className="py-2 px-4 border font-semibold text-neutral-600">
                  Invoice Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {tax?.map((item: any, idx: number) =>
                item?.SalesDetails?.map((option: any) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {item.invoiceNo}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500 uppercase">
                      {item.Date}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {option.selectedClient}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {comma(Number(option.selectedShipping.selectedBilling.gstinNumber))}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {comma(Number(item.taxableValue))}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {item.CGSTAmount}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {item.SGSTAmount}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {item.IGSTAmount}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {item.totalTaxRate}
                    </td>
                    <td className="py-1 px-4 border text-sm text-neutral-500">
                      {item.invoiceAmount}
                    </td>
                  </tr>
                ))
              ).reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const MonthlyTable = () => {
  const [monthly, setMonthly] = useState([]);
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const getMonthly = async () => {
      try {
        const monthlyDb = new PouchDb("monthly");
        const monthly = await monthlyDb.allDocs({ include_docs: true });
        const monthlyData = monthly?.rows.map((row) => row.doc);

        // Iterate through monthlyData
        for (const monthlyDocument of monthlyData) {
          // Check if ICGST, CGST, and SGST fields are present
          if (
            "ICGST" in monthlyDocument &&
            "CGST" in monthlyDocument &&
            "SGST" in monthlyDocument
          ) {
            // Calculate the totalTax by adding ICGST, CGST, and SGST values
            const totalTax =
              monthlyDocument.ICGST +
              monthlyDocument.CGST +
              monthlyDocument.SGST;

            // Update the totalTax field in the document
            monthlyDocument.totalTax = totalTax;

            // Update the document in the monthly database
            await monthlyDb.put(monthlyDocument);
          }
        }

        // Sort and set the updated monthlyData
        monthlyData.sort((a, b) => {
          const dateA = new Date(a.Date);
          const dateB = new Date(b.Date);
          return dateA - dateB;
        });

        setMonthly(monthlyData);
        console.log(monthlyData);
      } catch (error) {
        console.error("Error fetching and updating monthly data:", error);
      }
    };

    getMonthly();
  }, []);

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-end">
        <div className="p-2 flex flex-row-reverse gap-2 items-center">
          <input
            type="text"
            className="p-1 border border-gray-300 rounded-md"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <p className="font-semibold text-slate-700">Search:</p>
        </div>
      </div>
      <table className="p-5 w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="text-sm p-2  border border-gray-300 font-semibold text-neutral-600">
            Month/Year
          </th>
          <th className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            Taxable Value
          </th>
          <th className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            CGST
          </th>
          <th className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            SCGST
          </th>
          <th className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            ICGST
          </th>
          <th className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            Total Tax
          </th>
          <th className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            Total Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {monthly?.map((tax) => (
          <tr key={tax._id} className="text-center text-neutral-950">
            <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
              {tax._id}
            </td>
            <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
              {comma(Number(tax.totalTaxableValue))}
            </td>
            <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
              {comma(Number(tax.CGST))}
            </td>
            <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
              {comma(Number(tax.SGST))}
            </td>
            <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
              {comma(Number(tax.ICGST))}
            </td>
            <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
              {tax.totalTax}
            </td>
            <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
              {comma(tax.totalTaxableValue + tax.totalTax)}
            </td>
          </tr>
        )).reverse()}
      </tbody>
    </table>
    </div>
  );
};

export const BillingAddress = () => {
  const [billingData, setBillingData] = useState([]);
  const db = new PouchDb("billing");
  const navigate = useNavigate();
  useEffect(() => {
    const getBilling = async () => {
      const billingDb = new PouchDb("billing");
      const billing = billingDb.allDocs({ include_docs: true });
      const billingData = (await billing).rows.map((row) => row.doc);
      setBillingData(billingData);
      console.log(billingData);
    };

    getBilling();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const performSearch = async (term: string) => {
    try {
      // Convert search term to lowercase

      // Create an index if not already created

      // Search for the value (case-insensitive)
      const result = await db.find({
        selector: {
          $or: [
            { billingCompany: { $regex: term } },
            { clientName: { $regex: term } },
            { city: { $regex: term } },
          ],
        },
      });

      console.log("Search Results:", result.docs);
      setSearchResults(result.docs);
    } catch (error) {
      console.error("Error searching in PouchDB:", error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceTimeout);
  });
  useEffect(() => {
    // Trigger search when the debounced search term changes
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex flex-row justify-center">
      <div className="p-2 bg-white shadow-md shadow-neutral-500 w-2/3 ">
        <div className="flex flex-row justify-end">
          <div className="p-2 flex flex-row-reverse gap-2 items-center">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="font-semibold text-slate-700">Search:</p>
          </div>
        </div>
        <table className="p-5 w-full border-collapse border border-gray-300">
          <thead>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Sl No.</p>
            </td>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Billing Company Name</p>
            </td>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Client Name</p>
            </td>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">City</p>
            </td>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Actions</p>
            </td>
          </thead>
          <tbody>
            {searchResults?.map((res, idx) => (
              <tr>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{idx + 1}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.billingCompany}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.clientName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.city}</p>
                </td>
                <td className="p-1">
                  <button
                    onClick={() => navigate(`/home/clients/billing/${res._id}`)}
                    className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            )).reverse()}

            {searchResults.length == 0 &&
              billingData.map(
                (
                  bill: {
                    _id: React.Key;
                    SlNO: number;
                    billingCompany: string;
                    clientName: string;
                    city: string;
                  },
                  index
                ) => (
                  <tr key={bill._id}>
                    <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                      <p className="w-full">{index + 1}</p>
                    </td>
                    <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                      <p className="w-full">{bill.billingCompany}</p>
                    </td>
                    <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                      <p className="w-full">{bill.clientName}</p>
                    </td>
                    <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                      <p className="w-full">{bill.city}</p>
                    </td>
                    <td className="   p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                      <div className="flex flex-row items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/home/clients/billing/${bill._id}`)
                          }
                          className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              ).reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ShippingAddress = () => {
  const [shippingData, setShippingData] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const db = new PouchDb("shipping");
  const performSearch = async (term: string) => {
    try {
      // Convert search term to lowercase

      // Create an index if not already created

      // Search for the value (case-insensitive)
      const result = await db.find({
        selector: {
          $or: [
            { shippingCompanyName: { $regex: term } },
            { billingCompanyName: { $regex: term } },
            { shippingCity: { $regex: term } },
          ],
        },
      });

      console.log("Search Results:", result.docs);
      setSearchResults(result.docs);
    } catch (error) {
      console.error("Error searching in PouchDB:", error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceTimeout);
  });
  useEffect(() => {
    // Trigger search when the debounced search term changes
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const getShipping = async () => {
      const shippingDb = new PouchDb("shipping");
      const shipping = shippingDb.allDocs({ include_docs: true });
      const shippingData = (await shipping).rows.map((row) => row.doc);
      setShippingData(shippingData);
      console.log(shippingData);
    };
    getShipping();
  }, []);

  return (
    <div className="w-full flex flex-row justify-center">
      <div className="p-2 w-2/3  bg-white shadow-md shadow-neutral-500 ">
        <div className="flex flex-row justify-end">
          <div className="p-2 flex flex-row-reverse gap-2 items-center">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="font-semibold text-slate-700">Search:</p>
          </div>
        </div>
        <table className="p-5 w-full border-collapse border border-gray-300">
          <thead>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Sl No.</p>
            </td>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Shipping Company Name</p>
            </td>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Billing Company Name</p>
            </td>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">City</p>
            </td>
            <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Actions</p>
            </td>
          </thead>
          <tbody>
            {searchResults?.map((res, idx) => (
              <tr>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{idx + 1}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.shippingCompanyName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.billingCompanyName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.shippingCity}</p>
                </td>
                <td className="p-1">
                  <button
                    onClick={() => navigate(`/home/shipping/${res._id}`)}
                    className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            )).reverse()}

            {searchResults.length === 0 &&
              shippingData.map(
                (
                  bill: {
                    _id: React.Key;
                    slno: number;

                    shippingCompanyName: string;

                    billingCompanyName: string;

                    shippingCity: string;
                  },
                  idx: number
                ) => (
                  <tr key={bill._id} className="text-xs">
                    <td className=" text-sm text-neutral-800 px-2 border border-gray-300">
                      <p className="w-full">{idx + 1}</p>
                    </td>
                    <td className="text-neutral-800 uppercase text-smtext-neutral-500 px-2 border border-gray-300">
                      <p className="w-full ">{bill.shippingCompanyName}</p>
                    </td>
                    <td className=" text-sm text-neutral-800 px-2 border border-gray-300">
                      <p className="w-full">{bill.billingCompanyName}</p>
                    </td>
                    <td className=" text-sm text-neutral-800 px-2 border border-gray-300">
                      <p className="w-full">{bill.shippingCity}</p>
                    </td>
                    <td className="   2 text-sm text-neutral-800 px-2 border border-gray-300  ">
                      <div className="flex flex-row items-center gap-2">
                        <button
                          onClick={() => navigate(`/home/shipping/${bill._id}`)}
                          className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              ).reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ClientPrice = () => {
  const navigate = useNavigate();
  const [clientPrice, setClientPrice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const db = new PouchDb("clientPrice");
  const performSearch = async (term: string) => {
    try {
      // Convert search term to lowercase

      // Create an index if not already created

      // Search for the value (case-insensitive)
      const result = await db.find({
        selector: {
          $or: [
            { selectedClient: { $regex: term } },
            { selectedProduct: { $regex: term } },
            { rate: { $regex: term } },
          ],
        },
      });

      console.log("Search Results:", result.docs);
      setSearchResults(result.docs);
    } catch (error) {
      console.error("Error searching in PouchDB:", error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceTimeout);
  });
  useEffect(() => {
    // Trigger search when the debounced search term changes
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const getClientPrice = async () => {
      const clientPriceDb = new PouchDb("clientPrice");
      const clientPrice = clientPriceDb.allDocs({ include_docs: true });
      const clientPriceData = (await clientPrice).rows.map((row) => row.doc);
      setClientPrice(clientPriceData);
      console.log(clientPriceData);
    };
    getClientPrice();
  }, []);

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <div className="p-2 w-2/3 bg-white shadow-md shadow-neutral-500 ">
        <div className="flex flex-row justify-end">
          <div className="p-2 flex flex-row-reverse gap-2 items-center">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="font-semibold text-slate-700">Search:</p>
          </div>
        </div>
        <table className="p-5 w-full border-collapse border border-gray-300">
          <thead>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Client Name</p>
            </td>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Product</p>
            </td>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Price</p>
            </td>
            <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
              <p className="w-full">Actions</p>
            </td>
          </thead>
          <tbody>
            {searchResults?.map((res) => (
              <tr>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.selectedClient}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.selectedProduct}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{res.rate}</p>
                </td>
                <td className="p-1">
                  <button
                    onClick={() => navigate(`/home/clinetprice/${res._id}`)}
                    className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            )).reverse()}

            {searchResults.length == 0 &&
              clientPrice.map((clientPrice: any) => (
                <tr key={clientPrice.id}>
                  <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                    <p className="w-full">{clientPrice.selectedClient}</p>
                  </td>
                  <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                    <p className="w-full">{clientPrice.selectedProduct}</p>
                  </td>
                  <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                    <p className="w-full">{clientPrice.rate}</p>
                  </td>

                  <td className="   p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                    <div className="flex flex-row items-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/home/clinetprice/${clientPrice._id}`)
                        }
                        className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              )).reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
