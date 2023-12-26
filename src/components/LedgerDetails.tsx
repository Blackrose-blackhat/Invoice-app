import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

import {
  comma,
  formatNumber,
  getAllClients,
  getAllInvoices,
  getAllLedgers,
  getAllVouchers,
  getClientById,
  numberWithCommas,
} from "../utils/Actions";

const LedgerDetails = () => {
  const pdfRef = useRef();
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const { id } = useParams();
  const [Ledger, setLedger] = useState<any>([]);
  const [formData, setFormData] = useState({
    id: "",
    openingBalance: "",
    customOpeningBalance: "",
  });

  useEffect(() => {
    const getClient = async () => {
      const res = await getClientById(id);
      console.log(res);
      setLedger([res]);
    };

    getClient();
  }, []);


  useEffect(() => {
    // Calculate totals when Ledger or formData.openingBalance changes
    let runningBalance = Number(formData.openingBalance);
    let debitTotal = 0;
    let creditTotal = 0;

    Ledger.forEach((ledger) => {
      ledger?.invoices?.forEach((invoice) => {
        debitTotal += Number(invoice.invoiceAmount);
      });

      ledger?.voucher?.forEach((voucher) => {
        creditTotal += Number(voucher.Amount);
      });
    });

    setTotalDebit(debitTotal);
    setTotalCredit(creditTotal);
    setTotalBalance(runningBalance + creditTotal - debitTotal);
  }, [Ledger, formData.openingBalance]);

  // State hook for managing form data

  // State hook for managing custom options
  const [customOptions, setCustomOptions] = useState([]);

  // Handle change function to update form data and custom options
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const downloadPDF = () => {
    const input = pdfRef.current;
  

    setTimeout(() => {
      html2canvas(input, {
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
        x: window.scrollX,
        y: window.scrollY,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Account-ledger.pdf");
      });
    }, 200);
    
  };

  console.log(formData.openingBalance);

  return (
    <section className="w-full h-screen flex flex-col p-32">
      <div className="w-full justify-between flex flex-row">
        <h1 className="font-semibold text-2xl text-neutral-900">View Ledger</h1>
        <button
          onClick={downloadPDF}
          className="bg-neutral-800 text-white font-semibold p-2 text-sm rounded-md"
        >
          Download
        </button>
      </div>

      {/* Form */}
      <div className="w-full p-20 flex flex-col gap-10" ref={pdfRef}>
        <div className="w-full">
          <h1 className="text-center text-xl font-semibold text-neutral-800">
            Account Ledger <br />
            <p className="font-normal text-sm p-2">Company Name : <span className="font-semibold text-neutral-800">{Ledger[0]?.company}</span></p>
          </h1>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-semibold">
            {" "}
            <span className="font-extrabold text-neutral-800">Account</span> :
            M/s Onflo Superabrasive Tools
          </h1>
          <div className="flex flex-col items-center gap-10 ">
            <div className="flex flex-row gap-5 items-center align-start justify-center">
              <h1 className="font-semibold text-neutral-800">From:</h1>
              <div className="p-2 ">
                {formData.openingBalance === "" ? (<select
                  required
                  name="openingBalance"
                  value={formData.openingBalance}
                  id="openingBalance"
                  onChange={handleInputChange}
                  className="text-neutral-800 z-10  font-semibold  text-sm border-2 w-full p-2 rounded-md  "
                >
                  <option  value="">
                    Select opening balance
                  </option>
                  <option  value="132200">
                    {comma(132200)}
                  </option>
                  <option value="0">
                    {comma(0)}
                  </option>
                  {customOptions?.map((option) => (
                    <option  key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="other">Add Other</option>
                </select>): (
                  <p className="font-semibold - ">{comma(Number(formData.openingBalance))}</p>
                )}
                
              </div>
            </div>

            {formData.openingBalance === "other" && (
              <input
                placeholder="Enter opening balance"
                type="text"
                value={formData.customOpeningBalance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customOpeningBalance: e.target.value,
                  })
                }
                onBlur={() => {
                  const customBalance = formData.customOpeningBalance.trim();
                  if (customBalance !== "") {
                    setCustomOptions([...customOptions, customBalance]);
                    setFormData({
                      ...formData,
                      openingBalance: customBalance,
                      customOpeningBalance: "",
                    });
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* table */}

        <table className="border-collapse py-10">
          <thead>
            <tr>
              <th className="border border-neutral-200 bg-neutral-100 p-2">
                Date
              </th>
              <th className="border border-neutral-200 bg-neutral-100">Type</th>
              <th className="border border-neutral-200 bg-neutral-100">
                Account
              </th>
              <th className="border border-neutral-200 bg-neutral-100" p->
                Debit
              </th>
              <th className="border border-neutral-200 bg-neutral-100">
                Credit
              </th>
              <th className="border border-neutral-200 bg-neutral-100">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Add rows dynamically based on your data */}
            {formData.openingBalance &&
              formData.openingBalance !== "other" &&
              Ledger?.map((ledger) => {
                let runningBalance = Number(formData.openingBalance);

                return (
                  <>
                    {ledger?.invoices?.map((invoice) => {
                      const balanceAfterInvoice =
                        runningBalance - Number(invoice.invoiceAmount);
                      runningBalance = balanceAfterInvoice;

                      return (
                        <tr key={invoice._id}>
                          <td className="border border-neutral-200 text-center p-2">
                            {invoice ? invoice.Date : ""}
                          </td>
                          <td className="border border-neutral-200 text-center">
                            {invoice ? "Sales" : "ICICI"}
                          </td>
                          <td className="border border-neutral-200 text-center">
                            {invoice ? "Sales" : "ICICI"}
                          </td>
                          <td className="border border-neutral-200 text-center">
                            {comma(invoice.invoiceAmount)}
                          </td>
                          <td className="border border-neutral-200 text-center">
                            -
                          </td>
                          <td className="border border-neutral-200 text-center">
                            {comma(balanceAfterInvoice)}
                          </td>
                        </tr>
                      );
                    })}

                    {ledger?.voucher?.map((voucher) => {
                      const balanceAfterVoucher =
                        runningBalance + Number(voucher.Amount);
                      runningBalance = balanceAfterVoucher;

                      return (
                        <tr key={voucher._id}>
                          <td className="border border-neutral-200 text-center p-2">
                            {voucher ? voucher.voucherDate : ""}
                          </td>
                          <td className="border border-neutral-200 text-center">
                            {voucher ? "Reciept" : ""}
                          </td>
                          <td className="border border-neutral-200 text-center">
                            {voucher ? "Bank" : ""}
                          </td>
                          <td className="border border-neutral-200 text-center"></td>
                          <td className="border border-neutral-200 text-center">
                            {comma(Number(voucher.Amount))}
                          </td>
                          <td className="border border-neutral-200 text-center">
                            {comma(runningBalance)}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}

            {formData.openingBalance && formData.openingBalance !== "other" && (
              <tr>
                <td
                  colSpan="3"
                  className="border border-neutral-200 font-semibold text-neutral-800 text-right p-2"
                >
                  Totals
                </td>
                <td className="border border-neutral-200 text-center font-semibold text-neutral-800">
                  {comma(totalDebit)}
                </td>
                <td colSpan="2" className="border border-neutral-200 text-right font-semibold text-neutral-800">
                  {comma(totalCredit)}
                </td>
                
              </tr>
            )}
          </tbody>
        </table>
        {formData.openingBalance && formData.openingBalance !== "other" && (
          <div className="flex flex-row justify-end w-full gap-5 py-20 px-40">
            <h1 className="font-semibold text-xl text-neutral-800">
              Closing Balance:
            </h1>
            <h3 className="font-semibold text-xl text-neutral-800">
              {comma(totalBalance)}
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default LedgerDetails;
