import "../components/init";
import { invoice_data } from "./data";
import PouchDb from "pouchdb-browser";
import db from "../db";
import find from 'pouchdb-find';
import { useEffect, useState } from "react";
PouchDb.plugin(find);

export const invoiceDB = new PouchDb('invoices');
const clientDb = new PouchDb('clients');
export const productDb = new PouchDb('products');
const billingDb = new PouchDb('billing');
const shippinfDb = new PouchDb('shipping');
const clientPriceDb = new PouchDb('clientPrice');
const newSaledDb = new PouchDb('newSales');
const voucherDb = new PouchDb('vouchers'); 
export const ledgerDb = new PouchDb('ledgers');
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

export const getVoucherById = async (id:string) => {
  try {
    const res = await voucherDb.get(id);
    return res;
  } catch (error) {
    console.error(error.message);
  }

}

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

export const getAllShippings = async () => {
  try {
    const allShippings = await shippinfDb.allDocs({ include_docs: true });
    
    // Extract the documents from the result
    const shippings = allShippings.rows.map(row => row.doc);

    return shippings;
  } catch (err) {
    console.log(err);
  }
}

export const getAllInvoices = async () => {
  try{
    const allInvoice = await invoiceDB.allDocs({include_docs:true});
    const invoices =  allInvoice.rows.map(row=>row.doc);
    return invoices
  }
  catch(error)
  {
    console.error(error.message);
  }
}
export const getAllLedgers = async () => {
  try{
    const allLedger = await ledgerDb.allDocs({include_docs:true});
    const ledgers =  allLedger.rows.map(row=>row.doc);
    return ledgers
  }
  catch(error)
  {
    console.error(error.message);
  }

}

export const getAllVouchers = async () => {
  try{
    const allVoucher = await voucherDb.allDocs({include_docs:true});
    const vouchers =  allVoucher.rows.map(row=>row.doc);
    return vouchers
  }
  catch(error)
  {
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
export const getAllBillings = async ()=> {
  try {
    const allBill = await billingDb.allDocs({include_docs:true});
    const bills =  allBill.rows.map(row=>row.doc);
    return bills
  } catch (error) {
    console.error(error.message);
  }
}

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

export const deletePaymentById = async(id:string) => {
  try{
    const deleteDoc = await voucherDb.get(id);
    const res = await voucherDb.remove(deleteDoc._id,deleteDoc._rev);
  
  }
  catch(error:any)
  {
    console.log(error.message)
  }
}

export const deleteInvoiceById = async(id:string) => {
  try{
    const deleteDoc = await invoiceDB.get(id);
    const res = await invoiceDB.remove(deleteDoc._id,deleteDoc._rev);
  }
  catch(error:any)
  {
    console.log(error.message)
  }
}


export const getNewSaledById= async (id:string)=> {
  try{
    const newSaledDoc = await newSaledDb.get(id);
    return newSaledDoc;
  }
  catch(error:any)
  {
    console.log(error.message);
  }
}

export const deleteSalesById= async(id:string) => {
  try{
    const DeleteDoc = await newSaledDb.get(id);
    const res = await newSaledDb.remove(DeleteDoc._id,DeleteDoc._rev);
    return res;
  }
  catch(error:any)
  {
    console.log(error.message);
  }
}



export const findDocumentByProductNumber = async (productNumber: string) => {
  try {
      productDb.find({
      selector: {
        productCode: { $eq: productNumber },
      },
    }).then((res)=>{
      if (res.docs.length > 0) {
       
        // Document found
        const foundDocument = res.docs[0];
        // console.log(foundDocument)
        return foundDocument;
      } else {
        // Document not found
        console.log('Document not found');
        return null;
      }
    })

    
  } catch (error) {
    console.error('Error finding document:', error);
    throw error;
  }
};

export const getInvoiceById = async (id: string) => {
  try {
    const invoiceDoc = await invoiceDB.get(id);
    return invoiceDoc;
  } catch (error) {
    console.error(error.message);
  }
}



export const generateRandom3DigitNumber=()=> {
  return Math.floor(Math.random() * 900) + 100;
}
export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const searchAndHighlight = async (value: string, dbName: any) => {
  try {
    // Use the provided dbName or fallback to the default
    const db = new PouchDb(dbName || "your_database_name");

    // Search for the value in all fields
    const result = await db.find({
      selector: {
        $or: Object.keys(db.schema.fields).map((field) => ({ [field]: value })),
      },
    });

    return result.docs;
  } catch (error) {
    console.error("Error searching in PouchDB:", error);
    return [];
  }
};

export const usePouchDbSearch = (dbName: any, fields: any[], delay: number) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const db = new PouchDb(dbName);

  const performSearch = async (term: string) => {
    try {
      const lowerSearchTerm = term.toLowerCase();

      await db.createIndex({
        index: { fields },
      });

      const result = await db.find({
        selector: {
          $or: fields.map((field) => ({ [field]: { $regex: lowerSearchTerm, $options: 'i' } })),
        },
      });

      setSearchResults(result.docs);
    } catch (error) {
      console.error('Error searching in PouchDB:', error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, delay]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
  };
};

export const comma = (x:any) => {
  return x.toLocaleString("en-US");
  
};

export function getCurrentDateFormatted() {
  const currentDate = new Date();
  const day = ("0" + currentDate.getDate()).slice(-2);
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
}

export function generateId() {
  const timestamp = new Date().toISOString();
  const counter = getCounter(); // Implement getCounter according to your needs
  return `${timestamp}-${counter}`;
}

// Function to get the counter (this is a placeholder, implement it based on your needs)
function getCounter() {
  // You might get the counter from PouchDB or another source
  // For simplicity, you can use a simple counter stored in localStorage for illustration
  let counter = parseInt(localStorage.getItem('counter') || '0', 10);
  counter++;
  localStorage.setItem('counter', counter.toString());
  return counter;
}