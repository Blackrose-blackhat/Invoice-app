/* eslint-disable prefer-const */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MonthlyTable } from "../components/table";
import { MothlyData } from "../utils/data";
import logo from "../assets/onflow-logo.png";
import AccountMenu from "../components/Menu";


 const Monthly = () => {

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logged out');
  };

  return (
    <div className=" w-full h-screen flex flex-col gap-10 items-center ">
      <div className="flex flex-row justify-between py-10  w-2/3 ">
        <h1 className="font-semibold text-slate-800 text-2xl">Monthly</h1>
        <AccountMenu logo={logo} onLogout={handleLogout} />

      </div>
      
      <div className=" py-20 flex flex-col w-2/3 ">
        <div className=" w-full py-2 flex flex-col gap-5">
          <MonthlyTable  /> 
        </div>
      </div>
    </div>
  );
};

export default Monthly;