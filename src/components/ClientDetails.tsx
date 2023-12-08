import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteClientById, getClientById } from "../utils/Actions";
import { useParams } from "react-router-dom";
import "../components/init";
import toast from "react-hot-toast";
const ClientDetails = () => {
  const [clientDetails,setClientDetails] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

 
 
  useEffect(()=>{
    const getClientDetails=()=>{
      const result =  getClientById(id);
      result.then((res) => {
        setClientDetails([res]);
        
      });
      
    }
   getClientDetails();
  },);


  const handleDelete = (id:string) => {
    const res =   deleteClientById(id);
    console.log(res);
    navigate("/home/clients");
    toast.success("Client Deleted");
    
  }
  return (
    <div className="flex flex-col  w-full  gap-10 px-5 py-20 ">
      <div className=" flex flex-row  justify-between w-full ">
        <p className="font-semibold text-xl text-neutral-800">
          Client Details
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Client Details</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/clients")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button onClick={()=>navigate(`/home/clients/new/${id}`)} className="bg-green-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Edit
          </button>
          
          <button onClick={()=>handleDelete(id)}   className="bg-red-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col shadow-sm shadow-neutral-700 w-full p-2 rounded-md">
        <div className="flex flex-row w-full  p-2 rounded-md">
          <table className="w-full border">
            {clientDetails.map((client) => (
              <tbody>
              
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Client ID</td>
                <td className="flex-1 ">{}</td>
                <td className="flex-1 font-semibold">Client Name</td>
                <td className="flex-1 uppercase">{client.clientName}</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold ">Address</td>
                <td className="flex-1">{client.address}</td>
                <td className="flex-1 font-semibold">City</td>
                <td className="flex-1">{client.city}</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">State</td>
                <td className="flex-1">{client.state} </td>
                <td className="flex-1 font-semibold">Country</td>
                <td className="flex-1">India</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Zip Code</td>
                <td className="flex-1">{client.zipCode}</td>
                <td className="flex-1 font-semibold">Phone</td>
                <td className="flex-1">{client.phoneNumber}</td>
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Currenvy</td>
                <td className="flex-1">INR</td>
                <td className="flex-1 font-semibold">Email</td>
                <td className="flex-1">{client.mailAddress}</td>
              </tr>
              
            </tbody>
            ))}
            
          </table>
        </div>

        

      </div>
    </div>
  );
};
export default ClientDetails;
