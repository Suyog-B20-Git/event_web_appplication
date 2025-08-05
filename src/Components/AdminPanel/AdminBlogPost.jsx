import React, { useState, useMemo } from 'react';
import { FaRegNewspaper, FaPlusCircle, FaTrashAlt, FaListOl, FaEye, FaPencilAlt, FaTrash, FaGripVertical, FaSave, FaTimes } from 'react-icons/fa';

const AdminBlogPost = ({ onNavigateToAddPost, onNavigateToEditPost }) => {
    const [mockPosts, setMockPosts] = useState([
        {
            id: 1,
            slug: "do-you-have-never-ending-cravings-for-biryanis",
            title: "Do You Have Never Ending Cravings For Biryanis?",
            imageUrl: "https://placehold.co/120x80/f8b4b4/333?text=Biryani",
            status: "published",
            createdAt: "2025-07-25 22:35:25",
            order: 1,
        },
        {
            id: 2,
            slug: "unwind-your-psyche-and-soul-in-kerala",
            title: "Unwind Your Psyche And Soul In Kerala-Part 2!",
            imageUrl: "https://placehold.co/120x80/a2f8b4/333?text=Kerala",
            status: "published",
            createdAt: "2025-07-22 22:25:27",
            order: 2,
        },
        {
            id: 3,
            slug: "a-palatal-palate-trip-to-peru",
            title: "A Palatal Palate Trip to Peru",
            imageUrl: "https://placehold.co/120x80/b4c5f8/333?text=Peru",
            status: "published",
            createdAt: "2025-07-20 20:11:53",
            order: 3,
        },
        {
            id: 4,
            slug: "visit-kerala-like-never-before",
            title: "Visit Kerala Like Never Before!",
            imageUrl: "https://placehold.co/120x80/f8f8b4/333?text=Travel",
            status: "draft",
            createdAt: "2025-06-15 12:05:15",
            order: 4,
        },
        {
            id: 5,
            slug: "exploring-the-alps-a-hikers-guide",
            title: "Exploring the Alps: A Hiker's Guide",
            imageUrl: "https://placehold.co/120x80/e0c6f7/333?text=Alps",
            status: "published",
            createdAt: "2025-06-10 10:15:00",
            order: 5,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [isOrderMode, setIsOrderMode] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);

    const filteredPosts = useMemo(() =>
        mockPosts
            .filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => a.order - b.order),
        [searchTerm, mockPosts]
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

    const handleBulkDelete = () => {
        if (selectedPosts.length > 0) {
            console.log('Deleting posts:', selectedPosts);
            setSelectedPosts([]);
        }
    };

    const handleDelete = (id) => {
        console.log('Deleting post:', id);
    };

    const handleEditPost = (post) => {
        if (onNavigateToEditPost) {
            onNavigateToEditPost(post);
        }
    };

    
    const toggleOrderMode = () => {
        setIsOrderMode(!isOrderMode);
        if (isOrderMode) {
        
            console.log('Exiting order mode');
        }
    };

    const saveOrder = () => {
        console.log('Saving new order:', mockPosts.map(p => ({ id: p.id, order: p.order })));
        setIsOrderMode(false);
       
    };

    const handleDragStart = (e, post) => {
        setDraggedItem(post);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetPost) => {
        e.preventDefault();
        
        if (!draggedItem || draggedItem.id === targetPost.id) {
            return;
        }

        const newPosts = [...mockPosts];
        const draggedIndex = newPosts.findIndex(p => p.id === draggedItem.id);
        const targetIndex = newPosts.findIndex(p => p.id === targetPost.id);

        
        const [removed] = newPosts.splice(draggedIndex, 1);
        newPosts.splice(targetIndex, 0, removed);

      
        newPosts.forEach((post, index) => {
            post.order = index + 1;
        });

        setMockPosts(newPosts);
        setDraggedItem(null);
    };

    const moveUp = (postId) => {
        const postIndex = mockPosts.findIndex(p => p.id === postId);
        if (postIndex > 0) {
            const newPosts = [...mockPosts];
           
            [newPosts[postIndex], newPosts[postIndex - 1]] = [newPosts[postIndex - 1], newPosts[postIndex]];
            
            newPosts.forEach((post, index) => {
                post.order = index + 1;
            });
            setMockPosts(newPosts);
        }
    };

    const moveDown = (postId) => {
        const postIndex = mockPosts.findIndex(p => p.id === postId);
        if (postIndex < mockPosts.length - 1) {
            const newPosts = [...mockPosts];
           
            [newPosts[postIndex], newPosts[postIndex + 1]] = [newPosts[postIndex + 1], newPosts[postIndex]];
            
            newPosts.forEach((post, index) => {
                post.order = index + 1;
            });
            setMockPosts(newPosts);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-0 rounded-lg mb-6 gap-4">
                <div className="flex items-center space-x-4">
                    <FaRegNewspaper className="text-2xl text-gray-600" />
                    <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
                    {isOrderMode && (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Order Mode Active
                        </span>
                    )}
                </div>
               
                <div className="flex items-center space-x-2">
                    {!isOrderMode ? (
                        <>
                            <button 
                                onClick={onNavigateToAddPost}
                                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full sm:rounded-md shadow-sm transition-all duration-200"
                            >
                                <FaPlusCircle className="text-lg sm:mr-2" />
                                <span className="hidden sm:inline">Add New</span>
                            </button>
                            <button 
                                onClick={handleBulkDelete}
                                disabled={selectedPosts.length === 0}
                                className="flex items-center justify-center bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full sm:rounded-md shadow-sm transition-all duration-200"
                            >
                                <FaTrashAlt className="text-lg sm:mr-2" />
                                <span className="hidden sm:inline">Bulk Delete</span>
                            </button>
                            <button 
                                onClick={toggleOrderMode}
                                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full sm:rounded-md shadow-sm transition-all duration-200"
                            >
                                <FaListOl className="text-lg sm:mr-2" />
                                <span className="hidden sm:inline">Order</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={saveOrder}
                                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full sm:rounded-md shadow-sm transition-all duration-200"
                            >
                                <FaSave className="text-lg sm:mr-2" />
                                <span className="hidden sm:inline">Save Order</span>
                            </button>
                            <button 
                                onClick={toggleOrderMode}
                                className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white font-semibold w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 rounded-full sm:rounded-md shadow-sm transition-all duration-200"
                            >
                                <FaTimes className="text-lg sm:mr-2" />
                                <span className="hidden sm:inline">Cancel</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                {!isOrderMode && (
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
                                placeholder="Search posts..."
                            />
                        </div>
                    </div>
                )}

                {isOrderMode && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-800 font-medium">
                            <FaGripVertical className="inline mr-2" />
                            Drag and drop posts to reorder them, or use the up/down buttons. Click "Save Order" when finished.
                        </p>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full" style={{ minWidth: '800px' }}>
                        <thead>
                            <tr className="bg-gray-100">
                                {isOrderMode && (
                                    <th className="p-3 text-left w-16 font-semibold text-gray-600 text-sm uppercase">Order</th>
                                )}
                                {!isOrderMode && (
                                    <th className="p-3 text-left w-10">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={filteredPosts.length > 0 && selectedPosts.length === filteredPosts.length}
                                        />
                                    </th>
                                )}
                                <th className="p-3 text-left font-semibold text-gray-600 text-sm uppercase">Title</th>
                                <th className="p-3 text-left font-semibold text-gray-600 text-sm uppercase">Post Image</th>
                                <th className="p-3 text-left font-semibold text-gray-600 text-sm uppercase">Status</th>
                                <th className="p-3 text-left font-semibold text-gray-600 text-sm uppercase">Created At</th>
                                <th className="p-3 text-right font-semibold text-gray-600 text-sm uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map((post, index) => (
                                <tr 
                                    key={post.id} 
                                    className={`border-b border-gray-200 hover:bg-gray-50 ${isOrderMode ? 'cursor-move' : ''}`}
                                    draggable={isOrderMode}
                                    onDragStart={(e) => handleDragStart(e, post)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, post)}
                                >
                                    {isOrderMode ? (
                                        <td className="p-3">
                                            <div className="flex items-center space-x-2">
                                                <FaGripVertical className="text-gray-400 cursor-move" />
                                                <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                                                    {post.order}
                                                </span>
                                            </div>
                                        </td>
                                    ) : (
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedPosts.includes(post.id)}
                                                onChange={(e) => handleSelectOne(e, post.id)}
                                            />
                                        </td>
                                    )}
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
                                            {isOrderMode ? (
                                                <div className="flex space-x-1">
                                                    <button
                                                        onClick={() => moveUp(post.id)}
                                                        disabled={index === 0}
                                                        className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full text-xs transition-colors"
                                                        title="Move Up"
                                                    >
                                                        ↑
                                                    </button>
                                                    <button
                                                        onClick={() => moveDown(post.id)}
                                                        disabled={index === filteredPosts.length - 1}
                                                        className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full text-xs transition-colors"
                                                        title="Move Down"
                                                    >
                                                        ↓
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <a 
                                                        href={`/post/${post.slug}`} 
                                                        className="flex items-center space-x-1 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs hover:bg-yellow-500 transition-colors"
                                                    >
                                                        <FaEye /> <span>View</span>
                                                    </a>
                                                    <button
                                                        onClick={() => handleEditPost(post)}
                                                        className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors"
                                                    >
                                                        <FaPencilAlt /> <span>Edit</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(post.id)}
                                                        className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600 transition-colors"
                                                    >
                                                        <FaTrash /> <span>Delete</span>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!isOrderMode && (
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                        <div className="text-sm text-gray-600">
                            Showing 1 to {filteredPosts.length} of {mockPosts.length} entries
                        </div>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-sm">Previous</button>
                            <button className="px-3 py-1 border rounded bg-blue-500 text-white text-sm">1</button>
                            <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-sm">Next</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBlogPost;
