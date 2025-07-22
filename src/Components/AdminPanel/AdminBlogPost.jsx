import React, { useState, useMemo } from 'react';
import { FaRegNewspaper, FaPlusCircle, FaTrashAlt, FaListOl, FaSearch, FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';

// Mock data for blog posts
const mockPosts = [
    {
        id: 1,
        title: "Do You Have Never Ending Cravings For Biryanis?",
        imageUrl: "https://placehold.co/120x80/f8b4b4/333?text=Biryani",
        status: "published",
        createdAt: "2024-10-12 22:35:25",
    },
    {
        id: 2,
        title: "Unwind Your Psyche And Soul In Kerala-Part 2!",
        imageUrl: "https://placehold.co/120x80/a2f8b4/333?text=Kerala",
        status: "published",
        createdAt: "2024-10-12 22:25:27",
    },
    {
        id: 3,
        title: "A Palatal Palate Trip to Peru",
        imageUrl: "https://placehold.co/120x80/b4c5f8/333?text=Peru",
        status: "published",
        createdAt: "2024-10-12 20:11:53",
    },
    {
        id: 4,
        title: "Visit Kerala Like Never Before!",
        imageUrl: "https://placehold.co/120x80/f8f8b4/333?text=Travel",
        status: "draft",
        createdAt: "2024-09-24 12:05:15",
    },
     {
        id: 5,
        title: "Exploring the Alps: A Hiker's Guide",
        imageUrl: "https://placehold.co/120x80/e0c6f7/333?text=Alps",
        status: "published",
        createdAt: "2024-09-22 10:15:00",
    },
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
        <div>
            {/* Header Section */}
            <div className="flex justify-between items-center bg-transparent p-0 rounded-lg mb-6">
                <div className="flex items-center space-x-4">
                    <FaRegNewspaper className="text-2xl text-gray-600" />
                    <h1 className="text-2xl font-bold text-gray-800">Posts</h1>

                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm">
                            <FaPlusCircle className="mr-2" /> Add New
                        </button>
                        <button className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm">
                            <FaTrashAlt className="mr-2" /> Bulk Delete
                        </button>
                        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 text-sm rounded-full shadow-sm">
                            <FaListOl className="mr-2" /> Order
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
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        post.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                    </span>
                                </td>
                                <td className="p-3 text-sm">{post.createdAt}</td>
                                <td className="p-3 text-sm">
                                    <div className="flex justify-end space-x-2">
                                        <button className="flex items-center space-x-1 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs hover:bg-yellow-500 transition-colors">
                                            <FaEye />
                                            <span>View</span>
                                        </button>
                                        <button className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors">
                                            <FaPencilAlt />
                                            <span>Edit</span>
                                        </button>
                                        <button className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600 transition-colors">
                                            <FaTrash />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Section */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-600">
                        Showing 1 to {filteredPosts.length} of {filteredPosts.length} entries
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

export default AdminBlogPost;