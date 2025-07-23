import React, { useState, useMemo } from 'react';
import { FaRegNewspaper, FaPlusCircle, FaTrashAlt, FaListOl, FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';

// Mock data for blog posts
const mockPosts = [
    { id: 1, title: "Do You Have Never Ending Cravings For Biryanis?", imageUrl: "https://placehold.co/120x80/f8b4b4/333?text=Biryani", status: "published", createdAt: "2024-10-12 22:35:25" },
    { id: 2, title: "Unwind Your Psyche And Soul In Kerala-Part 2!", imageUrl: "https://placehold.co/120x80/a2f8b4/333?text=Kerala", status: "published", createdAt: "2024-10-12 22:25:27" },
    { id: 3, title: "A Palatal Palate Trip to Peru", imageUrl: "https://placehold.co/120x80/b4c5f8/333?text=Peru", status: "published", createdAt: "2024-10-12 20:11:53" },
    { id: 4, title: "Visit Kerala Like Never Before!", imageUrl: "https://placehold.co/120x80/f8f8b4/333?text=Travel", status: "draft", createdAt: "2024-09-24 12:05:15" },
    { id: 5, title: "Exploring the Alps: A Hiker's Guide", imageUrl: "https://placehold.co/120x80/e0c6f7/333?text=Alps", status: "published", createdAt: "2024-09-22 10:15:00" },
];

const AdminBlogPost = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPosts, setSelectedPosts] = useState([]);

    const filteredPosts = useMemo(() =>
        mockPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]
    );

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedPosts(filteredPosts.map(p => p.id));
        } else {
            setSelectedPosts([]);
        }
    };

    const handleSelectOne = (e, id) => {
        if (e.target.checked) {
            setSelectedPosts(prev => [...prev, id]);
        } else {
            setSelectedPosts(prev => prev.filter(postId => postId !== id));
        }
    };

    return (
        <div className="w-full">
            {/* --- HEADER SECTION with compact buttons --- */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-0 rounded-lg mb-6 gap-4">
                <div className="flex items-center space-x-4">
                    <FaRegNewspaper className="text-2xl text-gray-600" />
                    <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
                </div>
                {/* Updated buttons: icon-only on mobile, text on larger screens */}
                <div className="flex items-center space-x-2">
                    <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full sm:rounded-full shadow-sm transition-all duration-200">
                        <FaPlusCircle className="text-lg sm:mr-2" />
                        <span className="hidden sm:inline">Add New</span>
                    </button>
                    <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full sm:rounded-full shadow-sm transition-all duration-200">
                        <FaTrashAlt className="text-lg sm:mr-2" />
                        <span className="hidden sm:inline">Bulk Delete</span>
                    </button>
                    <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full sm:rounded-full shadow-sm transition-all duration-200">
                        <FaListOl className="text-lg sm:mr-2" />
                        <span className="hidden sm:inline">Order</span>
                    </button>
                </div>
            </div>

            {/* --- TABLE CONTAINER --- */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center space-x-2 text-sm w-full md:w-auto">
                        <span>Show</span>
                        <select className="border border-gray-300 rounded-md px-2 py-1">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        <span>entries</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm w-full md:w-auto">
                        <label htmlFor="search" className="font-semibold">Search:</label>
                        <input
                            id="search"
                            type="text"
                            className="border border-gray-300 rounded-md px-2 py-1 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* This wrapper makes the table scroll horizontally on small screens */}
                <div className="overflow-x-auto">
                    <table className="w-full" style={{ minWidth: '800px' }}>
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left w-10">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedPosts.length > 0 && selectedPosts.length === filteredPosts.length}
                                    />
                                </th>
                                <th className="p-3 text-left font-semibold text-gray-600 text-sm uppercase">Title</th>
                                <th className="p-3 text-left font-semibold text-gray-600 text-sm uppercase">Post Image</th>
                                <th className="p-3 text-left font-semibold text-gray-600 text-sm uppercase">Status</th>
                                <th className="p-3 text-left font-semibold text-gray-600 text-sm uppercase">Created At</th>
                                <th className="p-3 text-right font-semibold text-gray-600 text-sm uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map(post => (
                                <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedPosts.includes(post.id)}
                                            onChange={(e) => handleSelectOne(e, post.id)}
                                        />
                                    </td>
                                    <td className="p-3 text-sm font-medium text-gray-800">{post.title}</td>
                                    <td className="p-3">
                                        <img src={post.imageUrl} alt={post.title} className="w-28 h-16 object-cover rounded-md shadow-sm" />
                                    </td>
                                    <td className="p-3 text-sm">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm">{post.createdAt}</td>
                                    <td className="p-3 text-sm">
                                        <div className="flex justify-end space-x-2">
                                            <button className="flex items-center space-x-1 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs hover:bg-yellow-500 transition-colors">
                                                <FaEye /> <span>View</span>
                                            </button>
                                            <button className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors">
                                                <FaPencilAlt /> <span>Edit</span>
                                            </button>
                                            <button className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600 transition-colors">
                                                <FaTrash /> <span>Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- PAGINATION SECTION --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                    <div className="text-sm text-gray-600">
                        Showing 1 to {filteredPosts.length} of {filteredPosts.length} entries
                    </div>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-sm">Previous</button>
                        <button className="px-3 py-1 border rounded bg-blue-500 text-white text-sm">1</button>
                        <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBlogPost;