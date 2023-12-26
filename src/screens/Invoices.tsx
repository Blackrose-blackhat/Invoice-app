
import { InvoiceTable } from "../components/table";
import { invoice_data } from "../utils/data";
import React from "react";
import logo from "../assets/onflow-logo.png";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";
import AccountMenu from "../components/Menu";
import logo from "../assets/onflow-logo.png";

 const Invoices = () => {
  const navigate = useNavigate ();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logged out');
  };
  
  return (
    <div className=" w-full h-screen flex flex-col py-10 gap-1">
      <div className="flex flex-row w-full justify-center">
      <div className="flex flex-row justify-between py-20 px-10 w-2/3 ">
        <h1 className="font-semibold text-slate-800 text-2xl">Invoices</h1>
        <AccountMenu logo={logo} onLogout={handleLogout} />
      </div>
      </div>
      
      
      <div className="px-10 py-10 flex flex-col ">
        <div className=" w-full py-2 flex flex-col gap-1">

            <InvoiceTable />
          
        </div>
      </div>
    </div>
  );
};

export default Invoices;