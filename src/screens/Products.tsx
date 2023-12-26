import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "../components/table";
import { productTable } from "../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/onflow-logo.png";
import AccountMenu from "../components/Menu";
const Products = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/home/product/new");
  };
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logged out');
  };
  return (
    <div className=" w-full h-screen flex flex-col gap-10 py-10">
      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-between py-10 px-10 w-2/3 ">
          <h1 className="font-semibold text-slate-800 text-2xl">Products</h1>
          <AccountMenu logo={logo} onLogout={handleLogout} />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div
          onClick={handleAdd}
          className="px-10 flex flex-row w-2/3 justify-end"
        >
          <button className="bg-neutral-800  gap-2 flex flex-row items-center text-white p-2 font-semibold rounded-lg">
            Add New
          </button>
        </div>
      </div>
      <div className="px-10 py-20 flex flex-col ">
        <div className=" w-full py-2 flex flex-col gap-5">
          <ProductTable products={productTable} />
        </div>
      </div>
    </div>
  );
};

export default Products;
