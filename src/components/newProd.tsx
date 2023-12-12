import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../components/init";
import PouchDB from "pouchdb-browser";
import { getProductById } from "../utils/Actions";
const NewProd = () => {
  const { id } = useParams();
  const db = new PouchDB("products");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: id ? id : uuidv4(),
    purchaseOrderNo: "",
    productCode: "",
    productDescription: "",
    productRate: "",
    unit: "unit1", // Default value for unit
    hsnCode: "",
    taxRate: "",
    productNumber:""
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
      toast.success("Product Updated Successfully");
      navigate("/home/products");
    }
    await db.put(formData);
    navigate("/home/products");
    toast.success("Product Added Successfully");
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
          <table className=" text-sm p-5 w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Purchase order no.</p>
                </td>
                <td className="border border-gray-300 ">
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
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Product Code</p>
                </td>
                <td className="border border-gray-300 ">
                  <input
                    required
                    placeholder="Enter Product Code"
                    type="number"
                    id="productCode"
                    name="productCode"
                    value={formData.productCode}
                    onChange={handleInputChange}
                    className="w-full  p-2 outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Product Description</p>
                </td>
                <td>
                  <input
                    required
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    placeholder="Enter Product description"
                    type="text"
                    className="w-full  p-2 outline-none"
                  />
                </td>
                <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Product Rate</p>
                </td>
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <input
                    required
                    id="productRate"
                    name="productRate"
                    value={formData.productRate}
                    onChange={handleInputChange}
                    placeholder="Enter Product Rate"
                    type="number"
                    className="w-full  p-2 outline-none "
                  />
                </td>
              </tr>
              <tr>
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Unit</p>
                </td>
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <select
                    id="unit"
                    required
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="outline-none w-full bg-transparent text-neutral-500 font-normal"
                  >
                    <option value="unit1">Unit 1</option>
                    <option value="unit2">Unit 2</option>
                    <option value="unit3">Unit 3</option>
                  </select>
                </td>
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">HSN Code</p>
                </td>

                <td className="">
                  <input
                    required
                    id="hsnCode"
                    name="hsnCode"
                    value={formData.hsnCode}
                    onChange={handleInputChange}
                    placeholder="Enter Product Code"
                    type="number"
                    className=" outline-none w-full  p-2 border-gray-300 "
                  />
                </td>
              </tr>
              <tr>
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Tax Rate</p>
                </td>
                <td>
                  <input
                    required
                    id="taxRate"
                    name="taxRate"
                    value={formData.taxRate}
                    onChange={handleInputChange}
                    placeholder="Enter Tax Rate"
                    type="number"
                    className="w-full  p-2 outline-none "
                  />
                </td>
                <td className=" p-2 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                  <p className="w-fit ">Product Number</p>
                </td>
                <td>
                  <input
                    required
                    id="productNumber"
                    name="productNumber"
                    value={formData.productNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Product Number"
                    type="number"
                    className="w-full  p-2 outline-none "
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default NewProd;
