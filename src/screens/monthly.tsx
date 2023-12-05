/* eslint-disable prefer-const */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MonthlyTable } from "../components/table";
import { MothlyData } from "../utils/data";


 const Monthly = () => {
  let navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("5");
  const [searchValue, setSearchValue] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleAdd = () => {
    navigate("/home/sales/new");
  };
  return (
    <div className=" w-full h-screen flex flex-col gap-10">
      <div className="flex flex-row justify-between py-10 px-10 ">
        <h1 className="font-semibold text-slate-800 text-2xl">Monthly</h1>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>
      
      <div className="px-10 py-20 flex flex-col ">
        <div className=" w-full py-2 flex flex-col gap-5">
          <MonthlyTable monthly={MothlyData} /> 
        </div>
      </div>
    </div>
  );
};

export default Monthly;