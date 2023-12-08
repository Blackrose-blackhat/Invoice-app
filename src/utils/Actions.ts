import "../components/init";
import { invoice_data } from "./data";
import PouchDb from "pouchdb-browser";
import db from "../db";
export const getInvoiceById = (id: number) => {
    const invoice = invoice_data.find(invoice => invoice.invoice_id === id);
    return invoice || 'Invoice not found';
   
  }

const clientDb = new PouchDb('clients');

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
  console.log(id)
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