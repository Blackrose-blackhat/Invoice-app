import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentTable } from "../components/table";
import { PaymentVoucher } from "../utils/data";


 const Payment = () => {
  let navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleAdd = () => {
    navigate("/home/payment/new");
  };
  return (
    <div className=" w-full h-screen flex flex-col gap-10">
      <div className="flex flex-row justify-between py-10 px-10 ">
        <h1 className="font-semibold text-slate-800 text-2xl">Payment Voucher</h1>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>
      <div className="px-10 flex flex-row w-full justify-end">
        <button onClick={handleAdd} className="bg-neutral-800 gap-2 flex flex-row items-center text-white p-2 font-semibold rounded-md">
          New Voucher
            </button>
      </div>
      <div className="px-10 py-20 flex flex-col ">
        <div className=" w-full py-2 flex flex-col gap-5">
          
          <div className="flex flex-col  bg-white shadow-sm shadow-slate-400 w-full py-2  ">
            <PaymentTable payment={PaymentVoucher} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;