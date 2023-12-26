import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import "../components/init";
import PouchDB from "pouchdb-browser";
import { generateId, getCurrentDate, getCurrentDateFormatted, getProductById } from "../utils/Actions";
const NewProd = () => {
  const { id } = useParams();
  const db = new PouchDB("products");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: id ? id : generateId(),
    purchaseOrderNo: null,
    productCode: null,
    productDescription: "",
    productRate:null,
    unit: "Nos", // Default value for unit
    hsnCode: null,
    taxRate: null,
   
    productNumber: null,
    poDate: getCurrentDateFormatted(),
  });

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        const res = getProductById(id);
        console.log(res);
        res.then((result) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...result,
          }));
        });
      }
    };
    getProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

   

  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
      IGST: value.startsWith('18') ? 18 : null,
      CGST: value.startsWith('CGST9') ? 9 : null,
      SGST: value.startsWith('CGST9') ? 9 : null,
    }));
  
    
  };
  
  console.log(formData);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      if (id) {
        // Updating an existing product
        await db.put({
          _id: id,
          ...formData,
        });
        toast.success("Product Updated Successfully");
      } else {
        // Adding a new product
        await db.put(formData);
        toast.success("Product Added Successfully");
        console.log(formData);
      }
  
      // Redirect to the products page
      navigate("/home/products");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, show an error message, etc.
    }
  };
  
  return (
    <div className="w-full h-screen flex flex-col gap-14">
      <div className="flex flex-row justify-between py-10 px-10 ">
        <h1 className="font-semibold text-slate-800 text-2xl">
          Add New Product
        </h1>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>
      <form onSubmit={handleSubmit} className="px-10 py-20">
        <div className=" w-full py-2 flex flex-col">
          <div className="rounded-md w-full flex flex-row justify-between items-center bg-green-200 py-5 px-2">
            <h2 className="text-green-500 font-semibold text-lg">
              Add New Product
            </h2>
            <div className="flex flex-row gap-5">
              <button
                type="submit"
                className="bg-blue-500 text-slate-200 p-2 rounded-sm text-md font-semibold"
              >
                Save
              </button>
              <button
                onClick={() => navigate("/home/products")}
                className="bg-red-500 text-slate-200 p-2 rounded-sm text-md font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>	



        </div>
        <div
          onSubmit={handleSubmit}
          className="w-full p-2   mx-auto shadow-md shadow-neutral-400 "
        >
          <div className="w-full p-5">
  <table className="text-sm w-full border-collapse border border-gray-300">
    <tbody>
      <tr>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="w-fit">Purchase Order No.</p>
        </td>
        <td className="border border-gray-300">
          <input
            required
            type="number"
            id="purchaseOrderNo"
            name="purchaseOrderNo"
            value={formData.purchaseOrderNo}
            onChange={handleInputChange}
            className="w-full p-2 outline-none"
          />
        </td>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="w-fit">Product Code</p>
        </td>
        <td className="border border-gray-300">
          <input
            required
            placeholder="Enter Product Code"
            type="number"
            id="productCode"
            name="productCode"
            value={formData.productCode}
            onChange={handleInputChange}
            className="w-full p-2 outline-none"
          />
        </td>
      </tr>
      <tr>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="w-fit">Product Description</p>
        </td>
        <td colSpan="3">
          <input
            required
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            placeholder="Enter Product Description"
            type="text"
            className="w-full p-2 outline-none"
          />
        </td>
      </tr>
      <tr>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="w-fit">Product Rate</p>
        </td>
        <td className="border border-gray-300">
          <input
            required
            id="productRate"
            name="productRate"
            value={formData.productRate}
            onChange={handleInputChange}
            placeholder="Enter Product Rate"
            type="number"
            className="w-full p-2 outline-none"
          />
        </td>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="w-fit">Unit</p>
        </td>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="font-semibold text-neutral-500">Nos</p>
        </td>
      </tr>
      <tr>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="w-fit">HSN Code</p>
        </td>
        <td className="border border-gray-300">
          <input
            required
            id="hsnCode"
            name="hsnCode"
            value={formData.hsnCode}
            onChange={handleInputChange}
            placeholder="Enter HSN Code"
            type="number"
            className="w-full p-2 outline-none"
          />
        </td>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="w-fit">Tax Rate</p>
        </td>
        <td className="border border-gray-300">
          <select
            required
            id="taxRate"
            name="taxRate"
            value={formData.taxRate}
            onChange={handleSelectChange}
            className="w-full p-2 outline-none"
          >
            <option value="">Select Tax Rate</option>
            <option value="18">18%</option>
            <option value="CGST9">9%</option>
            {/* <option value="SGST9">SGST(9%)</option> */}
          </select>
        </td>
      </tr>
      <tr>
        <td className="p-2 border w-fit border-gray-300 text-md font-semibold text-neutral-600">
          <p className="w-fit">Product Number</p>
        </td>
        <td className="border border-gray-300">
          <input
            required
            id="productNumber"
            name="productNumber"
            value={formData.productNumber}
            onChange={handleInputChange}
            placeholder="Enter Product Number"
            type="number"
            className="w-full p-2 outline-none"
          />
        </td>
        <td colSpan="2"></td>
      </tr>
    </tbody>
  </table>
</div>

        </div>
      </form>
    </div>
  );
};

export default NewProd;
