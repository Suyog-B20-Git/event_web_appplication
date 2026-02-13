import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegFileAlt, FaPlus, FaTrash, FaBars, FaEye, FaPencilAlt } from 'react-icons/fa';
import { getPages } from '../../redux/actions/master/pages/getPages';
import { deletePage as deletePageAction, bulkDeletePages as bulkDeletePagesAction } from '../../redux/actions/master/pages/deletePage';

const AdminPages = ({
  onNavigateToCreatePage,
  onNavigateToViewPage,
  onNavigateToEditPage,
  onNavigateToOrder
}) => {
  const dispatch = useDispatch();
  const { pages, loading, error } = useSelector(state => state.getPages || { pages: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch pages when component mounts
  useEffect(() => {
    if (!hasFetched && !loading) {
      setHasFetched(true);
      dispatch(getPages());
    }
  }, [dispatch, hasFetched, loading]);


  const sortedAndFilteredPages = useMemo(() =>
    pages
      .sort((a, b) => a.order - b.order)
      .filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase())
      ), [searchTerm, pages]
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPages(sortedAndFilteredPages.map(p => p._id));
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

  const handleBulkDelete = async () => {
    if (selectedPages.length === 0) {
      alert('Please select pages to delete');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedPages.length} page(s)?`)) {
      try {
        const result = await dispatch(bulkDeletePagesAction(selectedPages));
        if (result.success) {
          setSelectedPages([]);
        }
      } catch (error) {
        console.error('Bulk delete error:', error);
      }
    }
  };

  const handleDeleteSingle = async (pageId) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        const result = await dispatch(deletePageAction(pageId));
        if (result.success) {
          setSelectedPages(prev => prev.filter(id => id !== pageId));
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
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

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading pages...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="bg-transparent p-0 rounded-lg mb-6">

      {/* TOP ROW — unchanged for web */}
      <div className="flex items-center space-x-4">
        <FaRegFileAlt className="text-2xl text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-800">Pages</h1>

        {/* DESKTOP buttons — SAME AS BEFORE */}
        <div className="hidden md:flex items-center space-x-2">
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

      {/* MOBILE buttons — ONLY visible on mobile */}
      <div className="flex gap-2 mt-3 md:hidden">
        <button
          onClick={() => onNavigateToCreatePage()}
          className="flex-1 flex items-center justify-center
                    bg-green-500 hover:bg-green-600 text-white
                    font-semibold py-1 px-3 text-sm rounded-full shadow-sm"
        >
          <FaPlus className="mr-2" /> Add
        </button>

        <button
          onClick={handleBulkDelete}
          className="flex-1 flex items-center justify-center
                    bg-red-500 hover:bg-red-600 text-white
                    font-semibold py-1 px-3 text-sm rounded-full shadow-sm"
        >
          <FaTrash className="mr-2" /> Delete
        </button>

        <button
          onClick={onNavigateToOrder}
          className="flex-1 flex items-center justify-center
                    bg-blue-500 hover:bg-blue-600 text-white
                    font-semibold py-1 px-3 text-sm rounded-full shadow-sm"
        >
          <FaBars className="mr-2" /> Order
        </button>
      </div>

      </div>


      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-3 mb-4
                md:flex-row md:justify-between md:items-center">

      {/* Show entries */}
      <div className="flex items-center space-x-2 text-sm">
        <span>Show</span>
        <select
          className="border border-gray-300 rounded-md px-2 py-1
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <span>entries</span>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2 text-sm w-full md:w-auto">
        <span className="shrink-0">Search:</span>
        <input
          type="text"
          className="w-full md:w-auto
                    border border-gray-300 rounded-md px-2 py-1
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <tr key={page._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedPages.includes(page._id)}
                        onChange={(e) => handleSelectOne(e, page._id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-3 text-sm font-medium text-gray-900">{page.title}</td>
                    <td className="p-3 text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${page.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {page.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{new Date(page.createdAt).toLocaleDateString()}</td>
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
                          onClick={() => handleDeleteSingle(page._id)}
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