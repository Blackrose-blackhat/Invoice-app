import React from "react";
import { BrowserRouter, Routes, Route, HashRouter, useNavigate } from "react-router-dom";
import "./index.css"
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import ClientDetails from "./components/ClientDetails";
import ClientPriceDetails from "./components/ClientPrice";
import InvoiceDetails from "./components/InvoiceDetails";
import NewBilling from "./components/NewBilling";
import NewClientPrice from "./components/NewClientPrice";
import PaymentDetails from "./components/PaymentDetails";
import ProductDetails from "./components/ProductDetails";
import SalesDetails from "./components/SalesDetails";
import ShippingDetails from "./components/ShippingDetail";
import NewClient from "./components/newClient";
import NewProd from "./components/newProd";
import NewShipping from "./components/newShipping";
import NewVoucher from "./components/newVoucher";
import NewSales from "./components/newsales";
import Clients from "./screens/Clients";
import Invoices from "./screens/Invoices";
import Login from "./screens/Login";
import Payment from "./screens/Payment";
import Products from "./screens/Products";
import Tax from "./screens/Tax";
import Monthly from "./screens/monthly";
import Sales from "./screens/sales";
import "./components/init"
import Check from "./components/check";
import { Toaster } from "react-hot-toast";
import BillingDetails from "./components/BillingDetails";
import InvoicePrint from "./components/invoicePrint";
import Ledger from "./screens/Ledger";
import LedgerDetails from "./components/LedgerDetails";
const root = createRoot(document.body);

// const navigate = useNavigate();
root.render(
<>

<HashRouter>
  {/* <Check /> */}
  <div><Toaster/></div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Layout />}>
          <Route path="/home/invoices" element={<Invoices />} />
          <Route path="/home/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/home/sales/:id" element={<SalesDetails />} />
          <Route path="/home/products/:id" element={<ProductDetails />} />
          <Route path='/home/sales' element={<Sales />} />
          <Route path='/home/sales/new' element={<NewSales />} />
          <Route path='/home/sales/new/:id' element={<NewSales />} />
          <Route path="/home/invoices/print/:id" element={<InvoicePrint />} />
          <Route path='/home/products' element={<Products />} />
          <Route path='/home/product/new' element={<NewProd />} />
          <Route path='/home/product/new/:id' element={<NewProd />} />

          <Route path='/home/payment/new' element={<NewVoucher />} />
          <Route path='/home/payment/new/:id' element={<NewVoucher />} />

          <Route path='/home/clients/new' element={<NewClient />} />
          <Route path='/home/clients/new/:id' element={<NewClient />} />
          <Route path='/home/clients/billing/:id' element={<BillingDetails />} />

          <Route path='/home/clients/billing/new' element={<NewBilling />} />
          <Route path='/home/clients/billing/new/:id' element={<NewBilling />} />
          
          <Route path='/home/clients/shipping/new' element={<NewShipping />} />
          <Route path='/home/clients/shipping/new/:id' element={<NewShipping />} />

          <Route path='/home/shipping/:id' element={<ShippingDetails />} />
          <Route path='/home/clinetprice/:id' element={<ClientPriceDetails />} />
          <Route path='/home/clients/price/new' element={<NewClientPrice />} />
          <Route path='/home/clients/price/new/:id' element={<NewClientPrice />} />



          <Route path='/home/payment' element={<Payment />} />
          <Route path='/home/payment/:id' element={<PaymentDetails />} />

          <Route path='/home/clients' element={<Clients />} />
          <Route path='/home/clients/:id' element={<ClientDetails />} />

          <Route path='/home/tax' element={<Tax />} />
          <Route path='/home/monthly' element={<Monthly />} />
          <Route path='/home/ledger' element={<Ledger />} />
          <Route path="/home/ledger/:id" element={<LedgerDetails />} />
        </Route>
      </Routes> 
      {/* <Check /> */}
    </HashRouter>
</>
);
