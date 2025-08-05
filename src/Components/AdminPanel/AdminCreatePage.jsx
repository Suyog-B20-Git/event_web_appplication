import React, { useState } from 'react';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AdminCreatePage = ({ onNavigate, onPageCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    body: '',
    status: 'INACTIVE',
    slug: '',
    metaDescription: '',
    metaKeywords: '',
    pageImage: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));

   
    if (name === 'title') {

        setTimeout(() => {
            setFormData(currentData => {
                if (!currentData.slug_modified) {
                    const autoSlug = value
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/--+/g, '-')
                        .trim();
                    return { ...currentData, slug: autoSlug };
                }
                return currentData;
            });
        }, 100);
    }
    
   
    if (name === 'slug') {
        setFormData(prev => ({...prev, slug_modified: true}));
    }

 
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.body.trim()) newErrors.body = 'Body is required';
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const newPage = {
      ...formData,
      id: Date.now(),
      
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    if (onPageCreate) onPageCreate(newPage);
    alert('Page created successfully!');
    setIsSubmitting(false);
    if (onNavigate) onNavigate('adminPages');
  };

  const handleCancel = () => {
    const hasChanges = Object.values(formData).some(value => !!value);

    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        if (onNavigate) onNavigate('adminPages');
      }
    } else {
      if (onNavigate) onNavigate('adminPages');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* --- Responsive Header --- */}
      <div className="bg-white shadow-sm border-b w-full">
        <div className="px-4 py-3 flex items-center w-full space-x-4">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-600 hover:text-gray-800"
            type="button"
          >
            <FaArrowLeft className="mr-2" />
            <span className="hidden sm:inline">Back to Pages</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Create New Page</h1>
        </div>
      </div>

      {/* --- Form Section with Responsive Padding --- */}
      <div className="w-full px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Page title"
              />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="A short summary of the page"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body *</label>
              <div className={`border rounded-md bg-white ${errors.body ? 'border-red-500' : 'border-gray-300'}`}>
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.body}
                  config={{ removePlugins: ['CKBox', 'EasyImage', 'MediaEmbedToolbar'] }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setFormData((prev) => ({ ...prev, body: data }));
                    if (errors.body) setErrors(prev => ({...prev, body: ''}));
                  }}
                />
              </div>
              {errors.body && <p className="text-sm text-red-600 mt-1">{errors.body}</p>}
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input
                id="slug"
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.slug ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="page-url-slug"
              />
              <p className="text-xs text-gray-500 mt-1">Only lowercase letters, numbers, and hyphens allowed.</p>
              {errors.slug && <p className="text-sm text-red-600 mt-1">{errors.slug}</p>}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">SEO Settings</h2>
                {/* Meta Description */}
                <div>
                    <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <input
                        id="metaDescription"
                        type="text"
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Meta description for SEO"
                    />
                </div>

                {/* Meta Keywords */}
                <div>
                    <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                    <input
                        id="metaKeywords"
                        type="text"
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="comma, separated, keywords"
                    />
                </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            {/* Page Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              <input
                type="file"
                name="pageImage"
                accept="image/*"
                onChange={handleInputChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.pageImage && (
                <p className="mt-2 text-sm text-gray-600 flex items-center">
                    Selected: {formData.pageImage.name}
                </p>
              )}
            </div>

            {/* --- Responsive Action Buttons --- */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium disabled:opacity-50"
                disabled={isSubmitting}
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Page'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePage;