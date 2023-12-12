import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateRandom3DigitNumber, getBillingById } from "../utils/Actions";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import "../components/init";
import PouchDB from "pouchdb-browser";
const NewBilling = () => {
  const db = new PouchDB("billing");
  const {id} = useParams();
  const navigate = useNavigate();
  const rand = generateRandom3DigitNumber();
  const [formData, setFormData] = useState({
    _id:id?id:uuidv4(),
    billingID :rand, 
    clientName: "",
    address: "",
    area: "",
    state: "",
    zipCode: "",
    paymentTerms: "",
    gstinNumber: "",
    specialInstructions: "",
    billingCompany: "",
    address2: "",
    city: "",
    phoneNumber: "",
    contactPerson: "",
    consigneeName: "",
    consigneeAddress: "",
    consigneeCity: "",
    consigneeState: "",
    consigneeCountry: "",
    consigneeCourier: "",
    consigneeKindAttn: "",
    consigneePhone: "",
    consigneeZip: "",
    country:""
  });
  
  useEffect(()=>{
    const getBilling = async()=> {
      if(id){
        const res = getBillingById(id);
        
        res.then((result)=>{
          setFormData((prevFormData)=>({
            ...prevFormData,
            ...result,
          }))
        })
      }
    };
    getBilling();
  },[id])

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(event: any) => {
    event.preventDefault();
    // Perform form submission logic here
    if(id)
    {
      await db.put({
        _id:id,
        ...formData,
      });
      toast.success("Billing updated Successfully");
      navigate("/home/clients");
    }
    
      await db.put(formData);
      navigate("/home/clients");
      toast.success("Billing Added Successfully");
    
   
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full h-screen gap-10 px-5 py-14  ">
      <div className="w-full flex flex-row items-center justify-between ">
        <p className="font-semibold text-xl text-neutral-800">
          Add new Billing Address
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>
      <div
        className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center mt-5 "
        
      >
        <p className="font-semibold text-md text-blue-600 ">Add new</p>
        <div className="flex flex-row items-center gap-5">
          <button
            onClick={() => navigate("/home/clients")}
            className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-800 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold"
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full h-fit overflow-auto mb-5 mt-5   gap-5 bg-white shadow-sm shadow-neutral-700 p-2 text-sm  ">
        <div className="w-full flex flex-row gap-5 ">
          <div className="flex flex-col w-1/2  gap-3 ">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Client Name
              </p>
              <input
                required
                id="clientName"
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Address</p>
              <textarea
              required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Area</p>
              <input
              required
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">State</p>
              <input
              required
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Zip Code</p>
              <input
              required
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Payment Terms
              </p>
              <input
              required
                type="text"
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                GSTIN Number
              </p>
              <input
              required
                type="text"
                name="gstinNumber"
                value={formData.gstinNumber}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Special Instructions
              </p>
              <input
                type="text"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Billing Company Name</p>
              <input
                type="text"
                name="billingCompany"
                value={formData.billingCompany}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Address2</p>
              <textarea
                name="address2"
                value={formData.address2}
                required
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">City</p>
              <input
              required
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Phone Number
              </p>
              <input
              required
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Contact Person
              </p>
              <input
              required
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Country
              </p>
              <input
              required
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
        </div>
        
      </div>
    </form>
  );
};

export default NewBilling;
