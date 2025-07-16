import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { BiQrScan } from "react-icons/bi";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const ScanTickets = () => {
  const [activeSection, setActiveSection] = useState("scan-tickets");
  const loggedInUser = "John Doe";
  const sections = [
    {
      name: "Scan Tickets",
      icon: <MdOutlineQrCodeScanner />,
      id: "scan-tickets",
    },
  ];

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "scan-tickets" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 m-2 mb-4">Scan Tickets</h2>
          <div className="flex items-center gap-2 bg-blue-100 text-gray-900 px-4 py-3 rounded-xl border border-blue-300">
            <div className="flex items-center gap-2 p-1 font-semibold ">
              <BiQrScan className="text-gray-900 font-bold text-xl" />
              Scan Tickets
            </div>
          </div>

          <div className="flex items-center gap-2 bg-pink-200 text-gray-900 px-4 py-3 rounded-xl border border-pink-500">
            <div className="flex items-center gap-2 p-1 font-semibold">
              <FaCamera className="text-brown-900 text-xl" />
              Camera access required
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanTickets;
