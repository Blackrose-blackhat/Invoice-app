/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import logo from "../assets/logo.png";
import { comma, getInvoiceById, invoiceDB } from "../utils/Actions";
import ReactToPrint from "react-to-print";
import { ToWords } from 'to-words';
const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  }
});
// {prod.IGST != null
// ? (Number(prod.productRate) *
// Number(prod.quantity) *
// Number(prod.IGST)) /
// 100
// : ""}

const InvoicePrint = React.forwardRef(() => {
  const toWords = new ToWords();
  const { id } = useParams();
  const [original, setOriginal] = useState(false);
  const [Duplicate, setDuplicate] = useState(false);
  const [truplicate, settruplicate] = useState(false);

  const [invoice, setInvoice] = useState([]);
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();
  const componentRef = React.useRef(null);
  let tot = 0;
  let totalTaxRate = 0;
  let CGSTAmount = 0;
  let IGSTAmount = 0;
  let SGSTAmount = 0;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await getInvoiceById(id);
        console.log(data);

        // Calculate total based on SalesDetails
        let newTotal = 0;
        let invoiceAmount = 0;
        data?.SalesDetails?.forEach((sale: any) => {
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

        // Update tot in the invoiceDb along with other data
        const updatedInvoice = {
          ...data,
          taxableValue: newTotal,
          invoiceAmount: invoiceAmount,
          totalTaxRate: totalTaxRate,
          CGSTAmount: CGSTAmount,
          SGSTAmount: SGSTAmount,
          IGSTAmount: IGSTAmount,
        };

        // Update the state with the new total and invoice data
        setTotal(newTotal);
        setInvoice([updatedInvoice]);
        invoiceDB.put(updatedInvoice);
      } catch (error) {
        console.error("Error fetching or updating invoice:", error);
      }
    };

    fetchInvoice();
  }, [id]);
  return (
    <section className="w-full px-20 py-5 overflow-y-auto ">
      <div className="flex flex-col justify-center items-center align-middle pt-10">
        {/* heading */}
        <div className="p-5 w-full text-2xl font-semibold ">
          <h1>Invoice Print</h1>
        </div>

        {/* buttons */}
        <div className=" text-xs flex flex-row justify-center items-center gap-5">
          <button onClick={()=>navigate("/home/invoices") } className="border border-neutral-700 px-5 py-1 rounded-xl bg-gray-100  text-neutral-900 hover:bg-gray-200 transition duration-300 ease-in-out">
            Go Back
          </button>

          <ReactToPrint
            onBeforeGetContent={() => {
              if (!original) {
                setDuplicate(false);
              settruplicate(false);

                setOriginal(true);
                return new Promise((res) => setTimeout(res, 100));
              }
              return Promise.resolve();
            }}
            trigger={() => (
              <button className="border border-neutral-700 px-5 py-1 rounded-xl bg-gray-100 text-neutral-900 hover:bg-gray-200 transition duration-300 ease-in-out">
                Original
              </button>
            )}
            content={() => componentRef.current}
            onAfterPrint={() => {

              setTimeout(()=> {
                setOriginal(false);
                setDuplicate(false);
                settruplicate(false);
              },200)
              
            }}
          />
          <ReactToPrint
            onBeforeGetContent={() => {
              if (!Duplicate) {
                setOriginal(false);
                settruplicate(false);
                setDuplicate(true);
                return new Promise((res) => setTimeout(res, 100));
              }
              return Promise.resolve();
            }}
            trigger={() => (
              <button className="border border-neutral-700 px-5 py-1 rounded-xl bg-gray-100 text-neutral-900 hover:bg-gray-200 transition duration-300 ease-in-out">
                Duplicate
              </button>
            )}
            content={() => componentRef.current}
            onAfterPrint={() => {
              setOriginal(false);
              setDuplicate(false);
              settruplicate(false);
            }}
          />
          <ReactToPrint
            onBeforeGetContent={() => {
              if (!truplicate) {
                setOriginal(false);
                setDuplicate(false);
                settruplicate(true);
                return new Promise((res) => setTimeout(res, 100));
              }
              return Promise.resolve();
            }}
            trigger={() => (
              <button className="border border-neutral-700 px-5 py-1 rounded-xl bg-gray-100 text-neutral-900 hover:bg-gray-200 transition duration-300 ease-in-out">
                Triplicate
              </button>
            )}
            content={() => componentRef.current}
            onAfterPrint={() => {
              setOriginal(false);
              setDuplicate(false);
              settruplicate(false);
            }}
          />
        </div>

        {/* //main printing table */}
        <div className="py-5 px-5 w-full " ref={componentRef}>
          {/* //to be print */}

          <div className="border border-neutral-950    text-sm">
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-center  ">
                <div className="flex flex-col">
                  <img src={logo} alt="logo" className="w-[100px] h-25   -mt-8 "  />
                  {original && (
                    <p className="text-red-700 -mt-5 px-5 font-extrabold">Original</p>
                  )}
                  {Duplicate && (
                    <p className="text-red-700 px-5 font-extrabold">Duplicate</p>
                  )}
                  {truplicate && (
                    <p className="text-red-700 px-5 font-extrabold">
                      Triplicate
                    </p>
                  )}
                </div>
                <p className="font-semibold text-xl">Tax Invoice</p>
                <p className="text-justify uppercase text-xs p-1">
                  <span className="text-blue-600 font-extrabold  ">
                    ONFLO SUPERABRASIVE TOOLS
                  </span>{" "}
                  <br />
                  108/w3,kariappakoundanpatty, Rasingapuram, <br />
                  Theni-Dist,Tamil Nadu, India,
                  <br />
                  Mobile : +91-9442408403 <br />
                  Email: onflosuperabrasive@gmail.com <br />
                  <span className="font-semibold  ">GSTIN No.:</span>
                  <span className="uppercase font-semibold text-blue-600">
                    33amfpg8901p1zt
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row justify-center border-t border-neutral-800 text-xs">
              {invoice?.map((invoices) =>
                invoices?.SalesDetails?.map((sales: any) => (
                  <div
                    key={invoices._id}
                    className=" w-full flex-1 border-r border-neutral-800 font-semibold"
                  >
                    <p className="underline px-1 font-bold ">Shipping Address</p>
                    <p className="px-1">
                      {sales.selectedShipping.shippingCompanyName}
                    </p>
                    <p className="px-1">
                      {sales.selectedShipping.billingAddress1}
                    </p>
                    <p className="px-1">{sales.selectedShipping.billingArea}</p>
                    <p className="px-1">
                      {sales.selectedShipping.billingState}-
                      {sales.selectedShipping.billingZipCode}
                    </p>
                    <p className="px-1">
                      {"Phone number"}
                      {" : "}
                      {sales.selectedShipping.billingContactPerson}
                    </p>
                    <p className=" p-1 border-t-2 border-neutral-900">
                      Buyer GSTIN :{" "}
                      <span className="uppercase text-blue-800 font-extrabold">
                        27aejpj1488cizj
                      </span>
                    </p>
                  </div>
                ))
              )}
              {invoice?.map((invoices: any) =>
                invoices?.SalesDetails?.map((data: any) =>
                  (
                    <div className="flex-1 w-full  border-r border-neutral-800 font-semibold">
                      <p className="underline  px-1 font-bold" >Billing Address</p>
                      <p className="px-1">{data.selectedShipping.selectedBilling.billingCompany}</p>
                      <p className="px-1">
                        {data.selectedShipping.selectedBilling.address}/{data.selectedShipping.selectedBilling.address2}-{data.selectedShipping.selectedBilling.area}
                      </p>
                      <p className="px-1">
                        {data.selectedShipping.selectedBilling.city}-{data.selectedShipping.selectedBilling.zipCode}
                      </p>
                      <p className="px-1">
                        {data.selectedShipping.selectedBilling.state}-{data.selectedShipping.selectedBilling.country}
                      </p>
                      <p className="px-1">
                        {"Phone No. : "}
                        {data.selectedShipping.selectedBilling.phoneNumber}
                      </p>
                      <p className="px-1 py-1 border-t-2 border-neutral-900">
                        Place of supply :{" "}
                        <span className="upeercase text-blue-800 font-bold">
                          {data.selectedShipping.selectedBilling.state}
                        </span>
                      </p>
                    </div>
                  )
                )
              )}
              <div className="flex-1 w-full font-semibold border-r border-neutral-800">
                <p className="border-b-2 p-1 border-neutral-900">Invoice No</p>
                <p className="border-b-2 p-1 border-neutral-900">
                  Invoice Date
                </p>
                <p className="border-b-2 p-1 border-neutral-900">
                  Purchase Order No/Date
                </p>
                <p className="border-b-2 p-1 border-neutral-900">
                  Payment Terms
                </p>
                <p className="border-b-2 p-1 border-neutral-900">
                  Transporter{" "}
                </p>
              </div>
              {invoice.map((invoices: any) =>
                invoices.SalesDetails.map((data: any) => (
                  <div className="flex-1 w-full font-semibold border-r border-neutral-800">
                    <p className="p-1 border-b-2 border-neutral-900">
                      {invoices.invoiceNo}
                    </p>
                    <p className=" p-1 border-b-2 border-neutral-900">
                      {invoices.Date}
                    </p>
                    <p className=" p-1 border-b-2 border-neutral-900">
                      {data.purchaseOrderNo}
                      {" / "}
                      {data.purchaseOrderDate}
                    </p>
                    <p className=" p-1 border-b-2 border-neutral-900">
                      {"30 day"}
                    </p>

                    <p className=" p-1 border-b-2 border-neutral-900">
                      {data.transporter}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="p-1 w-full text-xs flex flex-col justify-between h-[28rem]">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th rowSpan="2" className="w-20 border border-neutral-950 text-center">
                      Sr No.
                    </th>
                    <th rowSpan="2"  className="w-80 border border-neutral-950 text-center " >
                      Description of Goods
                    </th>
                    <th rowSpan="2" className="w-20 border border-neutral-950 text-center">
                      HSN code
                    </th>
                    <th rowSpan="2" className="w-20 border border-neutral-950 text-center">
                      Unit
                    </th>
                    <th rowSpan="2" className="w-20 border border-neutral-950 text-center">
                      Rate/Item
                    </th>
                    <th rowSpan="2" className="w-32 border border-neutral-950 text-center">
                      Taxable Value
                    </th>
                    <th
                      className="w-32 border border-neutral-950 text-center"
                      colSpan="2"
                    >
                      CGST
                    </th>
                    <th
                      className="w-32 border border-neutral-950 text-center"
                      colSpan="2"
                    >
                      SGST
                    </th>
                    <th
                      className="w-32 border border-neutral-950 text-center"
                      colSpan="2"
                    >
                      IGST
                    </th>
                  </tr>
                  <tr>
                    
                    <th className="w-16 border border-neutral-950 text-center">
                      Rate (%)
                    </th>
                    <th className="w-16 border border-neutral-950 text-center">
                      Amount (%)
                    </th>
                    <th className="w-16 border border-neutral-950 text-center">
                      Rate (%)
                    </th>
                    <th className="w-16 border border-neutral-950 text-center">
                      Amount (%)
                    </th>
                    <th className="w-16 border border-neutral-950 text-center">
                      Rate (%)
                    </th>
                    <th className="w-16 border border-neutral-950 text-center">
                      Amount (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.map((item) =>
                    item.SalesDetails.map((data: any) =>
                      data.AddedProduct.map((prod: any, idx: any) => (
                        <tr key={prod._id}>
                          <td className="w-20 border border-neutral-950 text-center">
                            {idx + 1}
                          </td>
                          <td className="w-80 border border-neutral-950 text-left">
                            {prod.productCode} {","}{prod.productDescription}
                          </td>
                          <td className="w-20 border border-neutral-950 text-center">
                            {prod.hsnCode}
                          </td>
                          <td className="w-20 border border-neutral-950 text-center">
                            Nos
                          </td>
                          <td className="w-20 border border-neutral-950 text-center">
                            {comma(prod.productRate)}
                          </td>
                          <td className="w-32 border border-neutral-950 text-center">
                            {comma(prod.productRate * prod.quantity)}
                          </td>
                          <td className="w-16 border border-neutral-950 text-center">
                          {prod.CGST != null ? `${prod.CGST} %` : ``}
                          </td>
                          <td className="w-16 border border-neutral-950 text-center">
                            {prod.CGST != null
                              ? comma(
                                  (Number(prod.productRate) *
                                    Number(prod.quantity) *
                                    Number(prod.CGST)) /
                                    100 
                                ) 
                              : ""}
                          </td>
                          <td className="w-16 border border-neutral-950 text-center">
                          {prod.SGST != null ? `${prod.SGST} %` : ``}
                          </td>
                          <td className="w-16 border border-neutral-950 text-center">
                            {prod.SGST != null
                              ? comma(
                                  (Number(prod.productRate) *
                                    Number(prod.quantity) *
                                    Number(prod.SGST)) /
                                    100
                                )
                              : ""}
                          </td>
                          <td className="w-16 border border-neutral-950 text-center">
                            {prod.IGST != null ? `${prod.IGST} %` : ``}
                          </td>
                          <td className="w-16 border border-neutral-950 text-center">
                            {prod.IGST != null
                              ? comma(
                                  (Number(prod.productRate) *
                                    Number(prod.quantity) *
                                    Number(prod.IGST)) /
                                    100
                                )
                              : ""}
                          </td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
                {/* Add other rows as needed */}
                <tfoot>
                  <tr>
                    
                    <td colSpan="5" className="w-20 border font-semibold text-right   border-neutral-950 px-2 ">
                      Freight
                    </td>
                    <td className="w-32 border border-neutral-950 text-center"></td>
                    <td className="w-16 border border-neutral-950 text-center"></td>
                    <td className="w-16 border border-neutral-950 text-center"></td>
                    <td className="w-16 border border-neutral-950 text-center"></td>
                    <td className="w-16 border border-neutral-950 text-center"></td>
                    <td className="w-16 border border-neutral-950 text-center"></td>
                    <td className="w-16 border border-neutral-950 text-center"></td>
                  </tr>

                  {invoice.map((items) =>
                    items.SalesDetails.map((data: any) => (
                      <tr>
                        
                        <td colSpan="5" className="w-20 border font-semibold px-2 text-right  border-neutral-950 text-center">
                          Insurance
                        </td>
                        <td className="w-20 border font-semibold   border-neutral-950 text-center">
                          {comma(Number(data.insurance))}
                        </td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                      </tr>
                    ))
                  )}

                  {invoice.map((items) =>
                    items.SalesDetails.map((data: any) => (
                      <tr>
                        
                        <td colSpan="5" className="w-20 border font-semibold text-right px-2  border-neutral-950 ">
                          Package and forwarding
                        </td>
                        <td className="w-20 font-semibold   border-neutral-950 text-center">
                          {comma(Number(data.packagingAndForwarding))}
                        </td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                        <td className="w-16 border border-neutral-950 text-center"></td>
                      </tr>
                    ))
                  )}

                  {invoice.map((items) =>
                    items.SalesDetails.map((data: any) => (
                      <tr>
                       
                        <td colSpan="5" className="w-20 border font-semibold text-right   border-neutral-950 text-center">
                          Total Amount
                        </td>
                        <td className="w-32 border border-neutral-950 text-center">
                          {comma(Number(total))}
                        </td>
                        
                        <td colSpan="5" className="w-16 border-b border-neutral-950 text-right px-2 font-semibold text-neutral-800">
                        Total Tax
                        </td>
                        <td className="w-16 border border-neutral-950 text-center font-semibold text-md">
                          {comma(Number(items.totalTaxRate))}
                        </td>
                      </tr>
                    ))
                  )}
                  {invoice.map((items) => (
                    <tr>
                      
                      <td colSpan="5" className="w-20 border border-neutral-950 font-semibold   text-left px-2">
                        <span>Total Invoice value In Words: &nbsp;&nbsp;</span> {toWords.convert(Number(items.invoiceAmount),{currency: true})}
                      </td>
                      <td className="w-32 border border-neutral-950 text-center font-semibold text-sm" colSpan="2">
                        Total Invoice Amount
                      </td>
                      <td className="w-16 border font-semibold text-md border-neutral-950 text-center" colSpan="5">
                        {comma(Number(items.invoiceAmount))}
                      </td>
                     
                      
                    </tr>
                  ))}
                </tfoot>
              </table>
            </div>

            <div className="w-full border-gray-950 border-t flex flex-row">
              {/* First Table */}
              <div className="w-1/2 flex-1 border-r border-gray-950 p-2 text-xs font-semibold">
                <p>Bank Name: Karur Vysya bank</p>
                <p>A/C No. : 11151150000001628</p>
                <p>Branch : Bodinayakanur</p>
              </div>

              {/* Second Table */}
              <div className="w-1/2 flex-1 text-xs font-semibold p-2">
                <p>
                  For{" "}
                  <span className="uppercase text-blue-800 font-extrabold">
                    ONFLO SUPERABRASIVE TOOLS
                  </span>
                </p>
                <br />
                <br />
                <br />
                <p>Authorised Signature</p>
              </div>
            </div>

            <div className="w-full border-t flex flex-row items-center justify-center border-gray-950">
              <p className="text-xs font-normal text-neutral-500">
                This is a computer-generated invoice
              </p>
            </div>
          </div>
        </div>
        {/* //printable area ends */}
      </div>
    </section>
  );
});
export default InvoicePrint;
