import "../components/init";
import { invoice_data } from "./data";
import PouchDb from "pouchdb-browser";
import db from "../db";
export const getInvoiceById = (id: number) => {
    const invoice = invoice_data.find(invoice => invoice.invoice_id === id);
    return invoice || 'Invoice not found';
   
  }

const clientDb = new PouchDb('clients');
const productDb = new PouchDb('products');
const billingDb = new PouchDb('billing');
const shippinfDb = new PouchDb('shipping');
const clientPriceDb = new PouchDb('clientPrice');
export const getClientById = async (id: string) => {
  
  try{
    const res = await clientDb.get(id);
    
    return res;
  }
  catch(err:any)
  {
    console.log(err);
  }
    
};

export const deleteClientById=async (id:string) => {
  
  try{
    const clientDoc = await clientDb.get(id);
    const res = await clientDb.remove(clientDoc._id,clientDoc._rev );
    
  }
  catch(error:any)
  {
    
    console.error(error.message);
    throw error;
  }
}

export const deleteProductById = async (id:string)=>{
  try{
    const productDoc = await productDb.get(id);
    const res = await productDb.remove(productDoc._id,productDoc._rev );
    
  }
  catch(error:any)
  {
    
    console.error(error.message);
    throw error;
  }
}

export const getProductById = async (id:string) => {
 
  try{
    const productDoc = await productDb.get(id);
    return productDoc;
  }
  catch(err:any)
  {
    console.error(err.message);
  }
}

export const getBillingById = async(id:string) => {
  try {
    const billingDoc = await billingDb.get(id);
    return billingDoc;

  } 
  catch (error:any) {
    console.error(error.message);
  }
}

export const deleteBillingById = async(id:string) => {
  try{
    const billingDoc = await billingDb.get(id);
    const res = await billingDb.remove(billingDoc._id,billingDoc._rev );
  }
  catch(error:any){
    console.error(error.message);
    throw error;
  }
}

export const getShippingById = async(id:string) => {
  try {
    
    const shippingDoc = await shippinfDb.get(id);
    console.log(id)
    console.log(shippingDoc);
    return shippingDoc;
    

  } 
  catch (error:any) {
    console.error(error.message);
  }
}

export const  getClientPriceById = async (id:string)=> {
  try {
    const clientPriceDoc = await clientPriceDb.get(id);
    // console.log(clientPriceDoc);
    return clientPriceDoc;
  } catch (error) {
    console.error(error.message);
  }
}

export const deleteShippingById = async(id:string) => {
  try{
    const deleteDoc = await shippinfDb.get(id);
    const res = await shippinfDb.remove(deleteDoc._id,deleteDoc._rev);
  }
  catch(error:any)
  {
    console.log(error.message)
  }
}

export const getAllClients = async () => {
  try {
    const allClients = await clientDb.allDocs({ include_docs: true });
    
    // Extract the documents from the result
    const clients = allClients.rows.map(row => row.doc);

    return clients;
  } catch (err: any) {
    console.log(err);
  }
};

export const getAllProducts = async () => {
  try {
    const allProducts = await productDb.allDocs({ include_docs: true });
    
    // Extract the documents from the result
    const products = allProducts.rows.map(row => row.doc);

    return products;
  } catch (err) {
    console.log(err);
  }
};

export const deleteClientPriceById = async(id:string) => {
  try{
    const deleteDoc = await clientPriceDb.get(id);
    const res = await clientPriceDb.remove(deleteDoc._id,deleteDoc._rev);
  }
  catch(error:any)
  {
    console.log(error.message)
  }
}

export const generateRandom3DigitNumber=()=> {
  return Math.floor(Math.random() * 900) + 100;
}
