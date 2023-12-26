import React, { useState } from "react";

import { salest_data } from "../utils/data";
import { SalesOrderTable } from "../components/table";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../components/Menu";
import logo from "../assets/onflow-logo.png";
const Sales = () => {
  let navigate = useNavigate();
  const handleRoute = () => {
    navigate("/home/sales/new");
  };
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logged out');
  };
  return (
    <div className="flex flex-row w-full justify-center pt-10  ">
    <div className="w-full flex flex-col px-5 lg:px-10 gap-44 py-10 items-center   align-middle">
      <div className="flex w-2/3 flex-row justify-between items-center">
        <p className="font-semibold text-neutral-800 text-2xl px-5 ">
          Sales Order
        </p>
        <AccountMenu logo={logo} onLogout={handleLogout} />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-10 ">
        <div className="bg-blue-200 w-2/3 p-4 items-center   rounded-md flex flex-row justify-between">
          <p className="text-xl font-semibold text-blue-500">Sales</p>
          <button
            onClick={handleRoute}
            className="bg-orange-400 rounded-md p-2 text-sm font-semibold text-neutral-100"
          >
            Add new Sales Order
          </button>
        </div>
        <div className="w-full">
        <SalesOrderTable salesOrders={salest_data} />
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default Sales;
