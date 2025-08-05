
import React from 'react';
import { FaArrowLeft, FaEdit, FaCalendarAlt, FaUser, FaGlobe } from 'react-icons/fa';

const AdminViewPage = ({ page, onBack, onEdit }) => {
    if (!page) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">No page data available</p>
                <button 
                    onClick={onBack}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
                >
                    Back to Pages
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onBack}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Pages
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{page.title}</h1>
                            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
                                page.status === 'ACTIVE' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {page.status}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onEdit}
                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <FaEdit className="mr-2" />
                        Edit Page
                    </button>
                </div>
            </div>

          
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Page Content</h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 leading-relaxed">{page.content}</p>
                            </div>
                        </div>

                        {page.metaDescription && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Meta Description</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700">{page.metaDescription}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Page Details</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-600">
                                    <FaCalendarAlt className="mr-3 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Created</p>
                                        <p className="text-sm">{page.createdAt}</p>
                                    </div>
                                </div>

                                {page.updatedAt && page.updatedAt !== page.createdAt && (
                                    <div className="flex items-center text-gray-600">
                                        <FaCalendarAlt className="mr-3 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium">Updated</p>
                                            <p className="text-sm">{page.updatedAt}</p>
                                        </div>
                                    </div>
                                )}

                                {page.author && (
                                    <div className="flex items-center text-gray-600">
                                        <FaUser className="mr-3 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium">Author</p>
                                            <p className="text-sm">{page.author}</p>
                                        </div>
                                    </div>
                                )}

                                {page.slug && (
                                    <div className="flex items-center text-gray-600">
                                        <FaGlobe className="mr-3 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium">Slug</p>
                                            <p className="text-sm font-mono bg-white px-2 py-1 rounded border">
                                                {page.slug}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500">
                                        Page ID: {page.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminViewPage;
