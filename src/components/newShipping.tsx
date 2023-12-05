import React from "react";
import { useNavigate } from "react-router-dom";
const NewShipping = () => {
  let navigate=useNavigate();
  return (
    <div className="flex flex-col gap-40 p-10 w-full">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-xl text-neutral-800">
          Add New Shipping Address
        </p>
        <div className="bg-blue-600 h-10 w-10 rounded-full  " />
      </div>
      {/* table */}

      <div className="flex flex-col w-full h-fit overflow-auto mb-5 mt-5   gap-5 bg-white shadow-sm shadow-neutral-700 p-2 text-sm  ">
        <div className="w-full flex flex-row gap-5 ">
          <div className="flex flex-col w-1/2  gap-3 ">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">
                Billing Company Name
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Address1</p>
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
               Contact Person
              </p>
              <input
                type="text"
                className="border border-neutral-200 rounded-md px-5 py-2 text-sm text-neutral-800 font-semibold"
              />
            </div>
            
            
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-800 font-semibold">Shipping Company Name</p>
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
            <div className="flex flex-row gap-2 items-center mt-8">
              <button onClick={()=> navigate("/home/clients") } className=" p-2 rounded-md bg-blue-400 text-sm font-semibold text-white">
                Back to List
              </button>

              <button className= "p-2 rounded-md bg-green-400 text-sm font-semibold text-white">
                Save
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NewShipping;
