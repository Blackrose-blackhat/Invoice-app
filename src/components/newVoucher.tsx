import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  generateId,
  generateRandom3DigitNumber,
  getAllBillings,
  getAllClients,
  getAllProducts,
  getAllShippings,
  getClientById,
  getCurrentDate,
  getCurrentDateFormatted,
  getVoucherById,
  productDb,
} from "../utils/Actions";
import { useEffect, useState } from "react";
import PouchDb from "pouchdb-browser";
import toast from "react-hot-toast";

const NewVoucher = () => {
  const { id } = useParams();
  const rand = generateRandom3DigitNumber();
  const [getPrdocut, setGetProduct] = useState([]);
  const [voucher, setVouhcer] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // Replace with the actual product number

  const [newProductCode, setNewProductCode] = useState("");
  const db = new PouchDb("vouchers");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: id ? id : generateId(),
    voucherNumber: null,
    voucherDate: getCurrentDateFormatted(),
    clientName: "",
    address: "",
    state: "",
    GSTINNumber: "",
    placeOfSupply: "",
    voucherId: rand,
    AddedProduct: [],
    shipping: [],
    products: [],
    clients: [],
    clientID: "",
    totalValue:0,
    Amount:null,
    Instumetno:null,
    
  });
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
    console.log(newProductCode);
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

            setFormData(prevFormData => ({
              ...prevFormData,
              AddedProduct: [
                ...prevFormData.AddedProduct,
                {
                  ...foundDocument,
                  quantity: quantity,
                },
              ],
              totalValue: (foundDocument.productRate * quantity) * (foundDocument.IGST || foundDocument.CGST || foundDocument.SGST) / 100,
            }));
            

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
  useEffect(() => {
    const getVoucher = async () => {
      if (id) {
        const res = getVoucherById(id);
        console.log(res);
        res.then((result) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...result,
          }));
        });
      }
      try {
        const res = getAllShippings();
        const prod = getAllProducts();
        const bill = getAllBillings();
        const client = getAllClients();
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
        client.then((client) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            clients: client,
          }));
        });
      } catch (error) {
        console.error(error);
      }
    };
    getVoucher();
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

    try {
      let res;

      if (id) {
        // If id exists, update the existing voucher
        res = await db.put({
          _id: id,
          ...formData,
        });
        toast.success("Voucher Updated Successfully");
      } else {
        // If id doesn't exist, add a new voucher
        res = await db.put({
          _id: new Date().toISOString(), // Add an _id for the new document
          ...formData,
        });
        toast.success("Voucher Added Successfully");
        try {
          const doc = await getClientById(formData.clientID);
          setVouhcer([doc]);
          console.log(doc._id === formData.clientID);
  
          const clientDb = new PouchDb("clients");
  
          clientDb.get(doc._id).then((existingDoc) => {
            const existingVoucher = existingDoc && existingDoc.voucher ? existingDoc.voucher : [];
            const updatedVoucher = [...existingVoucher, formData];
  
            return clientDb.put({
              _id: doc._id,
              ...doc,
              voucher: updatedVoucher,
            });
          });
        } catch (error) {
          console.error(error);
        }
      }

      

      if (res.ok) {
        navigate("/home/payment");
      }
      console.log("end");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (type: any, value: any) => {
    const selectedClient = formData.clients.find(
      (client) => client.clientName === value
    );

    setFormData((prevState) => ({
      ...prevState,
      [type]: value,
      clientID: selectedClient ? selectedClient._id : "",
    }));
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col py-20 px-10 w-full gap-20"
      >
        <div className="flex flex-row justify-between w-full items-center">
          <p className="font-semibold text-xl">New Payment Voucher</p>
          <div className="w-10 h-10 rounded-full bg-blue-300" />
        </div>

        <div className="bg-blue-100 w-full p-2 flex flex-row justify-end  ">
          <div className=" w-full gap-5 flex flex-row justify-end">
            <button
              type="submit"
              className="bg-green-500 text-neutral-100 font-semibold  p-2  rounded-sm "
            >
              Save
            </button>
            <button
              onClick={() => navigate("/home/payment")}
              className="bg-red-500 text-neutral-100 font-semibold p-2 rounded-sm "
            >
              Cancel
            </button>
          </div>
        </div>

      <div className="w-full mx-auto bg-white p-8 shadow-lg rounded-md">
      <table className="w-full">
        <tbody>
          <tr>
            <th className="pr-4">Voucher Number:</th>
            <td className="pr-4">
              <input
              required
                placeholder="Enter Voucher Number"
                name="voucherNumber"
                onChange={handleInputChange}
                value={formData.voucherNumber}
                type="number"
                className="border p-2 w-full"
              />
            </td>
            <th className="pr-4">Voucher Date:</th>
            <td>
              <input
              required
                name="voucherDate"
                onChange={handleInputChange}
                value={formData.voucherDate}
                type="date"
                className="border p-2 w-full"
              />
            </td>
          </tr>
          <tr>
            <th className="pr-4">Client Name:</th>
            <td className="pr-4">
              <select
              required
                onChange={(e) => handleSelectChange("clientName", e.target.value)}
                value={formData.clientName}
                placeholder="Enter Client"
                className="border p-2 w-full bg-transparent outline-none"
              >
                <option value="">Select a client</option>
                {formData.clients.map((client) => (
                  <option key={client._id} value={client.clientName}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </td>
            <th className="pr-4">Address:</th>
            <td>
              <textarea
              required
              placeholder="Enter Address"
                onChange={handleInputChange}
                value={formData.address}
                name="address"
                className="border p-2 w-full"
              />
            </td>
          </tr>
          <tr>
            <th className="pr-4">State:</th>
            <td className="pr-4">
              <input
              required
              placeholder="Enter State"
                onChange={handleInputChange}
                value={formData.state}
                name="state"
                type="text"
                className="border p-2 w-full"
              />
            </td>
            <th className="pr-4">GSTIN Number:</th>
            <td>
              <input
              required
              placeholder="Enter GSTIN Number"
                onChange={handleInputChange}
                type="number"
                value={formData.GSTINNumber}
                name="GSTINNumber"
                className="border p-2 w-full"
              />
            </td>
          </tr>
          <tr>
            <th className="pr-4">Place of supply::</th>
            <td className="pr-4">
              <input
              required
              placeholder="Enter Place of supply"
                onChange={handleInputChange}
                value={formData.placeOfSupply}
                name="placeOfSupply"
                type="text"
                className="border p-2 w-full"
              />
            </td>
            <th className="pr-4">Amount</th>
            <td>
              <input
              required
              placeholder="Enter Amount"
                onChange={handleInputChange}
                type="number"
                value={formData.Amount}
                name="Amount"
                className="border p-2 w-full"
              />
            </td>
            
          </tr>
          <tr>
          <th className="pr-4">Instrument No.</th>
            <td>
              <input
              required
              placeholder="Enter Instrument number"
                onChange={handleInputChange}
                type="number"
                value={formData.Instumetno}
                name="Instumetno"
                className="border p-2 w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      </form>
      {/* product */}
      <div className="px-40 grid grid-cols-1 gap-5 mx-9">
        <p className="font-semibold text-neutral-600 text-xl py-2">
          Payment Voucher Items
        </p>
        <div className="grid grid-cols-2 gap-4 items-center">
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

              <th className=" py-2">HSN Code</th>
              <th className=" py-2">Taxable Value</th>
              <th className=" py-2">SCGST/CGST Rate</th>
              <th className=" py-2">IGST</th>
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
                    {product.hsnCode}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {product.productRate * product.quantity}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {product.SGST || product.CGST}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {product.IGST}
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

export default NewVoucher;
