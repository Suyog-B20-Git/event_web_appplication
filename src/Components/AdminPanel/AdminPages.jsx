import React, { useState, useMemo } from 'react';
import {
  FaRegFileAlt, FaPlus, FaTrash, FaBars, FaEye, FaPencilAlt, FaSort, FaSortUp, FaSortDown
} from 'react-icons/fa';

// Mock data 
const mockPages = [
  { id: 1, title: 'Terms and Conditions', status: 'ACTIVE', createdAt: '2024-07-21 11:07:31' },
  { id: 2, title: 'Privacy', status: 'ACTIVE', createdAt: '2024-07-21 12:24:06' },
  { id: 3, title: 'List Your Venue', status: 'ACTIVE', createdAt: '2024-07-20 21:13:57' },
  { id: 4, title: 'How It Works', status: 'ACTIVE', createdAt: '2024-07-20 18:13:50' },
  { id: 5, title: 'FAQs', status: 'ACTIVE', createdAt: '2024-07-19 19:18:33' },
  { id: 6, title: 'EventsNode for Events Organizer', status: 'INACTIVE', createdAt: '2024-07-19 07:42:12' },
  { id: 7, title: 'Cookies Policy', status: 'ACTIVE', createdAt: '2024-07-18 11:07:31' },
  { id: 8, title: 'About Us', status: 'ACTIVE', createdAt: '2024-07-18 11:07:31' },
];

const AdminPages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);

  const filteredPages = useMemo(() =>
    mockPages.filter(page =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPages(filteredPages.map(p => p.id));
    } else {
      setSelectedPages([]);
    }
  };

  const handleSelectOne = (e, id) => {
    if (e.target.checked) {
      setSelectedPages(prev => [...prev, id]);
    } else {
      setSelectedPages(prev => prev.filter(pageId => pageId !== id));
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center bg-transparent p-0 rounded-lg mb-6">
        <div className="flex items-center space-x-4">
          <FaRegFileAlt className="text-2xl text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-800">Pages</h1>
          
        
          <div className="flex items-center space-x-2">
            <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm">
              <FaPlus className="mr-2" /> Add New
            </button>
            <button className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm">
              <FaTrash className="mr-2" /> Bulk Delete
            </button>
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm">
              <FaBars className="mr-2" /> Order
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <span>Show</span>
            <select className="border border-gray-300 rounded-md px-2 py-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span>Search:</span>
            <input 
              type="text" 
              className="border border-gray-300 rounded-md px-2 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left w-10">
                <input 
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedPages.length > 0 && selectedPages.length === filteredPages.length}
                />
              </th>
              <th className="p-3 text-left font-semibold text-gray-600 text-sm">Title</th>
              <th className="p-3 text-left font-semibold text-gray-600 text-sm">Status</th>
              <th className="p-3 text-left font-semibold text-gray-600 text-sm">Created At</th>
              <th className="p-3 text-right font-semibold text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPages.map(page => (
              <tr key={page.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">
                  <input 
                    type="checkbox"
                    checked={selectedPages.includes(page.id)}
                    onChange={(e) => handleSelectOne(e, page.id)}
                  />
                </td>
                <td className="p-3 text-sm">{page.title}</td>
                <td className="p-3 text-sm">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    page.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="p-3 text-sm">{page.createdAt}</td>
                <td className="p-3 text-sm">
                  <div className="flex justify-end space-x-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">View</button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
                Showing 1 to {filteredPages.length} of {filteredPages.length} entries
            </div>
            <div className="flex space-x-1">
                <button className="px-3 py-1 border rounded bg-gray-200 text-sm">Previous</button>
                <button className="px-3 py-1 border rounded bg-blue-500 text-white text-sm">1</button>
                <button className="px-3 py-1 border rounded bg-gray-200 text-sm">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPages;