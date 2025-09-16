import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { axiosInstance } from '../../../utility/utils';
import { toast } from 'react-toastify';
import { Zoom } from 'react-toastify';

const BlogPostDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    const fetchPost = useCallback(async () => {
        // Cancel previous request if it exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);
            const response = await axiosInstance.get(`/blog/posts/slug/${slug}`, {
                signal: abortControllerRef.current.signal
            });
            setPost(response.data.data);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
                return; // Request was cancelled
            }
            const errorMessage = error.response?.data?.message || 'Blog post not found';
            setError(errorMessage);
            console.error('Error fetching post:', error);

            toast.error(errorMessage, {
                transition: Zoom,
                hideProgressBar: false,
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        if (slug) {
            fetchPost();
        }

        // Cleanup function to abort request when component unmounts
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchPost]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading blog post...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!post && !loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                        <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
                        <Link
                            to="/blog"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link to="/" className="hover:text-blue-600">Home</Link>
                        </li>
                        <li>
                            <span className="mx-2">/</span>
                        </li>
                        <li>
                            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
                        </li>
                        <li>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-900">{post.title}</li>
                    </ol>
                </nav>

                {/* Article */}
                <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Featured Image */}
                    {post.image && (
                        <div className="w-full h-64 md:h-96">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="p-8">
                        {/* Header */}
                        <header className="mb-8">
                            {/* Category */}
                            <div className="mb-4">
                                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                                    {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                                {post.isFeatured && (
                                    <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {post.title}
                            </h1>

                            {/* Meta Information */}
                            <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-200 pb-4">
                                <div className="flex items-center space-x-4">
                                    <span>{formatDate(post.createdAt)}</span>
                                    {post.author && (
                                        <>
                                            <span>•</span>
                                            <span>By {post.author.name || 'Anonymous'}</span>
                                        </>
                                    )}
                                    {post.visits > 0 && (
                                        <>
                                            <span>•</span>
                                            <span>{post.visits} visits</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </header>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <div className="mb-8">
                                <div
                                    className="text-lg text-gray-600 leading-relaxed italic blog-content"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="blog-content">
                            <div
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>

                        {/* Additional Fields */}
                        {post.additionalFields && (
                            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                                <div
                                    dangerouslySetInnerHTML={{ __html: post.additionalFields }}
                                    className="blog-content text-gray-700"
                                />
                            </div>
                        )}

                        {/* Footer */}
                        <footer className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Last updated: {formatDate(post.updatedAt)}
                                </div>
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to Blog
                                </Link>
                            </div>
                        </footer>
                    </div>
                </article>

                {/* Related Posts Section (if needed) */}
                {/* You can add related posts functionality here */}
            </div>
        </div>
    );
};

export default BlogPostDetail; 