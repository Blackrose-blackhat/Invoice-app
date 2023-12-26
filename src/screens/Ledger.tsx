import React, { useEffect, useState } from "react";
import { getAllClients } from "../utils/Actions";
import { Link } from "react-router-dom";

const Ledger = () => {
  const [client, setClient] = useState([]);
  useEffect(() => {
    const res = getAllClients();
    res.then((result) => {
      setClient(result);
    });
  }, []);

  return (
    <section className="w-full flex flex-col h-screen p-20">
      <div className="flex flex-row justify-between align-middle">
        <h1 className="font-semibold text-2xl text-neutral-900">Ledger</h1>
      </div>
      {/* //table */}

      <div className="w-full flex flex-col p-40 px-48">
        <div className="overflow-x-auto max-h-screen overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 border-b border-gray-300 text-left font-semibold text-xs text-gray-600 uppercase">
                  S.NO.
                </th>
                <th className="py-3 px-6 border-b border-gray-300 text-left font-semibold text-xs text-gray-600 uppercase">
                  Client Name
                </th>
                <th className="py-3 px-6 border-b border-gray-300 text-left font-semibold text-xs text-gray-600 uppercase">
                  Company Name
                </th>
                <th className="py-3 px-6 border-b border-gray-300 text-left font-semibold text-xs text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {client?.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 transition duration-300 text-sm"
                >
                  <td className="py-1 px-6 border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-1 px-6 border-b border-gray-300">
                    {item.clientName}
                  </td>
                  <td className="py-1 px-6 border-b border-gray-300">
                    {item.company}
                  </td>
                  <td className="py-1 px-6 border-b border-gray-300">
                    <Link to={`/home/ledger/${item._id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-lg ml-2 hover:bg-blue-400 transition duration-300">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Ledger;
