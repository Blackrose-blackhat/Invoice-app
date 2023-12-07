import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";
import logo from "../assets/onflow-logo.png";
import { Avatar } from "@mui/material";
export const Leftsidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);

  const handleLogout = () => {
    navigate("/");
    toast.success("Logout Successfully");
  };

  return (
    <div className=" w-full bg-[#60AFF8] sticky left-0 top-1 z-20 flex h-screen flex-col justify-between overflow-auto ">
      <div className="w-full">
        <ul className="gap-10 flex flex-col items-start w-full h-screen justify-start text-left  ">
          <li className="w-full flex flex-row p-5 px-3">
           <Avatar src={logo} sx={{ width: 100, height: 100 }} />          
          </li>
          <li
            className={`cursor-pointer font-semibold text-xl px-4 ${
              pathname === "/home" ? "text-white" : "text-slate-200"
            }`}
          >
            <a onClick={() => navigate("/home")}>Home</a>
          </li>
          <li
            className={`cursor-pointer font-semibold  text-xl px-4 ${
              pathname === "/home/invoices" ? "text-white" : "text-slate-200"
            }`}
          >
            <a onClick={() => navigate("/home/invoices")}>Invoices</a>
          </li>
          <li
            className={`cursor-pointer font-semibold  text-xl px-4 ${
              pathname === "/home/sales" ? "text-white" : "text-slate-200"
            }`}
          >
            <a onClick={() => navigate("/home/sales")}>Sales Order</a>
          </li>
          <li
            className={`cursor-pointer font-semibold  text-xl px-4 ${
              pathname === "/home/products" ? "text-white" : "text-slate-200"
            }`}
          >
            <a onClick={() => navigate("/home/products")}>Products</a>
          </li>
          <li
            className={`cursor-pointer font-semibold  text-xl px-4 ${
              pathname === "/home/payment" ? "text-white" : "text-slate-200"
            }`}
          >
            <a onClick={() => navigate("/home/payment")}>Payment Voucher</a>
          </li>
          <li
            className={`cursor-pointer font-semibold  text-xl px-4 ${
              pathname === "/home/clients" ? "text-white" : "text-slate-200"
            }`}
          >
            <a onClick={() => navigate("/home/clients")}>Clients</a>
          </li>
          <li
            className={`cursor-pointer font-semibold l text-xl px-4 ${
              pathname === "/home/tax" ? "text-white" : "text-slate-200"
            }`}
          >
            <a onClick={() => navigate("/home/tax")}>Tax details</a>
          </li>
          <li
            className={`cursor-pointer font-semibold  text-xl px-4 ${
              pathname === "/home/monthly" ? "text-white" : "text-slate-200"
            }`}
          >
            <a onClick={() => navigate("/home/monthly")}>Monthly</a>
          </li>
          <li onClick={handleLogout} className="text-white text-4xl mt-40 cursor-pointer px-4 flex flex-row w-full items-center gap-2">
            <BiLogOut />
            <p className="text-xl font-semibold">Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
