import React, { useState, useMemo } from 'react';
import { FaRegFileAlt, FaPlus, FaTrash, FaBars, FaEye, FaPencilAlt } from 'react-icons/fa';

const AdminPages = ({ 
  pages, 
  setPages, 
  onNavigateToCreatePage,
  onNavigateToViewPage,
  onNavigateToEditPage,
  onNavigateToOrder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);


  const sortedAndFilteredPages = useMemo(() =>
    pages
      .sort((a, b) => a.order - b.order)
      .filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase())
      ), [searchTerm, pages]
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPages(sortedAndFilteredPages.map(p => p.id));
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

  const handleBulkDelete = () => {
    if (selectedPages.length === 0) {
      alert('Please select pages to delete');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${selectedPages.length} page(s)?`)) {
      setPages(prev => prev.filter(page => !selectedPages.includes(page.id)));
      setSelectedPages([]);
      alert('Selected pages deleted successfully!');
    }
  };

  const handleDeleteSingle = (pageId) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      setPages(prev => prev.filter(page => page.id !== pageId));
      setSelectedPages(prev => prev.filter(id => id !== pageId));
      alert('Page deleted successfully!');
    }
  };

  const handleViewPage = (page) => {
    if (onNavigateToViewPage) {
      onNavigateToViewPage(page);
    } else {
      console.log('Viewing page:', page);
      alert(`Viewing page: ${page.title}`);
    }
  };

  const handleEditPage = (page) => {
    if (onNavigateToEditPage) {
      onNavigateToEditPage(page);
    } else if (onNavigateToCreatePage) {
      onNavigateToCreatePage(page);
    } else {
      console.log('Editing page:', page);
      alert(`Editing page: ${page.title}`);
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
            <button 
              onClick={() => onNavigateToCreatePage()}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm transition-colors duration-200"
            >
              <FaPlus className="mr-2" /> Add New
            </button>
            <button 
              onClick={handleBulkDelete}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm transition-colors duration-200"
            >
              <FaTrash className="mr-2" /> Bulk Delete
            </button>
            <button 
              onClick={onNavigateToOrder}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm transition-colors duration-200"
            >
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
            <select className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search pages..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left w-10">
                  <input 
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedPages.length > 0 && selectedPages.length === sortedAndFilteredPages.length}
                    className="rounded"
                  />
                </th>
                <th className="p-3 text-left font-semibold text-gray-600 text-sm">Title</th>
                <th className="p-3 text-left font-semibold text-gray-600 text-sm">Status</th>
                <th className="p-3 text-left font-semibold text-gray-600 text-sm">Created At</th>
                <th className="p-3 text-right font-semibold text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredPages.length > 0 ? (
                sortedAndFilteredPages.map(page => (
                  <tr key={page.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                    <td className="p-3">
                      <input 
                        type="checkbox"
                        checked={selectedPages.includes(page.id)}
                        onChange={(e) => handleSelectOne(e, page.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-3 text-sm font-medium text-gray-900">{page.title}</td>
                    <td className="p-3 text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        page.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                      }`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{page.createdAt}</td>
                    <td className="p-3 text-sm">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleViewPage(page)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200 flex items-center"
                          title="View Page Details"
                        >
                          <FaEye className="mr-1" /> View
                        </button>
                        <button 
                          onClick={() => handleEditPage(page)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200 flex items-center"
                          title="Edit Page"
                        >
                          <FaPencilAlt className="mr-1" /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteSingle(page.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200 flex items-center"
                          title="Delete Page"
                        >
                          <FaTrash className="mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    {searchTerm ? `No pages found matching "${searchTerm}"` : 'No pages available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing 1 to {sortedAndFilteredPages.length} of {sortedAndFilteredPages.length} entries
            {searchTerm && ` (filtered from ${pages.length} total entries)`}
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-sm transition-colors duration-200">
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-sm transition-colors duration-200">
              Next
            </button>
          </div>
        </div>

        {selectedPages.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              {selectedPages.length} page(s) selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPages;