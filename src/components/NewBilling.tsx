
import React from "react";
import { useNavigate } from "react-router-dom";

const NewBilling = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen gap-10 px-5 py-14  ">
      <div className="w-full flex flex-row items-center justify-between ">
        <p className="font-semibold text-xl text-neutral-800">
          Add new Billing Address
        </p>
        <div className="bg-blue-700 rounded-full h-10 w-10" />
      </div>
      <div className="p-5 w-full justify-between flex flex-row rounded-md bg-blue-200 items-center mt-5 ">
        <p className="font-semibold text-md text-blue-600 ">Add new</p>
        <div className="flex flex-row items-center gap-5">
          <button onClick={() => navigate("/home/clients")} className="bg-blue-500 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
            Back
          </button>
          <button className="bg-blue-800 rounded-md px-5 py-2 text-sm text-slate-200 font-semibold">
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
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Address</p>
              <textarea className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Area</p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">State</p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Zip Code</p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Payment Terms
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                GSTIN Number
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Special Instructions
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Country</p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Address2</p>
              <textarea className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">City</p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Country</p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Phone Number
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Contact Person
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h1 className="text-xl font-light ">
            Original Sending Invoice Details
          </h1>
          <div className="w-full flex flex-row items-center">
            <p className="font-semibold text-neutral-800">Note:</p>
            <p className="text-light text-neutral-800">
              The details that you will neter below is used in delivery challan
              as consignee details . So , Enter the correct Details . But it is
              not mandatory
            </p>
          </div>
          <div className="flex flex-row w-full items-center justify-center gap-5  ">
            <div className="flex flex-col gap-2 w-1/2 ">
              <p className="text-sm text-neutral-800 font-semibold">
                Consignee Name
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <p className="text-sm text-neutral-800 font-semibold">
                Address with (Pin Code)
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-row w-full items-center gap-5 ">
            <div className="flex flex-col gap-2 w-1/2 ">
              <p className="text-sm text-neutral-800 font-semibold">
                City
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <p className="text-sm text-neutral-800 font-semibold">
                State
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-row w-full items-center gap-5 ">
            <div className="flex flex-col gap-2 w-1/2 ">
              <p className="text-sm text-neutral-800 font-semibold">
                Country
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <p className="text-sm text-neutral-800 font-semibold">
                Courier
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-row w-full items-center gap-5 ">
            <div className="flex flex-col gap-2 w-1/2 ">
              <p className="text-sm text-neutral-800 font-semibold">
                Kind Attn
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <p className="text-sm text-neutral-800 font-semibold">
                Phone
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-row w-full items-center gap-5 ">
            <div className="flex flex-col gap-2 w-1/2 ">
              <p className="text-sm text-neutral-800 font-semibold">
                Zip
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default NewBilling;
