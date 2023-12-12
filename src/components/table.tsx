import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../components/init";
import PouchDb from "pouchdb-browser";
import { getClientById } from "../utils/Actions";

export const SalesOrderTable = (props: { salesOrders: any }) => {
  const navigate = useNavigate();
  const { salesOrders } = props;
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Sales Order Date</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Shipping Address</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Destination</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Actions</p>
          </td>
        </thead>
        <tbody>
          {salesOrders.map(
            (saleOrder: {
              id: React.Key | null | undefined;
              salesOrderDate:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              shippingAddress:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              destination:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <tr key={saleOrder.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{saleOrder.salesOrderDate}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{saleOrder.shippingAddress}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{saleOrder.destination}</p>
                </td>
                <td className="p-1">
                  <button
                    onClick={() => navigate("/home/sales/:id")}
                    className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export const InvoiceTable = (props: { invoices: any }) => {
  const { invoices } = props;
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Invoice No.</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Invoice Data</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Shipping Address</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Destination</p>
          </td>
        </thead>
        <tbody>
          {invoices.map(
            (saleOrder: {
              invoice_id: number;
              InvoiceNumber: number;

              InvoideDate: number;

              ShippingAddress: string;
            }) => (
              <tr>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{saleOrder.InvoiceNumber}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{saleOrder.InvoideDate}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{saleOrder.ShippingAddress}</p>
                </td>
                <td className="p-1 flex flex-row items-center gap-2 ">
                  <Link to={`/home/invoices/${saleOrder.invoice_id}`}>
                    <button className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm">
                      View
                    </button>
                  </Link>
                  <button className="bg-orange-400 p-1 text-sm text-white font-semibold">
                    Print
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
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
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Product Code</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Product description</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">HSN Code</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Tax Rate</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Actions</p>
          </td>
        </thead>
        <tbody>
          {products
            .sort((a, b) => {
              const timeA = new Date(a.createdAt).getTime();
              const timeB = new Date(b.createdAt).getTime();
              return timeB - timeA;
            })
            .map(
              (products: {
                _id: React.Key;
                productCode: number;
                productDescription: string;

                hsnCode: number;

                taxRate: number;
              }) => (
                <tr key={products._id}>
                  <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                    <p className="w-full">{products.productCode}</p>
                  </td>
                  <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                    <p className="w-full">{products.productDescription}</p>
                  </td>
                  <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                    <p className="w-full">{products.hsnCode}</p>
                  </td>
                  <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                    <p className="w-full">{products.taxRate}</p>
                  </td>
                  <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                    <button
                      onClick={() => navigate(`/home/products/${products._id}`)}
                      className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export const PaymentTable = (props: { payment: any }) => {
  const navigate = useNavigate();
  const { payment } = props;
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Voucher Date</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Voucher No.</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Client Name</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">GSTIN</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">State</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Actions</p>
          </td>
        </thead>
        <tbody>
          {payment.map(
            (payment: {
              id: React.Key | null | undefined;
              VoucherDate:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              VoucherNumber:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              ClientName:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              GSTIN:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              State:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <tr key={payment.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{payment.VoucherDate}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{payment.VoucherNumber}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{payment.ClientName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{payment.GSTIN}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{payment.State}</p>
                </td>
                <td className="   p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                  <div className="flex flex-row items-center gap-2">
                    <button
                      onClick={() => navigate("/home/payment:id")}
                      className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                    >
                      View
                    </button>
                    <button className="uppercase  bg-blue-300 text-sm p-1 text-white font-semibold rounded-sm">
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
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
  const { client } = props;
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          {clientData.map(
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
                      onClick={() => navigate(`/home/clients/${client._id}`)}
                      className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export const TaxTable = (props: { tax: any }) => {
  const { tax } = props;
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Invoice No.</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Invoice Date</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Consignee Name</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Consignee GSTIN</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Taxable Value</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">CGST</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">IGST</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Tax Amount</p>
          </td>
          <td className="text-md px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Invoice Amount</p>
          </td>
        </thead>
        <tbody>
          {tax.map(
            (tax: {
              id: React.Key | null | undefined;
              InvoiceNo:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              InvoiceData:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              CosigneeName:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              ConsigneeGSTIN:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              TaxableValue:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              CGST:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              SGST:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              IGST:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              InvoiceAmount:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <tr key={tax.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.InvoiceNo}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.InvoiceData}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.CosigneeName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.ConsigneeGSTIN}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.TaxableValue}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.CGST}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.SGST}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.IGST}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.InvoiceAmount}</p>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export const MonthlyTable = (props: { monthly: any }) => {
  const { monthly } = props;
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Month/Year</p>
          </td>
          <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Taxable Value Rs.45,176,738.00</p>
          </td>
          <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">CGST Rs.553,563.00</p>
          </td>
          <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">SCGST Rs.553,563.0</p>
          </td>
          <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">ICGST Rs.553,563.0</p>
          </td>
          <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Total Tax</p>
          </td>
          <td className="text-sm px-2 border border-gray-300 font-semibold text-neutral-600">
            <p className="w-full">Total Amount</p>
          </td>
        </thead>
        <tbody>
          {monthly.map(
            (tax: {
              id: React.Key | null | undefined;
              Date:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              TaxableValue:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              CGST:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              SGST:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              IGST:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              TotalTax:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              Total:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <tr key={tax.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.Date}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.TaxableValue}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.CGST}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.SGST}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.IGST}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.TotalTax}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{tax.Total}</p>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export const BillingAddress = () => {
  const [billingData, setBillingData] = useState([]);
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

  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          {billingData.map(
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
          )}
        </tbody>
      </table>
    </div>
  );
};

export const ShippingAddress = () => {
  const [shippingData, setShippingData] = useState([]);
  const navigate = useNavigate();
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

  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          {shippingData.map(
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
              <tr key={bill._id}>
                <td className="p-2 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{idx + 1}</p>
                </td>
                <td className="p-2 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full p-2">{bill.shippingCompanyName}</p>
                </td>
                <td className="p-2 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.billingCompanyName}</p>
                </td>
                <td className="p-2 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.shippingCity}</p>
                </td>
                <td className="   p-2 text-sm text-neutral-500 px-2 border border-gray-300  ">
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
          )}
        </tbody>
      </table>
    </div>
  );
};

export const ClientPrice = () => {
  const navigate = useNavigate();
  const [clientPrice, setClientPrice] = useState([]);

  useEffect(() => {
    const getClientPrice = async () => {
      const clientPriceDb = new PouchDb("clientPrice");
      const clientPrice = clientPriceDb.allDocs({ include_docs: true });
      const clientPriceData = (await clientPrice).rows.map((row) => row.doc);
      setClientPrice(clientPriceData);
     
    };
    getClientPrice();
  }, []);


  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="p-2 bg-white shadow-md shadow-neutral-500 ">
      <div className="flex flex-row justify-between">
        <div className="p-1 flex flex-row gap-2 items-center">
          <select
            className=" cursor-pointer bg-transparent "
            id="menu-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label
            htmlFor="menu-dropdown"
            className="font-semibold text-slate-700"
          >
            records per page
          </label>
        </div>
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
          {clientPrice.map((clientPrice: any) => (
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
                    onClick={() => navigate(`/home/clinetprice/${clientPrice._id}`)}
                    className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
