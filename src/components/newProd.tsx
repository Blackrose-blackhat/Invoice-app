import React from "react";
import { useNavigate } from "react-router-dom";
const NewProd = () => {
    let navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col gap-14">
      <div className="flex flex-row justify-between py-10 px-10 ">
        <h1 className="font-semibold text-slate-800 text-2xl">
          Add New Product
        </h1>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>
      <div className="px-10 py-20">
        <div className=" w-full py-2 flex flex-col">
          <div className="rounded-md w-full flex flex-row justify-between items-center bg-green-200 py-5 px-2">
            <h2 className="text-green-500 font-semibold text-lg">
              Add New Product
            </h2>
            <div className="flex flex-row gap-5">
              <button className="bg-blue-500 text-slate-200 p-2 rounded-sm text-md font-semibold">
                Save
              </button>
              <button onClick={() => navigate("/home/products") } className="bg-red-500 text-slate-200 p-2 rounded-sm text-md font-semibold">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="w-full p-2   mx-auto shadow-md shadow-neutral-400 ">
          <table className=" text-sm p-5 w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Purchase order no.</p>
                </td>
                <td className="border border-gray-300 ">
                  <input type="number" className="w-full" />
                </td>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Product Code</p>
                </td>
                <td className="border border-gray-300 ">
                  <input
                    placeholder="Enter Product Code"
                    type="number"
                    className="w-full  p-1 "
                  />
                </td>
              </tr>
              <tr>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Product Description</p>
                </td>
                <td>
                  <input
                    placeholder="Enter Product description"
                    type="number"
                    className="w-full  p-1 "
                  />
                </td>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Product Rate</p>
                </td>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <input
                    placeholder="Enter Product description"
                    type="number"
                    className="w-full  p-1 "
                  />
                </td>
              </tr>
              <tr>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Unit</p>
                </td>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <select className="w-full bg-transparent text-neutral-500 font-normal">
                    <option value="unit1">Unit 1</option>
                    <option value="unit2">Unit 2</option>
                    <option value="unit3">Unit 3</option>
                  </select>
                </td>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">HSN Code</p>
                </td>
                <td>
                  <td className="w-full">
                    <input
                      placeholder="Enter Product Code"
                      type="number"
                      className="w-full  p-1 border-gray-300 "
                    />
                  </td>
                </td>
              </tr>
              <tr>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Tax Rate</p>
                </td>
                <td>
                  <input placeholder="Enter Tax Rate" type="number" className="w-full  p-1 " />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewProd;
