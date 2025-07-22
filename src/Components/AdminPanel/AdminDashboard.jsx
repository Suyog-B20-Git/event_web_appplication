import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">EVENTSNODE</h2>
        <div className="mb-4">Ketan</div>
        <nav className="flex-1">
          {[
            "Dashboard",
            "Categories",
            "Events",
            "Tags",
            "Bookings",
            "Commissions",
            "Taxes",
            "Users",
            "Contacts",
            "Media",
            "Banners",
            "Pages",
            "Blog Posts",
            "Header Menu",
            "Footer Menu",
            "Venues",
            "Settings",
            "Promocodes",
            "Complimentary Bookings",
            "Currencies",
          ].map((item) => (
            <div
              key={item}
              className="py-2 px-4 hover:bg-blue-700 rounded cursor-pointer"
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Notifications</button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded shadow">Customers: 27</div>
          <div className="bg-blue-500 text-white p-6 rounded shadow">Organisers: 102</div>
          <div className="bg-blue-500 text-white p-6 rounded shadow">Events: 76</div>
          <div className="bg-blue-500 text-white p-6 rounded shadow">Bookings: 14</div>
          <div className="bg-blue-500 text-white p-6 rounded shadow col-span-2 md:col-span-4">
            INR Revenue: ₹11,500.00
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Top 10 Selling Events</h2>
          <div className="h-48 border border-dashed flex items-center justify-center text-gray-500">
            [Chart Placeholder]
          </div>
        </div>

        {/* Event Sales Report */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Event Sales Reports</h2>
          <input
            type="text"
            placeholder="Search and Select Event"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Search by Event, Order, Customer..."
            className="w-full mb-2 p-2 border rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Export Sales Report CSV
          </button>
          <div className="text-sm text-gray-500 mt-4">No data available</div>
        </div>

        {/* Ticket Statistics */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Event Tickets Statistics</h2>
          <input
            type="text"
            placeholder="Search and Select Event"
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="text-sm text-gray-500">No matching records found</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
