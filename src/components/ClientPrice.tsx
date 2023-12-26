import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { comma, deleteClientPriceById, getClientPriceById } from "../utils/Actions";
import toast from "react-hot-toast";

const ClientPriceDetails: React.FC = () => {
  const navigate = useNavigate();
  //Product -> productdescription 
  //Client-> clientName
  const [clientPriceDetail,setClientPriceDetail] = useState([]);
  const {id} = useParams();


  useEffect(()=> {
    getClientPriceDetails();
  },[])

  const getClientPriceDetails=async() => {
    const res = await getClientPriceById(id);
    
    setClientPriceDetail([res]);
    console.log(clientPriceDetail)
   
    
  }

  const handleDelete = async(id:string)=> {
    const res = await deleteClientPriceById(id);
     
    console.log(res);
    navigate("/home/products");
    
    toast.success("Product Deleted");
  }



  return (
    <div className="flex flex-col justify-center  w-full  gap-10 px-5 py-5 ">
      <div className=" flex flex-row  justify-between w-full -mt-44">
        <p className="font-semibold text-xl text-neutral-800">
          Client Price
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>

      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center  ">
        <p className="font-semibold text-md text-blue-600 ">Client Price</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate("/home/clients")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button onClick={()=> navigate(`/home/clients/price/new/${id}`)} className="bg-green-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
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
            {clientPriceDetail.map((clientPrice:any)=>(
              <tbody key={clientPrice._id}>
              
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold ">Client Name</td>
                <td className="flex-1 upperacse">{clientPrice.selectedClient}</td>
                
              </tr>
              {}
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Product Info</td>
                <td className="flex-1">{} </td>
                {/* //TODO product INFO */}
               
               
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Unit</td>
                <td className="flex-1">Nos</td>
               
              </tr>
              <tr className="text-sm text-neutral-600  border px-4 py-2">
                <td className="flex-1 font-semibold">Rate</td>
                <td className="flex-1">{comma(Number(clientPrice.rate))}</td>
               
              </tr>
            
              
            </tbody>
            ))}
            
          </table>
        </div>

        

      </div>
    </div>
  );
};
export default ClientPriceDetails;
