import React, { useEffect, useState } from "react";
import { Router, useNavigate, useParams } from "react-router-dom";
import {  comma, deleteProductById, getProductById } from "../../src/utils/Actions";
import toast from "react-hot-toast";
const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const [productDetails,setProductDetails] = useState([]);
  const {id} = useParams();


  useEffect(()=>{
    
    getProductDetails();
},[])
const getProductDetails=()=>{
  const res =getProductById(id);
  res.then((results)=> {
    setProductDetails([results]);
 
  }) 
}
const handleDelete = async(id:string)=> {
  const res = await deleteProductById(id);
   getProductDetails();
  console.log(res);
  navigate("/home/products");
  
  toast.success("Product Deleted");

}

  return (
    <div className="flex flex-col justify-center  w-full  gap-10 px-5 py-5 ">
      <div className=" flex flex-row  justify-between w-full -mt-44">
        <p className="font-semibold text-xl text-neutral-800">
          View Products
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Sales Order</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/products")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button onClick={()=> navigate(`/home/product/new/${id}`)} className="bg-green-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Edit
          </button>
          
          <button onClick={()=> handleDelete(id)} className="bg-red-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col shadow-sm shadow-neutral-700 w-full p-2 rounded-md">
        <div className="flex flex-row w-full  p-2 rounded-md">
          <table className="w-full border">
            {productDetails.map((product:any , idx)=>(
                <tbody key={product._id}>
                <tr className="text-sm text-neutral-600  border px-4 py-2 h-10">
                  <td className="flex-1 font-semibold">Product Id</td>
                  <td className="flex-1 ">{idx+1}</td>
                  <td className="flex-1 font-semibold">Product Number</td>
                  <td className="flex-1">{product.productNumber}</td>
                </tr>
                <tr className="text-sm text-neutral-600  border px-4 py-2 h-10">
                  <td className="flex-1 font-semibold ">Product Code</td>
                  <td className="flex-1">{product.productCode}</td>
                  <td className="flex-1 font-semibold">Unit</td>
                  <td className="flex-1">{product.unit}</td>
                </tr>
                <tr className="text-sm text-neutral-600  border px-4 py-2 h-10">
                  <td className="flex-1 font-semibold">Tax Rate</td>
                  <td className="flex-1">{product.taxRate}</td>
                  <td className="flex-1 font-semibold">Product Rate</td>
                  <td className="flex-1">{comma(Number(product.productRate))}</td>
                </tr>
                <tr className="text-sm text-neutral-600  border px-4 py-2 h-10">
                  <td className="flex-1 font-semibold">Product Description</td>
                  <td className="flex-1">{product.productDescription}</td>
                  <td className="flex-1 font-semibold">HSN Code</td>
                  <td className="flex-1">{product.hsnCode}</td>
                </tr>
                
              </tbody>
            ))}
            
          </table>
        </div>

        
         

      </div>
    </div>
  );
};
export default ProductDetails;
