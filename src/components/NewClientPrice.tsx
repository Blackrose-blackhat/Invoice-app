import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateId, getAllClients, getAllProducts, getClientById, getClientPriceById } from "../utils/Actions";
import "../components/init";
import PouchDB from "pouchdb-browser";
import toast from "react-hot-toast";

const NewClientPrice = () => {
    const {id} = useParams();
    console.log(id);
  const navigate = useNavigate();
    const db = new PouchDB("clientPrice")
  const [formData, setFormData] = useState({
    _id:id?id:generateId(),
    clients: [],
    selectedClient: '',
    products: [],
    selectedProduct: '',
    rate:'',

  });
  useEffect(() => {
    const fetchData = async () => {

      if(id){
        const res = getClientPriceById(id);
        res.then((result)=> {
          setFormData((prevFormData)=> ({
            ...prevFormData,
            ...result,
          }))
        })
      }

      try {
        const clientsData = await getAllClients();
        const productsData = await getAllProducts();

        setFormData(prevState => ({
          ...prevState,
          clients: clientsData,
          products: productsData,
        }));
        
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleSelectChange = (type: any, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleSubmit = async(e:any) => {
    //TODO handle submit
    e.preventDefault();
    
    if(id) {
        await db.put({
            _id:id,
            ...formData,
        });
        toast.success(" Client Price updates successfully!");
        navigate("/home/clients");
    }
    else{
        await db.put(formData);
        navigate("/home/clients");
        toast.success("New Client Price Added succesfully")
    }

   formData.clients.map((client)=>{
    console.log(client.clientName)
   })

console.log(formData.selectedClient)

   

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-20 w-full gap-20">
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
            <button type="submit" className="bg-green-500 font-semibold p-2 px-3  text-white rounded-sm">
              Save
            </button>
          </div>
        </div>
        <div className="flex rounded-md flex-col items-center justify-center w-2/3 shadow-sm shadow-neutral-700 bg-neutral-100">
          <div className="p-2 w-full">
            <p className="font-semibold text-neutral-700 mx-2">
              Add Client Price
            </p>
          </div>
          <div className="flex flex-col gap-5 bg-white shadow-sm p-2 px-3 w-full items-center justify-center">
            <div className="flex flex-row gap-8 items-center w-full">
              <p className="font-semibold text-d">Client Name</p>
              <select
                onChange={(e) => handleSelectChange('selectedClient', e.target.value)}
                value={formData.selectedClient}
                placeholder="Enter Client"
                className="border-2 border-gray-300 p-1 rounded-md w-2/3"
              >
                <option value="">Select a client</option>
                {formData.clients.map((client) => (
                  <option key={client._id} value={client.clientName}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row gap-8 items-center w-full">
              <p className="font-semibold text-d">Product</p>
              <select
                id="productSelect"
                value={formData.selectedProduct}
                onChange={(e) => handleSelectChange('selectedProduct', e.target.value)}
                className="border-2 border-gray-300 p-1 rounded-md w-2/3 mx-8"
              >
                <option value="" disabled>
                  Select a product
                </option>
                {formData.products.map((product) => (
                  <option key={product.productId} value={product.productCode}>
                    {product.productCode}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row gap-8 items-center w-full">
              <p className="font-semibold text-d">Rate</p>
              <input
                required
                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                value={formData.rate}
                id="rate"
                placeholder="Enter Rate"
                type="text"
                className="mx-14 border-2 border-gray-300 p-1 rounded-md w-2/3"
              />
            </div>
            <div className="flex flex-row gap-8 items-center w-full">
              <p className="font-semibold text-d">Unit Code</p>
              <select disabled className="border-2 border-gray-300 p-1 rounded-md w-2/3 mx-5">
                <option value="Nos">Nos</option>
                
                
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewClientPrice;
