import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../components/init";
import PouchDB from "pouchdb-browser";
import { generateRandom3DigitNumber, getShippingById } from "../utils/Actions";
import toast from "react-hot-toast";
const NewShipping = () => {
  const db = new PouchDB('shipping');
  const { id } = useParams();
  console.log(id);
  const rand = generateRandom3DigitNumber();
  const [formData, setFormData] = useState({
    _id: id ? id : uuidv4(),
    shippingId : rand,
    billingCompanyName: "",
    billingAddress1: "",
    billingArea: "",
    billingState: "",
    billingZipCode: "",
    billingContactPerson: "",
    shippingCompanyName: "",
    shippingAddress2: "",
    shippingCity: "",
    shippingCountry: "",
    shippingPhoneNumber: "",
  });
  useEffect(() => {
    const getShipping = async () => {
      if (id) {
        const res = getShippingById(id);
        console.log(res);
        res.then((result)=> {
          setFormData((prevFormData)=>({
            ...prevFormData,
            ...result
          }))
        })

      }
    };
    getShipping();
  }, [id]);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // You can now use the formData object as needed.
    if (id) {
      await db.put({
        _id: id,
        ...formData,
      });
      toast.success("Shipping Updated Successfully");
      navigate("/home/clients");
    }
    await db.put(formData);
    navigate("/home/clients");
    toast.success("Shipping Added Successfully");
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-40 p-10 w-full">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-xl text-neutral-800">
          Add New Shipping Address
        </p>
        <div className="bg-blue-600 h-10 w-10 rounded-full  " />
      </div>
      {/* table */}

      <form onSubmit={handleSubmit} className="flex flex-col w-full h-fit overflow-auto mb-5 mt-5   gap-5 bg-white shadow-sm shadow-neutral-700 p-2 text-sm  ">
        <div className="w-full flex flex-row gap-5 ">
          <div className="flex flex-col w-1/2  gap-3 ">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Billing Company Name
              </p>
              <input
              required
                name="billingCompanyName"
                value={formData.billingCompanyName}
                id="billingCompanyName"
                onChange={handleInputChange}
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Address1</p>
              <textarea  
              required
                name="billingAddress1"
                value={formData.billingAddress1}
                id="billingAddress1"
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Area</p>
              <input
              required
                type="text"
                name="billingArea"
                value={formData.billingArea}
                id="billingArea"
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">State</p>
              <input
              required
                type="text"
                name="billingState"
                value={formData.billingState}
                id="billingState"
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Zip Code</p>
              <input
              required
                type="number"
                name="billingZipCode"
                value={formData.billingZipCode}
                id="billingZipCode"
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
                name="billingContactPerson"
                value={formData.billingContactPerson}
                id="billingContactPerson"
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Shipping Company Name
              </p>
              <input
              required
                type="text"
                name="shippingCompanyName"
                value={formData.shippingCompanyName}
                id="shippingCompanyName"
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Address2</p>
              <textarea
              required
                name="shippingAddress2"
                value={formData.shippingAddress2}
                id="shippingAddress2"
                onChange={handleInputChange}
               className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">City</p>
              <input
              required
                type="text"
                name="shippingCity"
                value={formData.shippingCity}
                id="shippingCity"
                onChange={handleInputChange}

                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Country</p>
              <input
              required
                type="text"
                name="shippingCountry"
                value={formData.shippingCountry}
                id="shippingCountry"
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
                type="number"
                name="shippingPhoneNumber"
                value={formData.shippingPhoneNumber}
                id="shippingPhoneNumber"
                onChange={handleInputChange}
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-row gap-2 items-center mt-8">
              <button
                onClick={() => navigate("/home/clients")}
                className=" p-2 rounded-md bg-blue-400 text-sm font-semibold text-white"
              >
                Back to List
              </button>

              <button type="submit" className="p-2 rounded-md bg-green-400 text-sm font-semibold text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewShipping;
