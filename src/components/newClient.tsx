import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../components/init";
import PouchDB from "pouchdb-browser";
import toast from "react-hot-toast";
import { generateRandom3DigitNumber, getClientById, getInvoiceById } from "../utils/Actions";

const NewClient = ({ invoiceID }: any) => {
  

  const db = new PouchDB("clients");
  const { id } = useParams();

  const navigate = useNavigate();
  const rand = generateRandom3DigitNumber();

  const [formData, setFormData] = useState({
    _id: id ? id : uuidv4(),
    
    clientName: "",
    city: "",
    company: "",
    phoneNumber: "",
    website: "",
    address: "",
    state: "",
    zipCode: "",
    faxArea: "",
    mailAddress: "",
    clientId : rand,
  });
  useEffect(() => {
    const getClient = async () => {
      if (id) {
        const res = getClientById(id);
        console.log(res);
        res.then((result) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...result,
          }))
        });
      }
    };
    getClient();
  }, [id]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    if (id) {
      await db.put({
        _id: invoiceID,

        ...formData,
      });
      toast.success("Client updated Successfully");
      navigate("/home/clients");
    } else {
      await db.put(formData);
      navigate("/home/clients");
      toast.success("Client Added Successfully");
    }
  };
  const handleBack = async (e: any) => {
    e.preventDefault();
    navigate("/home/clients");
  };

  return (
    <div className=" w-full h-screen flex flex-col gap-40">
      <div className="flex flex-row justify-between py-10 px-10 ">
        <h1 className="font-semibold text-slate-800 text-xl">Add new Client</h1>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full justify-center p-10 lg:px-40 px-10 gap-10"
      >
        <div className="flex flex-row bg-blue-200 justify-between items-center w-full p-2 rounded-md">
          <p className="font-semibold text-blue-400 text-xl">Add new Client</p>
          <div className="flex flex-row items-center gap-5">
            <button
              onClick={handleBack}
              className="bg-blue-500 font-semibold p-2 px-3 text-white rounded-sm"
            >
              Back to List
            </button>
            <button
              type="submit"
              className="bg-green-500 font-semibold p-2 px-3  text-white rounded-sm"
            >
              Save
            </button>
          </div>
        </div>
        {/* table */}

        <div className="flex flex-col bg-white shadow-sm shadow-neutral-700 p-5 w-full gap-10">
          <div className="flex flex-row w-full ">
            <div className="flex flex-col w-1/2 px-10 gap-2 ">
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">
                  Client Name
                </p>
                <input
                required
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">City</p>
                <input
                required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">
                  Company
                </p>
                <input
                required
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">
                  Phone Number
                </p>
                <input
                required
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">
                  Website
                </p>
                <input
                required
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2 gap-1 ">
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">
                  Address
                </p>
                <textarea
                required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">State</p>
                <input
                required
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">
                  Zip Code
                </p>
                <input
                required
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">
                  Fax Area
                </p>
                <input
                required
                  name="faxArea"
                  value={formData.faxArea}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">
                  Mail Address
                </p>
                <input
                required
                  name="mailAddress"
                  value={formData.mailAddress}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-1"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewClient;
