import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteShippingById, generateRandom3DigitNumber, getShippingById } from "../utils/Actions";
import toast from "react-hot-toast";
// import { getShippingById } from "../utils/Actions";

const ShippingDetails: React.FC = () => {
  const  navigate = useNavigate();
  const [shippingDetails,setShippingDetails] = useState([]);
  const {id} = useParams();
  console.log(id);
  
  const getShippingDetails=()=> {
    const res = getShippingById(id);
    res.then((result)=>{
      setShippingDetails([result]);
      console.log(result)
    })
  }
  useEffect(()=> {
    getShippingDetails();
  },[id])
  const rand = generateRandom3DigitNumber();

  const handleDelete =  (id:string)=> {
    const res =  deleteShippingById(id);
    console.log(res);
    navigate("/home/clients");
    toast.success("Shipping detail deleted successfully");
  }

  return (
    <div className="flex flex-col justify-center  w-full  gap-10 px-5 py-5 ">
      <div className=" flex flex-row  justify-between w-full -mt-44">
        <p className="font-semibold text-xl text-neutral-800">
          Shipping Address
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Shipping Address</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/clients")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button onClick={()=> navigate(`/home/clients/shipping/new/${id}`)} className="bg-green-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Edit
          </button>
          
          <button onClick={()=>handleDelete(id)} className="bg-red-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col shadow-sm shadow-neutral-700 w-full p-2 rounded-md">
        <div className="flex flex-row w-full  p-2 rounded-md">
          <table className="w-full border">
            {shippingDetails.map((product:any) => (
              <tbody key={product._id}>
              <tr className="text-lg text-neutral-600  border p-7">
                <td className="flex-1 font-semibold p-2">Shipping Address id</td>
                <td className="flex-1 ">{rand}</td>
                <td className="flex-1 font-semibold">Shipping Company</td>
                <td className="flex-1  uppercase">{product.shippingCompanyName}</td>
              </tr>
              <tr className="text-lg text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold p-2">Billing Company Name</td>
                <td className="flex-1 upperacse">{product.billingCompanyName}</td>
                <td className="flex-1 font-semibold">Address 1</td>
                <td className="flex-1">{product.billingArea}</td>
              </tr>
              <tr className="text-lg text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold p-2">Address 2</td>
                <td className="flex-1">{product.shippingAddress2} </td>
                <td className="flex-1 font-semibold">Area</td>
                <td className="flex-1">{product.billingArea}</td>
              </tr>
              <tr className="text-lg text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold p-2">City</td>
                <td className="flex-1">{product.shippingCity}</td>
                <td className="flex-1 font-semibold">State</td>
                <td className="flex-1">{product.billingState}</td>
              </tr>
              <tr className="text-lg text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold p-2">Country</td>
                <td className="flex-1">{product.shippingCountry}</td>
                <td className="flex-1 font-semibold">Zip Code</td>
                <td className="flex-1">{product.billingZipCode}</td>
              </tr>
              <tr className="text-lg text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold p-2">Phone</td>
                <td className="flex-1">{product.shippingPhoneNumber}</td>
                <td className="flex-1 font-semibold">Contact Person</td>
                <td className="flex-1">{product.billingContactPerson}</td>
              </tr>
              
            </tbody>
            ))}
            
          </table>
        </div>

        

      </div>
    </div>
  );
};
export default ShippingDetails;
