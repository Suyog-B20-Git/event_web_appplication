
import React from 'react';
import { FaArrowLeft, FaEdit, FaCalendarAlt, FaUser, FaGlobe, FaInfoCircle } from 'react-icons/fa';

// Custom CSS for WYSIWYG content display
const wysiwygStyles = `
  .wysiwyg-content {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #374151;
  }
  
  .wysiwyg-content h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin: 1.5rem 0 1rem 0;
    color: #111827;
  }
  
  .wysiwyg-content h2 {
    font-size: 1.875rem;
    font-weight: 600;
    margin: 1.25rem 0 0.75rem 0;
    color: #111827;
  }
  
  .wysiwyg-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
    color: #111827;
  }
  
  .wysiwyg-content h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0.75rem 0 0.5rem 0;
    color: #111827;
  }
  
  .wysiwyg-content h5 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0.5rem 0 0.25rem 0;
    color: #111827;
  }
  
  .wysiwyg-content h6 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem 0 0.25rem 0;
    color: #111827;
  }
  
  .wysiwyg-content p {
    margin: 0 0 1rem 0;
    line-height: 1.7;
  }
  
  .wysiwyg-content ul,
  .wysiwyg-content ol {
    margin: 0 0 1rem 0;
    padding-left: 2rem;
    list-style: disc outside !important;
  }
  
  .wysiwyg-content ul {
    list-style-type: disc !important;
  }
  
  .wysiwyg-content ol {
    list-style-type: decimal !important;
  }
  
  .wysiwyg-content li {
    margin: 0.25rem 0;
    line-height: 1.6;
    display: list-item !important;
  }
  
  .wysiwyg-content ul li {
    list-style-type: disc !important;
  }
  
  .wysiwyg-content ol li {
    list-style-type: decimal !important;
  }
  
  .wysiwyg-content blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #6b7280;
  }
  
  .wysiwyg-content a {
    color: #3b82f6;
    text-decoration: underline;
  }
  
  .wysiwyg-content a:hover {
    color: #2563eb;
  }
  
  .wysiwyg-content strong {
    font-weight: 600;
  }
  
  .wysiwyg-content em {
    font-style: italic;
  }
  
  .wysiwyg-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  .wysiwyg-content table th,
  .wysiwyg-content table td {
    border: 1px solid #d1d5db;
    padding: 0.5rem;
    text-align: left;
  }
  
  .wysiwyg-content table th {
    background-color: #f9fafb;
    font-weight: 600;
  }
  
  .wysiwyg-content img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
    border-radius: 0.375rem;
  }
  
  .wysiwyg-content code {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
  }
  
  .wysiwyg-content pre {
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 0.375rem;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .wysiwyg-content pre code {
    background: none;
    padding: 0;
  }
  
  /* Force list styles to be visible */
  .wysiwyg-content ul,
  .wysiwyg-content ol {
    list-style-position: outside !important;
    list-style-image: none !important;
  }
  
  /* Override any conflicting styles */
  .wysiwyg-content * {
    list-style: inherit !important;
  }
  
  /* Ensure list items are properly displayed */
  .wysiwyg-content li::marker {
    color: #374151 !important;
    font-weight: normal !important;
  }
  
  /* Fix for nested lists */
  .wysiwyg-content ul ul {
    list-style-type: circle !important;
  }
  
  .wysiwyg-content ul ul ul {
    list-style-type: square !important;
  }
  
  .wysiwyg-content ol ol {
    list-style-type: lower-alpha !important;
  }
  
  .wysiwyg-content ol ol ol {
    list-style-type: lower-roman !important;
  }
`;

const AdminViewPage = ({ page, onBack, onEdit }) => {
    // Debug: Log the body content to see if it contains lists
    React.useEffect(() => {
        if (page && page.body) {
            console.log('Page body content:', page.body);
            console.log('Contains <ul> tags:', page.body.includes('<ul>'));
            console.log('Contains <li> tags:', page.body.includes('<li>'));
        }
    }, [page]);

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
        <div className="bg-gray-50 min-h-screen">
            {/* Custom WYSIWYG Styles */}
            <style>{wysiwygStyles}</style>

            {/* Header */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="px-6 py-4">
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
                                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 ${page.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {page.isActive ? 'ACTIVE' : 'INACTIVE'}
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
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Page Content - Full Width */}
                    <div className="lg:col-span-3">
                        {/* Excerpt */}
                        {page.excerpt && (
                            <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <FaInfoCircle className="mr-2 text-blue-500" />
                                    Excerpt
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">{page.excerpt}</p>
                            </div>
                        )}

                        {/* Main Page Content */}
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-8">
                                <div
                                    className="wysiwyg-content"
                                    dangerouslySetInnerHTML={{ __html: page.body }}
                                />

                                {/* Debug: Show test bullet points if body is empty */}
                                {(!page.body || page.body.trim() === '') && (
                                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Test Bullet Points (Debug)</h3>
                                        <ul className="wysiwyg-content">
                                            <li>This is a test bullet point</li>
                                            <li>Another test bullet point</li>
                                            <li>Third test bullet point</li>
                                        </ul>
                                        <ol className="wysiwyg-content mt-4">
                                            <li>This is a numbered list item</li>
                                            <li>Another numbered item</li>
                                            <li>Third numbered item</li>
                                        </ol>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Meta Description */}
                        {page.metaDescription && (
                            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Meta Description</h2>
                                <p className="text-gray-700">{page.metaDescription}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Page Details</h2>

                            <div className="space-y-4">
                                <div className="flex items-center text-gray-600">
                                    <FaCalendarAlt className="mr-3 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Created</p>
                                        <p className="text-sm">{new Date(page.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {page.updatedAt && page.updatedAt !== page.createdAt && (
                                    <div className="flex items-center text-gray-600">
                                        <FaCalendarAlt className="mr-3 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium">Updated</p>
                                            <p className="text-sm">{new Date(page.updatedAt).toLocaleDateString()}</p>
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
                                            <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded border">
                                                {page.slug}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500">
                                        Page ID: {page._id}
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
