import React, { useState, useMemo } from 'react';
import { FaList, FaPlus, FaTrash, FaPencilAlt, FaGripVertical, FaSave, FaTimes, FaLink, FaHome, FaGlobe, FaFolder, FaEdit, FaTrashAlt, FaSitemap } from 'react-icons/fa';

const initialFooterItems = [
    { id: 1, label: 'Privacy Policy', url: '/privacy', type: 'Page', order: 1 },
    { id: 2, label: 'Terms of Service', url: '/terms', type: 'Page', order: 2 },
    { id: 3, label: 'Support Center', url: '/support', type: 'Page', order: 3 },
    { id: 4, label: 'Documentation', url: 'https://docs.example.com', type: 'Custom Link', order: 4 },
    { id: 5, label: 'Company Blog', url: '/blog', type: 'Category', order: 5 },
    { id: 6, label: 'Contact Us', url: '/contact', type: 'Page', order: 6 },
];

const AdminFooterMenu = () => {
    const [footerItems, setFooterItems] = useState(initialFooterItems);
    const [isAdding, setIsAdding] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);

    const sortedFooterItems = useMemo(() => 
        [...footerItems].sort((a, b) => a.order - b.order),
        [footerItems]
    );

    const handleDragStart = (e, item) => setDraggedItem(item);
    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e, targetItem) => {
        if (!draggedItem || draggedItem.id === targetItem.id) return;

        let newItems = [...footerItems];
        const draggedIndex = newItems.findIndex(p => p.id === draggedItem.id);
        const targetIndex = newItems.findIndex(p => p.id === targetItem.id);

        const [removed] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, removed);

        newItems.forEach((item, index) => item.order = index + 1);
        setFooterItems(newItems);
        setDraggedItem(null);
    };
    
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this footer item?")) {
            setFooterItems(prev => prev.filter(item => item.id !== id));
        }
    };
    
    const handleSaveNewItem = (e) => {
        e.preventDefault();
        const label = e.target.elements.label.value;
        const url = e.target.elements.url.value;
        const type = e.target.elements.type.value;
        if (!label || !url) return alert("Label and URL are required.");
        
        const newItem = {
            id: Date.now(),
            label,
            url,
            type,
            order: footerItems.length + 1
        };
        setFooterItems(prev => [...prev, newItem]);
        setIsAdding(false);
    };

    const handleUpdateItem = (e) => {
        e.preventDefault();
        const label = e.target.elements.label.value;
        const url = e.target.elements.url.value;
        const type = e.target.elements.type.value;
        if (!label || !url) return alert("Label and URL are required.");
        
        setFooterItems(prev => prev.map(item => 
            item.id === editingItem.id ? { ...item, label, url, type } : item
        ));
        setEditingItem(null);
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Page': return <FaHome className="text-blue-500" />;
            case 'Category': return <FaFolder className="text-green-500" />;
            case 'Custom Link': return <FaGlobe className="text-purple-500" />;
            default: return <FaLink className="text-gray-500" />;
        }
    };

    const getTypeBadgeClass = (type) => {
        switch (type) {
            case 'Page': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Category': return 'bg-green-100 text-green-800 border-green-200';
            case 'Custom Link': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    
    const AddFooterModal = ({ onSave, onCancel }) => (
        <>
           
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
                <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                  
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="bg-white bg-opacity-20 p-1.5 rounded-lg">
                                    <FaPlus className="text-white text-sm" />
                                </div>
                                <h2 className="text-base sm:text-lg font-bold text-white">Add New Footer Item</h2>
                            </div>
                            <button 
                                onClick={onCancel}
                                className="text-white hover:text-gray-200 p-1.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
                            >
                                <FaTimes className="text-sm" />
                            </button>
                        </div>
                    </div>

                   
                    <form onSubmit={onSave} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-gray-700">Footer Label</label>
                                <input 
                                    name="label" 
                                    type="text" 
                                    placeholder="e.g., Privacy Policy, Terms" 
                                    className="w-full p-2.5 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm" 
                                    required 
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-gray-700">Item Type</label>
                                <select 
                                    name="type" 
                                    defaultValue="Page"
                                    className="w-full p-2.5 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                                >
                                    <option value="Page">📄 Page</option>
                                    <option value="Category">📁 Category</option>
                                    <option value="Custom Link">🌐 Custom Link</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <label className="block text-xs font-semibold text-gray-700">URL/Link</label>
                            <input 
                                name="url" 
                                type="text" 
                                placeholder="e.g., /privacy, https://example.com" 
                                className="w-full p-2.5 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm" 
                                required 
                            />
                        </div>

                      
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4 border-t border-gray-200">
                            <button 
                                type="button" 
                                onClick={onCancel} 
                                className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 text-sm"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-sm"
                            >
                                <FaSave className="mr-1.5 text-xs" />
                                Add Footer Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

    
    const FooterItemForm = ({ item, onSave, onCancel }) => (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10 rounded-xl"></div>
            <form onSubmit={onSave} className="relative bg-white p-3 sm:p-4 rounded-xl border-2 border-indigo-200 shadow-lg">
                <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1.5 rounded-lg mr-2">
                        <FaPencilAlt className="text-white text-xs" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">Edit Footer Item</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">Label</label>
                        <input 
                            name="label" 
                            type="text" 
                            defaultValue={item?.label} 
                            placeholder="e.g., Privacy Policy" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm" 
                            required 
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">URL</label>
                        <input 
                            name="url" 
                            type="text" 
                            defaultValue={item?.url} 
                            placeholder="e.g., /privacy" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm" 
                            required 
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">Type</label>
                        <select 
                            name="type" 
                            defaultValue={item?.type || 'Page'}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                        >
                            <option value="Page">Page</option>
                            <option value="Category">Category</option>
                            <option value="Custom Link">Custom Link</option>
                        </select>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">Actions</label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-2">
                            <button 
                                type="submit" 
                                className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 text-sm"
                            >
                                <FaSave className="mr-1.5 text-xs" />
                                Save
                            </button>
                            <button 
                                type="button" 
                                onClick={onCancel} 
                                className="flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-2 px-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 text-sm"
                            >
                                <FaTimes className="mr-1.5 text-xs" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto p-3 sm:p-4 max-w-6xl">
                
                <header className="mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4">
                        <div className="flex flex-col space-y-3">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg">
                                    <FaSitemap className="text-lg sm:text-xl text-white" />
                                </div>
                                <div className="flex-grow">
                                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        Menu Builder (footer) 
                                    </h1>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage your website's footer navigation links</p>
                                </div>
                              
                                {!editingItem && (
                                    <button 
                                        onClick={() => setIsAdding(true)} 
                                        className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 sm:px-5 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
                                    >
                                        <FaPlus className="mr-1.5 text-xs" /> 
                                        Add Footer Item
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

               
                {isAdding && (
                    <AddFooterModal 
                        onSave={handleSaveNewItem} 
                        onCancel={() => setIsAdding(false)} 
                    />
                )}

                {/* Main Content */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-3 sm:p-4">
                       
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4 border border-blue-200">
                            <div className="flex items-center text-blue-700">
                                <FaGripVertical className="mr-2 text-blue-500 flex-shrink-0 text-sm" />
                                <p className="text-xs sm:text-sm font-medium">Drag and drop the menu items below to re-arrange them.</p>
                            </div>
                        </div>

                        {/* Footer Items */}
                        <div className="space-y-2.5 sm:space-y-3">
                            {sortedFooterItems.map((item, index) => (
                                editingItem?.id === item.id ? (
                                    <FooterItemForm 
                                        key={item.id} 
                                        item={item} 
                                        onSave={handleUpdateItem} 
                                        onCancel={() => setEditingItem(null)} 
                                    />
                                ) : (
                                    <div 
                                        key={item.id}
                                        className="group relative bg-gradient-to-r from-gray-50 to-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border-2 border-gray-200 cursor-move hover:border-indigo-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, item)}
                                    >
                                       
                                        <div className="absolute -left-1 -top-1 sm:-left-1.5 sm:-top-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                                            {index + 1}
                                        </div>
                                        
                                        {/* Mobile Layout */}
                                        <div className="block sm:hidden space-y-2">
                                            <div className="flex items-center space-x-2.5">
                                                <FaGripVertical className="text-gray-400 group-hover:text-indigo-500 transition-colors duration-200 flex-shrink-0 text-sm" />
                                                {getTypeIcon(item.type)}
                                                <div className="flex-grow min-w-0">
                                                    <p className="font-semibold text-gray-800 text-sm truncate">{item.label}</p>
                                                    <div className="flex items-center text-xs text-gray-600">
                                                        <FaLink className="mr-1.5 text-indigo-500 flex-shrink-0 text-xs" />
                                                        <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs truncate">{item.url}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getTypeBadgeClass(item.type)}`}>
                                                    {item.type}
                                                </span>
                                                
                                                {/* Edit and Delete Buttons for Mobile */}
                                                <div className="flex items-center space-x-2">
                                                    <button 
                                                        onClick={() => setEditingItem(item)} 
                                                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs"
                                                        title="Edit item"
                                                    >
                                                        <FaEdit className="mr-1 text-xs" />
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)} 
                                                        className="flex items-center bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs"
                                                        title="Delete item"
                                                    >
                                                        <FaTrashAlt className="mr-1 text-xs" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className="hidden sm:flex items-center">
                                            <div className="flex items-center space-x-3 flex-grow">
                                                <FaGripVertical className="text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                                                
                                                <div className="flex items-center space-x-2.5">
                                                    {getTypeIcon(item.type)}
                                                    <div>
                                                        <p className="font-semibold text-gray-800 text-base">{item.label}</p>
                                                        <div className="flex items-center text-xs text-gray-600">
                                                            <FaLink className="mr-1.5 text-indigo-500" />
                                                            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">{item.url}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3">
                                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getTypeBadgeClass(item.type)}`}>
                                                    {item.type}
                                                </span>
                                                
                                                {/* Edit and Delete Buttons for Desktop */}
                                                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button 
                                                        onClick={() => setEditingItem(item)} 
                                                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs"
                                                        title="Edit item"
                                                    >
                                                        <FaEdit className="mr-1 text-xs" />
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)} 
                                                        className="flex items-center bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs"
                                                        title="Delete item"
                                                    >
                                                        <FaTrashAlt className="mr-1 text-xs" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                            
                            {sortedFooterItems.length === 0 && (
                                <div className="text-center py-6 sm:py-8">
                                    <div className="bg-gray-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3">
                                        <FaSitemap className="text-gray-400 text-lg sm:text-xl" />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-600 mb-1">No footer items yet</h3>
                                    <p className="text-xs sm:text-sm text-gray-500">Add your first footer item to get started</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminFooterMenu;
