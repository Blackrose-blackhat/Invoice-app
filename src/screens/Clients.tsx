/* eslint-disable prefer-const */
import "react-tabs/style/react-tabs.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillingAddress, ClientPrice, ClientTable, ShippingAddress } from "../components/table";
import { Billing, clients } from "../utils/data";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Clients = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  let navigate = useNavigate();

 

  return (
    <div className=" w-full h-screen flex flex-col gap-5">
      <div className="w-full flex flex-row justify-between py-20 px-10">
        <Tabs
          value={value}
          onChange={handleChange}
          className="  bg-transparent"
        >
          <Tab label="Clients" {...a11yProps(0)} />
          <Tab label="Billing Address" {...a11yProps(1)} />
          <Tab label="Shipping Address" {...a11yProps(2)} />
          <Tab label="Client Price" {...a11yProps(3)} />

        </Tabs>
        <div className="bg-blue-500 rounded-full w-10 h-10" />
      </div>

      <CustomTabPanel value={value} index={0}>
        <div className="px-10  flex flex-col ">
          <div className=" w-full py-2 flex flex-col gap-5">
            <div className="w-full flex flex-row justify-between items-center bg-blue-100 py-5 px-2">
              <h2 className="text-blue-500 font-semibold text-lg">Clients</h2>
              <button
                onClick={() => navigate("/home/clients/new")}
                className="bg-[#F0AC4E] text-slate-200 p-2 rounded-md text-sm font-semibold"
              >
                Add Clients
              </button>
            </div>
            <ClientTable client={clients} />
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="px-10  flex flex-col ">
          <div className=" w-full py-2 flex flex-col gap-5">
            <div className="w-full flex flex-row justify-between items-center bg-blue-100 py-5 px-2">
              <h2 className="text-blue-500 font-semibold text-lg">
                Billing Address List
              </h2>
              <button
                onClick={() => navigate("/home/clients/billing/new")}
                className="bg-[#F0AC4E] text-slate-200 p-2 rounded-md text-sm font-semibold"
              >
                Add Billing Address
              </button>
            </div>
            <BillingAddress/>          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="px-10  flex flex-col ">
          <div className=" w-full py-2 flex flex-col gap-5">
            <div className="w-full flex flex-row justify-between items-center bg-blue-100 py-5 px-2">
              <h2 className="text-blue-500 font-semibold text-lg">
                Shipping Address List
              </h2>
              <button
                 onClick={() => navigate("/home/clients/shipping/new")}
                className="bg-[#F0AC4E] text-slate-200 p-2 rounded-md text-sm font-semibold"
              >
                Add Shipping Address
              </button>
            </div>
            <ShippingAddress  />         </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="px-10  flex flex-col ">
          <div className=" w-full py-2 flex flex-col gap-5">
            <div className="w-full flex flex-row justify-between items-center bg-blue-100 py-5 px-2">
              <h2 className="text-blue-500 font-semibold text-lg">
                Client Price List
              </h2>
              <button
               onClick={() => navigate("/home/clients/price/new")}
                className="bg-[#F0AC4E] text-slate-200 p-2 rounded-md text-sm font-semibold"
              >
                Add CLient Price List
              </button>
            </div>
            <ClientPrice  />        </div>
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default Clients;
