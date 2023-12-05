import { invoice_data } from "./data";

export const getInvoiceById = (id: number) => {
    const invoice = invoice_data.find(invoice => invoice.invoice_id === id);
    return invoice || 'Invoice not found';
   
  }