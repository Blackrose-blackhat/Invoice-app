import React from "react";
import { useNavigate } from "react-router-dom";
const NewSales = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex flex-col gap-14">
            <div className="flex flex-row justify-between py-10 px-11 ">
                <h1 className="font-semibold text-slate-800 text-2xl">Sales Order</h1>
                <div className="bg-blue-500 rounded-full w-10 h-10" />
            </div>
            <div className="px-10 py-20">
                <div className=" w-full py-2 flex flex-col">
                    <div className="w-full flex flex-row justify-between items-center bg-blue-100 py-5 px-2">
                        <h2 className="text-blue-500 font-semibold text-lg">
                            New Sales Order
                        </h2>
                        <div className="flex flex-row gap-5">
                            <button className="bg-blue-500 text-slate-200 p-2 rounded-sm text-md font-semibold">
                                Save
                            </button>
                            <button onClick={() => navigate("/home/sales") } className="bg-red-500 text-slate-200 p-2 rounded-sm text-md font-semibold">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className= "w-full p-5   mx-auto ">
                    <table className=" p-5 w-full border-collapse border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="  text-md px-2 border border-gray-300  font-semibold text-neutral-600">
                                    <p className="w-full">Sales Order Date</p>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="date"
                                        className="w-full border-2 p-1"
                                        
                                    />
                                </td>
                                <td className="border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                                    <p className="w-fit">Shipping Consignee</p>
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <select className="w-full text-md bg-transparent border-2 p-1 ">
                                        <option value="">Select a shipping client</option>
                                        <option value="client1">Client 1</option>
                                        <option value="client2">Client 2</option>
                                        <option value="client3">Client 3</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                            <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                                    <p className="w-fit ">Purchase order no.</p>
                                </td>
                                <td className="border border-gray-300 " >
                                    <input type="number" className="w-full" />
                                </td>
                                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                                    <p className="w-fit ">Purchase order Date</p>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="date"
                                        className="w-full border-2 p-1"
                                        
                                    />
                                </td>
                            </tr>
                            <tr>
                            <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                                    <p className="w-fit py-2 ">Destination</p>
                                </td>
                                <td className="border border-gray-300">
                                    <input type="text" />
                                </td>
                                <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                                    <p className="w-fit py-2 ">Transporter</p>
                                </td>
                                <td className="border border-gray-300  p-1">
                                    <select className="bg-transparent p-1 text-md border-2 w-full">
                                        <option value="">Select a transporter</option>
                                        <option value="transporter1">Transporter 1</option>
                                        <option value="transporter2">Transporter 2</option>
                                        <option value="transporter3">Transporter 3</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                            <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                                    <p className="w-fit py-2 ">Shipping Charges</p>
                                </td>
                                <td className="border border-gray-300">
                                    <input type="number" className="w-full" />
                                </td>
                                <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                                    <p className="w-fit py-2 ">Insaurance</p>
                                </td>
                                <td className="border border-gray-300">
                                    <input type="number" className="w-full" />
                                </td>
                            </tr>
                            <tr>
                            <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                                    <p className="w-fit  ">Remarks</p>
                                </td>
                                <td className="border border-gray-300">
                                    <input type="text" />
                                </td>
                                <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                                    <p className="w-fit  ">Due date</p>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="date"
                                        className="w-full border-2 p-1"
                                        
                                    />
                                </td>
                            </tr>
                            <tr>
                            <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                                    <p className="w-fit py-2 ">Status</p>
                                </td>
                                <td className="border border-gray-300  p-1">
                                    <select className="bg-transparent p-1 text-md border-2 w-full">
                                        <option value="">Select a Status</option>
                                        <option value="transporter1">Status 1</option>
                                        <option value="transporter2">Status 2</option>
                                        <option value="transporter3">Status 3</option>
                                    </select>
                                </td>
                                <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                                    <p className="w-fit py-2 ">Packaging and Forwarding</p>
                                </td>
                                <td className="border border-gray-300 ">
                                    <input type="number" className="w-full" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NewSales;
 

