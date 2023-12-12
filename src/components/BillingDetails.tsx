import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBillingById, generateRandom3DigitNumber, getBillingById } from "../utils/Actions";
import toast from "react-hot-toast";

const BillingDetails: React.FC = () => {
    const [billingDetails,setBillingClients] = useState([]);
  const navigate = useNavigate();
    const {id} = useParams();
    const getBillingDetails = ()=> {
        const res = getBillingById(id);
        
        res.then((result)=>{
            setBillingClients([result]);
            console.log(result);
           
        })
    }
    useEffect(()=>{
        getBillingDetails();
    },[])

    const handleDelete = async(id:string)=> {
        const res = await deleteBillingById(id);
        navigate("/home/clients");
        toast.success("Billing Address Deleted");

    }

   const rand = generateRandom3DigitNumber();

  return (
    <div className="flex flex-col justify-center  w-full  gap-10 px-5 py-5 ">
      <div className=" flex flex-row  justify-between w-full -mt-44">
        <p className="font-semibold text-xl text-neutral-800">
          Billing Address
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Billing Address</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/clients")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button onClick={()=> navigate(`/home/clients/billing/new/${id}`)} className="bg-green-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
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
            {billingDetails.map((client,idx) => (
                <tbody key={client._id}>
              <tr className="text-md text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold p-2">Billing Address id</td>
                <td className="flex-1 p-2 ">{client.billingID}</td>
            
              </tr>
              
              <tr className="text-md text-neutral-600  border px-4 py-2">
                <td className="flex-1 p-2 font-semibold ">Billing Company Name</td>
                <td className="flex-1 p-2 upperacse">{client.billingCompany}</td>
                <td className="flex-1 p-2 font-semibold">Address 1</td>
                <td className="flex-1 p-2">{client.address}</td>
              </tr>
              <tr className="text-md text-neutral-600  border px-4 py-2">
                <td className="flex-1 p-2 font-semibold">Address 2</td>
                <td className="flex-1 p-2">{client.address2} </td>
                <td className="flex-1 font-semibold p-2">Area</td>
                <td className="flex-1 p-2">{client.area}</td>
              </tr>
              <tr className="text-md text-neutral-600  border px-4 py-2">
                <td className="flex-1 p-2 font-semibold">City</td>
                <td className="flex-1 p-2">{client.city}</td>
                <td className="flex-1 p-2 font-semibold">State</td>
                <td className="flex-1 p-2">{client.state}</td>
              </tr>
              <tr className="text-md text-neutral-600  border px-4 py-2">
                <td className="flex-1 p-2 font-semibold">Country</td>
                <td className="flex-1 p-2">{client.country}</td>
                <td className="flex-1 p-2 font-semibold">Zip Code</td>
                <td className="flex-1 p-2">{client.zipCode}</td>
              </tr>
              <tr className="text-md text-neutral-600  border px-4 py-2">
                <td className="flex-1 p-2 font-semibold">Phone</td>
                <td className="flex-1 p-2">{client.phoneNumber}</td>
                <td className="flex-1 p-2 font-semibold">Contact Person</td>
                <td className="flex-1 p-2">{client.contactPerson}</td>
              </tr>
              
            </tbody>
            ))}
            
          </table>
        </div>

        

      </div>
    </div>
  );
};
export default BillingDetails;
