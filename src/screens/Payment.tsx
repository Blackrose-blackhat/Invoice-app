import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentTable } from "../components/table";
import { PaymentVoucher } from "../utils/data";
import logo from "../assets/onflow-logo.png";
import AccountMenu from "../components/Menu";

const handleLogout = () => {
  // Implement your logout logic here
  console.log('Logged out');
};

 const Payment = () => {
  let navigate = useNavigate();
 


  const handleAdd = () => {
    navigate("/home/payment/new");
  };
  return (
    <div className="w-full flex flex-row justify-center items-center pt-10 py-5 overflow-auto">
    <div className=" w-full h-screen flex flex-col gap-10 items-center">
      <div className="flex  flex-row justify-between py-10 px-10 w-2/3 ">
        <h1 className="font-semibold text-slate-800 text-2xl">Payment Voucher</h1>
        <AccountMenu logo={logo} onLogout={handleLogout} />
      </div>
      <div className="px-10 flex w-2/3 flex-row  justify-end">
        <button onClick={handleAdd} className="bg-neutral-800 gap-2 flex flex-row items-center text-white p-2 font-semibold rounded-md">
          New Voucher
            </button>
      </div>
      <div className=" py-20 flex flex-col w-full ">
        <div className=" w-full py-2 flex flex-col gap-5">
          
          <div className="flex flex-col  w-full py-2  ">
            <PaymentTable payment={PaymentVoucher} />
            
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Payment;