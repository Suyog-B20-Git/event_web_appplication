import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../utility/utils';
import { toast } from 'react-toastify';
import { Zoom } from 'react-toastify';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    });

    useEffect(() => {
        fetchPosts();
    }, [pagination.currentPage]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/blog/posts?page=${pagination.currentPage}&limit=6&status=published`);
            setPosts(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to load blog posts';
            setError(errorMessage);
            console.error('Error fetching posts:', error);

            toast.error(errorMessage, {
                transition: Zoom,
                hideProgressBar: false,
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading blog posts...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Don't show error screen - let toast handle it
    // Just show empty state if no posts and not loading

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover insights, tips, and stories from our community of event organizers and attendees.
                    </p>
                </div>

                {/* Blog Posts Grid */}
                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {posts.map((post) => (
                            <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                {/* Post Image */}
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        src={post.image || "https://placehold.co/600x400/f8b4b4/333?text=Blog+Post"}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>

                                {/* Post Content */}
                                <div className="p-6">
                                    {/* Category */}
                                    <div className="mb-3">
                                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                            {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="hover:text-blue-600 transition-colors"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {/* Excerpt */}
                                    {post.excerpt && (
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {truncateText(post.excerpt, 120)}
                                        </p>
                                    )}

                                    {/* Meta Information */}
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <span>{formatDate(post.createdAt)}</span>
                                            {post.visits > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span>{post.visits} visits</span>
                                                </>
                                            )}
                                        </div>
                                        {post.isFeatured && (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Read More Button */}
                                    <div className="mt-4">
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                                        >
                                            Read More
                                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex justify-center">
                        <nav className="flex items-center space-x-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                                disabled={pagination.currentPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setPagination(prev => ({ ...prev, currentPage: page }))}
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${page === pagination.currentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList; 