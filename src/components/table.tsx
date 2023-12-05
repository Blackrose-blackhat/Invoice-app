import React, { useState } from "react";
import { Link, Navigate , useNavigate } from "react-router-dom";


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
                  <button onClick={() => navigate("/home/sales/:id" ) } className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm">
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
              <tr >
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
  const navigate = useNavigate();
  const { products } = props;
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
          {products.map(
            (products: {
              id: React.Key | null | undefined;
              ProductCode:
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
              ProductDescription:
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
              HSNCODE:
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
              TaxRate:
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
              <tr key={products.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{products.ProductCode}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{products.ProductDescription}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{products.HSNCODE}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{products.TaxRate}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                  <button onClick={() => navigate("/home/products/:id") } className="bg-blue-500 text-sm p-1 text-white font-semibold rounded-sm">
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
                    <button onClick={() => navigate("/home/payment:id") } className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm">
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
          {client.map(
            (client: {
              id: React.Key | null | undefined;
              CIID:
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
              City:
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
              <tr key={client.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{client.CIID}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{client.ClientName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{client.City}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{client.State}</p>
                </td>

                <td className="   p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                  <div className="flex flex-row items-center gap-2">
                    <button onClick={() =>navigate("/home/clients:id")} className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm">
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

export const BillingAddress = (props: { billing: any }) => {
  const { billing } = props;
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
          {billing.map(
            (bill: {
              id: React.Key | null | undefined;
              SlNO:
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
              BillingCompanyName:
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
              City:
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
              <tr key={bill.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.SlNO}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.BillingCompanyName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.ClientName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.City}</p>
                </td>
                <td className="   p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                  <div className="flex flex-row items-center gap-2">
                    <button className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm">
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

export const ShippingAddress = (props: { shipping: any }) => {
  const navigate = useNavigate();
  const { shipping } = props;
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
          {shipping.map(
            (bill: {
              id: React.Key | null | undefined;
              slno:
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
              ShippingCompanyName:
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
              BillingCompanyName:
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
              City:
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
              <tr key={bill.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.slno}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.ShippingCompanyName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.BillingCompanyName}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{bill.City}</p>
                </td>
                <td className="   p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                  <div className="flex flex-row items-center gap-2">
                    <button onClick={() => navigate("/home/shipping:id")} className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm">
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

export const ClientPrice = (props: { clientPrice: any }) => { 
  const navigate = useNavigate();
  const { clientPrice } = props;
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
          {clientPrice.map(
            (clientPrice: {
              id: React.Key | null | undefined;
              ClienName:
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
              Product:
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
              Proce:
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
              <tr key={clientPrice.id}>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{clientPrice.ClienName}</p>
                </td>
                <td className="p-1 uppercase text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{clientPrice.Product}</p>
                </td>
                <td className="p-1 text-sm text-neutral-500 px-2 border border-gray-300">
                  <p className="w-full">{clientPrice.Proce}</p>
                </td>

                <td className="   p-1 text-sm text-neutral-500 px-2 border border-gray-300  ">
                  <div className="flex flex-row items-center gap-2">
                    <button onClick={() => navigate("/home/clinetprice:id")}  className="uppercase bg-blue-600 text-sm p-1 text-white font-semibold rounded-sm">
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
