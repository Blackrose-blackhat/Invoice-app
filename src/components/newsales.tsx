import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../components/init";
import PouchDB from "pouchdb-browser";
import {
  generateRandom3DigitNumber,
  getNewSaledById,
  getAllShippings,
  getAllClients,
  getAllProducts,
  findDocumentByProductNumber,
  productDb,
  getProductById,
  getAllBillings,
  generateId,
} from "../utils/Actions";
import toast from "react-hot-toast";

const NewSales = () => {
  const db = new PouchDB("newSales");
  const [quantity, setQuantity] = useState(1);
  const [transporters, setTransporters] = useState([
    "ST couriers",
    "Professional courier",
    "Shree madura courier",
  ]);
  const [otherTransporter, setOtherTransporter] = useState("");

  const { id } = useParams();
  const rand = generateRandom3DigitNumber();
  const [getPrdocut, setGetProduct] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);

  // Replace with the actual product number

  const [newProductCode, setNewProductCode] = useState("");
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //TODO:reformat the code
  const handleAddProduct = () => {
    setAddingProduct(true);
    if (newProductCode.trim() === "") {
      // Skip adding empty product codes
      return;
    }
    try {
      productDb
        .find({
          selector: {
            productCode: { $eq: newProductCode },
          },
        })
        .then((res) => {
          if (res.docs.length > 0) {
            const foundDocument = res.docs[0];
            setGetProduct([foundDocument]);

            setFormData({
              ...formData,
              AddedProduct: [
                ...formData.AddedProduct,
                {
                  ...foundDocument,
                  quantity: quantity,
                },
              ],
            });

            // setGetProduct(res.docs[0]);
            // console.log(res.docs[0]);
          } else {
            toast.error("Product not found");
          }
        });
      setAddingProduct(false);
      setQuantity(1);
    } catch (error) {
      console.error(error);
    }

    // Clear the input field after adding the product
    setNewProductCode("");
  };

  const handleRemoveProduct = (productId: any) => {
    const updatedProducts = formData.AddedProduct.filter(
      (product) => product._id !== productId
    );
    setFormData({ ...formData, AddedProduct: updatedProducts });
  };

  const [formData, setFormData] = useState({
    _id: id ? id : generateId(),
    salesId: rand,
    salesOrderDate: "",
    shippingConsignee: "",
    purchaseOrderNo: "",
    purchaseOrderDate: "",
    destination: "",
    transporter: "",
    shippingCharges: "",
    insurance: null,
    remarks: "",
    dueDate: "",
    status: "",
    packagingAndForwarding: null,
    shipping: [],
    products: [],
    AddedProduct: [],
    selectedProduct: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = getNewSaledById(id);
        res.then((result) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...result,
          }));
        });
      }
    };

    try {
      const res = getAllShippings();
      const prod = getAllProducts();
      const bill = getAllBillings();
      res.then((result) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          shipping: result,
        }));
      });
      prod.then((res) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          products: res,
        }));
      });
      bill.then((bills) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          billings: bills,
        }));
      });
    } catch (error) {
      console.error(error);
    }
    fetchData();
  }, []);

  const handleSelectChange = (type: any, value: any) => {
    const selectedShipping = formData.shipping.find(
      (ship) => ship.shippingCompanyName === value
    );

    setFormData((prevState) => ({
      ...prevState,
      [type]: value,
      clientName: selectedShipping ? selectedShipping.clientName : "",
      clientID: selectedShipping ? selectedShipping.clientID : "",
      selectedShipping:selectedShipping? selectedShipping:"",
    }));
  };
  console.log(formData)
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(getPrdocut);
    setFormData({
      ...formData,
    });
    //TODO: handle submit

    if (id) {
      await db.put({
        _id: id,
        ...formData,
      });
      toast.success("Sales Updated Successfully");
      navigate("/home/sales");
    } else {
      await db.put(formData);
      navigate("/home/sales");
      toast.success("Sales Added Successfully");
      console.log(formData);
      formData.AddedProduct.map((idx) => {
        console.log(idx);
      });
    }

    // console.log(formData);
  };

  const navigate = useNavigate();
  return (
    <div className="overflow-auto w-full">
      <form onSubmit={handleSubmit} className="w-full  flex flex-col gap-5">
        <div className="flex flex-row justify-between pt-20 px-11 ">
          <h1 className="font-semibold text-slate-800 text-2xl">Sales Order</h1>
          <div className="bg-blue-500 rounded-full w-10 h-10" />
        </div>
        <div className="px-10 py-10">
          <div className=" w-full py-2 flex flex-col">
            <div className="w-full flex flex-row justify-between items-center bg-blue-100 py-5 px-2">
              <h2 className="text-blue-500 font-semibold text-lg">
                New Sales Order
              </h2>
              <div className="flex flex-row gap-2">
                <button
                  type="submit"
                  
                  className="bg-blue-400 text-white p-2 rounded-lg px-5 text-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Save
                </button>
                <button
                  onClick={() => navigate("/home/sales")}
                  className="bg-red-500 text-white p-2 rounded-md px-5 text-md font-semibold hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="w-full p-5   mx-auto ">
            <table className=" p-5 w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="  text-md px-2 border border-gray-300  font-semibold text-neutral-600">
                    <p className="w-full">Sales Order Date</p>
                  </td>
                  <td className=" p-2">
                    <input
                      required
                      name="salesOrderDate"
                      value={formData.salesOrderDate}
                      id="salesOrderDate"
                      onChange={handleInputChange}
                      type="date"
                      className="w-full  p-1"
                    />
                  </td>
                  <td className="border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                    <p className="w-fit">Shipping Consignee</p>
                  </td>
                  <td className=" p-1">
                    <select
                      onChange={(e) =>
                        handleSelectChange("selectedClient", e.target.value)
                      }
                      className="w-full outline-none text-md bg-transparent  p-1 "
                    >
                      <option value="">Select a shipping client</option>

                      {formData.shipping.map((ship) => (
                        <option key={ship._id} value={ship.shippingCompanyName}>
                          {ship.shippingCompanyName}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                    <p className="w-fit ">Purchase order no.</p>
                  </td>
                  <td className="border border-gray-300 ">
                    <input
                      required
                      name="purchaseOrderNo"
                      value={formData.purchaseOrderNo}
                      id="purchaseOrderNo"
                      onChange={handleInputChange}
                      type="number"
                      className="w-full px-2"
                      placeholder="Enter purchase order no."
                    />
                  </td>
                  <td className=" p-1 border w-fit  border-gray-300 text-md  font-semibold text-neutral-600">
                    <p className="w-fit ">Purchase order Date</p>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      required
                      name="purchaseOrderDate"
                      value={formData.purchaseOrderDate}
                      id="purchaseOrderDate"
                      onChange={handleInputChange}
                      type="date"
                      className="w-full  p-1"
                      placeholder="Enter purchase order date"
                    />
                  </td>
                </tr>
                <tr>
                  <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                    <p className="w-fit py-2 ">Destination</p>
                  </td>
                  <td className="border border-gray-300">
                    <input
                      required
                      name="destination"
                      value={formData.destination}
                      id="destination"
                      onChange={handleInputChange}
                      type="text"
                      className="px-2"
                      placeholder="Enter destination"
                    />
                  </td>
                  <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                    <p className="w-fit py-2 ">Transporter</p>
                  </td>
                  <td className="border border-gray-300  p-1">
                    {formData.transporter !== "other" && (
                      <select
                        required
                        name="transporter"
                        value={formData.transporter}
                        id="transporter"
                        onChange={handleInputChange}
                        className="bg-transparent p-1 text-md  w-full"
                      >
                        <option value="">Select a transporter</option>
                        {transporters.map((transporter) => (
                          <option key={transporter} value={transporter}>
                            {transporter}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    )}

                    {formData.transporter === "other" && (
                      <input
                        placeholder="Enter transporter name"
                        type="text"
                        value={otherTransporter}
                        onChange={(e) => setOtherTransporter(e.target.value)}
                        onBlur={() => {
                          setTransporters([...transporters, otherTransporter]);
                          setFormData({
                            ...formData,
                            transporter: otherTransporter,
                          });
                        }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                    <p className="w-fit py-2 ">Shipping Charges</p>
                  </td>
                  <td className="border border-gray-300">
                    <input
                      required
                      name="shippingCharges"
                      value={formData.shippingCharges}
                      id="shippingCharges"
                      onChange={handleInputChange}
                      type="number"
                      className="w-full px-2"
                      placeholder="Enter shipping charges"
                    />
                  </td>
                  <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                    <p className="w-fit py-2 ">Insaurance</p>
                  </td>
                  <td className="border border-gray-300">
                    <input
                      required
                      name="insurance"
                      value={formData.insurance}
                      id="insurance"
                      onChange={handleInputChange}
                      type="number"
                      className="w-full px-2"
                      placeholder="Enter insurance"
                    />
                  </td>
                </tr>
                <tr>
                  <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                    <p className="w-fit  ">Remarks</p>
                  </td>
                  <td className="border border-gray-300">
                    <input
                      required
                      name="remarks"
                      value={formData.remarks}
                      id="remarks"
                      onChange={handleInputChange}
                      type="text"
                      className="w-full px-2"
                      placeholder="Enter remarks"
                    />
                  </td>
                  <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                    <p className="w-fit  ">Due date</p>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      required
                      name="dueDate"
                      value={formData.dueDate}
                      id="dueDate"
                      onChange={handleInputChange}
                      type="date"
                      className="w-full  p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                    <p className="w-fit py-2 ">Status</p>
                  </td>
                  <td className=" outline-none  p-1">
                    <select
                      disabled
                      required
                      name="status"
                      value={formData.status}
                      id="status"
                      onChange={handleInputChange}
                      className="bg-transparent p-1 text-md  w-full"
                    >
                      <option value="" disabled>
                        Initiated
                      </option>
                    </select>
                  </td>
                  <td className=" p-1 border w-fit  border-gray-300 text-md font-semibold text-neutral-600">
                    <p className="w-fit py-2 ">Packaging and Forwarding</p>
                  </td>
                  <td className="border border-gray-300 ">
                    <input
                      required
                      name="packagingAndForwarding"
                      value={formData.packagingAndForwarding}
                      id="packagingAndForwarding"
                      onChange={handleInputChange}
                      type="number"
                      className="w-full px-2"
                      placeholder="Enter packaging and forwarding"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
      <div className="px-48 grid grid-cols-1 gap-5 mx-9">
        <p className="font-semibold text-neutral-600 text-xl py-2">
          Add Product
        </p>
        <div className="grid grid-cols-2 gap-5 items-center">
          <label htmlFor="productSelect" className="text-md font-semibold">
            Select a product
          </label>
          <select
            id="productSelect"
            value={newProductCode}
            onChange={(e) => setNewProductCode(e.target.value)}
            className="border-2 border-gray-300 p-1 rounded-md"
          >
            <option value="" disabled>
              Select a product
            </option>
            {formData.products.map((product) => (
              <option key={product._id} value={product.productCode}>
                {product.productCode}
              </option>
            ))}
          </select>
          <label className="text-md font-semibold">Quantity</label>
          <div className="flex items-center space-x-2 w-full justify-center">
            <button
              className="font-semibold text-md bg-blue-500 text-white py-1 px-2 rounded"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              className="text-center font-semibold w-20 py-1 px-2 border-2 border-gray-300 rounded"
              type="number"
              value={quantity}
              readOnly
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="font-semibold text-md bg-blue-500 text-white py-1 px-2 rounded"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 px-2 w-1/2 lg:w-2/12  rounded-md text-slate-200 p-2 text-md font-semibold"
            disabled={addingProduct} // Disable the button when adding a product
          >
            {addingProduct ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
      <div className="p-5 px-40">
        <table className="w-full table-auto  ">
          <thead className="w-1/2">
            <tr className=" w-1/2 bg-gray-200">
              <th className=" py-2">Product Code</th>
              <th className=" py-2">Product Description</th>
              <th className=" py-2">Rate</th>
              <th className=" py-2">Actions</th>
            </tr>
          </thead>
          {formData.AddedProduct.length > 0 && (
            <tbody className="px-4 w-1/2">
              {formData.AddedProduct.map((product) => (
                <tr key={product._id} className="bg-gray-100 w-full">
                  <td className="border px-4 py-2 text-center">
                    {product.productCode}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {product.productDescription}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {product.productRate}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveProduct(product._id)}
                      className="bg-red-500 px-2 rounded-md text-slate-200 p-1 text-md font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default NewSales;
