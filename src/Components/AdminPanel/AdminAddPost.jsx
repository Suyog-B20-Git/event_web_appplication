import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaImage, FaArrowLeft } from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Card = ({ title, children, titleBgColor = '' }) => (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
        {title && (
            <h2 className={`text-lg font-semibold text-white border-b border-gray-200 pb-3 mb-4 px-3 py-2 rounded-t-lg ${titleBgColor}`}>
                {title}
            </h2>
        )}
        {children}
    </div>
);

const InputField = ({ label, name, value, onChange, placeholder = '', type = 'text', helpText = '' }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder = '', rows = 4, helpText = '' }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        ></textarea>
        {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
);

const AdminAddPost = ({ postData = null, isEdit = false, onBack, onPostCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        slug: '',
        status: 'published',
        category: 'business-seminars',
        isFeatured: false,
        image: null,
        excerpt: '',
        additionalFields: '',
        metaDescription: '',
        metaKeywords: '',
        seoTitle: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

  
    useEffect(() => {
        if (isEdit && postData) {
            setFormData({
                title: postData.title || '',
                content: postData.content || '',
                slug: postData.slug || '',
                status: postData.status || 'published',
                category: postData.category || 'business-seminars',
                isFeatured: postData.isFeatured || false,
                image: postData.image || null,
                excerpt: postData.excerpt || '',
                additionalFields: postData.additionalFields || '',
                metaDescription: postData.metaDescription || '',
                metaKeywords: postData.metaKeywords || '',
                seoTitle: postData.seoTitle || ''
            });
        }
    }, [isEdit, postData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData(prevData => ({
            ...prevData,
            content: data
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            
            const postToSave = {
                ...formData,
                id: isEdit ? postData.id : Date.now(), 
                createdAt: isEdit ? postData.createdAt : new Date().toISOString().slice(0, 19).replace('T', ' '),
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };

            console.log(isEdit ? 'Updating post:' : 'Creating post:', postToSave);
            
           
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (onPostCreate) {
                onPostCreate(postToSave);
            }
        } catch (error) {
            console.error('Error saving post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (onBack) {
            onBack();
        }
    };

    return (
        <div className="w-full">
            {/* --- HEADER & BREADCRUMBS --- */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={handleCancel}
                        className="flex items-center justify-center w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                    >
                        <FaArrowLeft className="text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {isEdit ? 'Edit Post' : 'Add Post'}
                    </h1>
                </div>
                <nav className="text-sm text-gray-500 flex items-center">
                    <span>Dashboard</span>
                    <FaChevronRight className="mx-2 w-3 h-3" />
                    <button onClick={handleCancel} className="hover:text-blue-600">Posts</button>
                    <FaChevronRight className="mx-2 w-3 h-3" />
                    <span className="text-gray-800 font-semibold">
                        {isEdit ? 'Edit' : 'Create'}
                    </span>
                </nav>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* --- LEFT COLUMN --- */}
                    <div className="flex-grow">
                        <Card title="Post Title">
                            <InputField 
                                label="The title for your post"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter post title..."
                            />
                        </Card>

                        <Card title="Post Content">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                                <div className="border border-gray-300 rounded-md">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.content}
                                        onChange={handleEditorChange}
                                        config={{
                                            toolbar: [
                                                'heading',
                                                '|',
                                                'bold',
                                                'italic',
                                                'link',
                                                'bulletedList',
                                                'numberedList',
                                                '|',
                                                'outdent',
                                                'indent',
                                                '|',
                                                'imageUpload',
                                                'blockQuote',
                                                'insertTable',
                                                'mediaEmbed',
                                                'undo',
                                                'redo'
                                            ],
                                            placeholder: 'Write your post content here...',
                                            height: '400px'
                                        }}
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card title="Excerpt">
                            <TextareaField
                                label="Post Excerpt"
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                helpText="Small description of the post"
                                placeholder="Brief description of your post..."
                            />
                        </Card>
                        
                        <Card title="Additional Fields">
                            <TextareaField
                                label="Additional Content"
                                name="additionalFields"
                                value={formData.additionalFields}
                                onChange={handleChange}
                                placeholder="Any additional information..."
                            />
                        </Card>
                    </div>

                    {/* --- RIGHT COLUMN (SIDEBAR) --- */}
                    <div className="lg:w-96 flex-shrink-0">
                        <Card title="Post Details" titleBgColor="bg-orange-500">
                            <InputField 
                                label="URL Slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="url-friendly-slug"
                                helpText="URL-friendly version of the title"
                            />
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-1">Post Status</label>
                                <select 
                                    id="status" 
                                    name="status" 
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Post Category</label>
                                <select 
                                    id="category" 
                                    name="category" 
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="business-seminars">Business & Seminars</option>
                                    <option value="technology">Technology</option>
                                    <option value="travel">Travel</option>
                                    <option value="lifestyle">Lifestyle</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <input 
                                    type="checkbox"
                                    id="isFeatured"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="isFeatured" className="ml-2 block text-sm font-semibold text-gray-700">Featured Post</label>
                            </div>
                        </Card>
                        
                        <Card title="Post Image" titleBgColor="bg-blue-500">
                            <div className="mb-4">
                                <label htmlFor="postImage" className="w-full cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md px-3 py-8 text-sm text-center block transition-colors">
                                    <FaImage className="mx-auto mb-2 text-gray-400 text-2xl" />
                                    <span className="text-gray-600">Choose Image File</span>
                                </label>
                                <input 
                                    type="file" 
                                    id="postImage" 
                                    name="image" 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                    accept="image/*"
                                />
                                {formData.image && (
                                    <div className="mt-2 p-2 bg-green-50 rounded-md">
                                        <p className="text-xs text-green-700">
                                            Selected: {typeof formData.image === 'string' ? formData.image : formData.image.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Card>
                        
                        <Card title="SEO Content">
                            <TextareaField 
                                label="Meta Description"
                                name="metaDescription"
                                value={formData.metaDescription}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Brief description for search engines..."
                                helpText="Recommended: 150-160 characters"
                            />
                            <InputField 
                                label="Meta Keywords"
                                name="metaKeywords"
                                value={formData.metaKeywords}
                                onChange={handleChange}
                                placeholder="keyword1, keyword2, keyword3"
                                helpText="Comma-separated keywords"
                            />
                            <InputField 
                                label="SEO Title"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                                placeholder="SEO optimized title..."
                                helpText="Title that appears in search results"
                            />
                        </Card>
                        
                        <div className="flex gap-3">
                            <button 
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md"
                            >
                                {isSubmitting ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Post' : 'Create Post')}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminAddPost;
