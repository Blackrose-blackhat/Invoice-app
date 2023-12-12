
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "../components/table";
import { productTable } from "../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";


 const Products = () => {
  const navigate = useNavigate();
 


  const handleAdd = () => {
    navigate("/home/product/new");
  };
  return (
    <div className=" w-full h-screen flex flex-col gap-10">
      <div className="flex flex-row justify-between py-10 px-10 ">
        <h1 className="font-semibold text-slate-800 text-2xl">Products</h1>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>
      <div onClick={handleAdd} className="px-10 flex flex-row w-full justify-end">
        <button className="bg-neutral-800  gap-2 flex flex-row items-center text-white p-2 font-semibold rounded-md">
            Add New
            </button>
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