import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaxTable } from "../components/table";
import { taxDetails } from "../utils/data";
import logo from "../assets/onflow-logo.png";
import AccountMenu from "../components/Menu";

const Tax = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logged out');
  };
  return (
    <div className=" w-full h-screen flex flex-col gap-10 items-center pt-10">
      <div className="flex flex-row justify-between py-10   w-2/3">
        <h1 className="font-semibold text-slate-800 text-2xl">Tax details</h1>
        <AccountMenu logo={logo} onLogout={handleLogout} />

      </div>

      <div className=" py-20 flex flex-col ">
        <TaxTable tax={taxDetails} />
      </div>
    </div>
  );
};

export default Tax;
