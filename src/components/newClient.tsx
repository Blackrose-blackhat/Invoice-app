import React from "react";
import { useNavigate } from "react-router-dom";
const NewClient = () => {
    let navigate = useNavigate();
  return (
    <div className=" w-full h-screen flex flex-col gap-40">
      <div className="flex flex-row justify-between py-10 px-10 ">
        <h1 className="font-semibold text-slate-800 text-xl">Add new Client</h1>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>

      <div className="flex flex-col items-center w-full justify-center p-10 lg:px-40 px-10 gap-10">
        <div className="flex flex-row bg-blue-200 justify-between items-center w-full p-2 rounded-md">
          <p className="font-semibold text-blue-400 text-xl">Add new Client</p>
          <div className="flex flex-row items-center gap-5">
            <button onClick={() => navigate("/home/clients") } className="bg-blue-500 font-semibold p-2 px-3 text-white rounded-sm">
              Back to List
            </button>
            <button className="bg-green-500 font-semibold p-2 px-3  text-white rounded-sm">
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
                <input className="border-2 border-gray-300 p-1" />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">City</p>
                <input className="border-2 border-gray-300 p-1" />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">
                  Company
                </p>
                <input className="border-2 border-gray-300 p-1" />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">
                  Phone Number
                </p>
                <input className="border-2 border-gray-300 p-1" />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-semibold text-neutral-700">
                  Website
                </p>
                <input className="border-2 border-gray-300 p-1" />
              </div>
            </div>
            <div className="flex flex-col w-1/2 gap-1 ">
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">
                  Address
                </p>
                <textarea className="border-2 border-gray-300 p-1" />
              </div>
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">State</p>
                <input className="border-2 border-gray-300 p-1" />
              </div>
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">
                  Zip Code
                </p>
                <input className="border-2 border-gray-300 p-1" />
              </div>
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">
                  Fax Area
                </p>
                <input className="border-2 border-gray-300 p-1" />
              </div>
              <div className="flex flex-col  ">
                <p className="text-md font-semibold text-neutral-700">
                  Mail Address
                </p>
                <input className="border-2 border-gray-300 p-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClient;
