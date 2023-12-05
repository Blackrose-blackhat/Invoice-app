import React from "react";
import { useNavigate } from "react-router-dom";

const NewClientPrice = () => {
    let navigate = useNavigate();

    return (
        <div className="flex flex-col p-20 w-full gap-20">
            <div className="flex flex-row items-center justify-between w-full">
                <p className="font-bold text-neutral-800 text-xl ">New Client Price</p>
                <div className="bg-blue-500 h-10 w-10 rounded-full" />
            </div>

            {/* table */}
            <div className="w-full flex flex-col gap-5 items-center">
                <div className="flex flex-row bg-blue-200 justify-between items-center w-2/3 p-2 rounded-md">
                    <p className="font-semibold text-blue-400 text-xl">Client Price</p>
                    <div className="flex flex-row items-center gap-5">
                        <button
                            onClick={() => navigate("/home/clients")}
                            className="bg-blue-500 font-semibold p-2 px-3 text-white rounded-sm"
                        >
                            Back to List
                        </button>
                        <button className="bg-green-500 font-semibold p-2 px-3  text-white rounded-sm">
                            Save
                        </button>
                    </div>
                </div>
                <div className="flex rounded-md flex-col items-center justify-center w-2/3 shadow-sm shadow-neutral-700 bg-neutral-100">
                    <div className="p-2 w-full">
                        <p className="font-semibold text-neutral-700 mx-2">Add Client Price</p>
                    </div>
                    <div className="flex flex-col gap-5 bg-white shadow-sm p-2 px-3 w-full items-center justify-center">
                        <div className="flex flex-row gap-8 items-center w-full">
                            <p className="font-semibold text-d">Client Name</p>
                            <input
                                placeholder="Enter Client"
                                type="text"
                                className="border-2 border-gray-300 p-1 rounded-md w-2/3"
                            />
                        </div>
                        <div className="flex flex-row gap-8 items-center w-full">
                            <p className="font-semibold text-d">Product</p>
                            <input
                                placeholder="Enter Product"
                                type="text"
                                className="mx-8 border-2 border-gray-300 p-1 rounded-md w-2/3"
                            />
                        </div>
                        <div className="flex flex-row gap-8 items-center w-full">
                            <p className="font-semibold text-d">Rate</p>
                            <input
                                placeholder="Enter Product"
                                type="text"
                                className="mx-14 border-2 border-gray-300 p-1 rounded-md w-2/3"
                            />
                        </div>
                        <div className="flex flex-row gap-8 items-center w-full">
                            <p className="font-semibold text-d">Unit Code</p>
                            <select className="border-2 border-gray-300 p-1 rounded-md w-2/3 mx-5">
                                <option value="unit1">Unit 1</option>
                                <option value="unit2">Unit 2</option>
                                <option value="unit3">Unit 3</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewClientPrice;
