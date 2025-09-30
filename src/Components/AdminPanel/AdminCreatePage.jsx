import React, { useState } from 'react';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../redux/actions/master/pages/createPage';
import { updatePage } from '../../redux/actions/master/pages/updatePage';

// Custom CSS for CKEditor
const ckEditorStyles = `
  .ck-editor__editable {
    min-height: 250px !important;
    max-height: 500px !important;
    overflow-y: auto !important;
    padding: 1.5rem !important;
    margin: 0 !important;
  }
  
  .ck.ck-editor {
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .ck.ck-editor__main {
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .ck.ck-editor__editable {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
  }
  
  .ck.ck-toolbar {
    border-radius: 0.375rem 0.375rem 0 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .ck.ck-editor__editable {
    border-radius: 0 0 0.375rem 0.375rem !important;
  }
  
  /* Fix for content being hidden */
  .ck.ck-editor__editable_inline {
    padding: 1.5rem !important;
    margin: 0 !important;
  }
  
  /* Ensure proper container sizing */
  .ck.ck-editor__main > .ck-editor__editable {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }
  
  /* Fix for bullet points and lists being cut off */
  .ck.ck-editor__editable ul,
  .ck.ck-editor__editable ol {
    padding-left: 2rem !important;
    margin-left: 0 !important;
  }
  
  .ck.ck-editor__editable ul li,
  .ck.ck-editor__editable ol li {
    padding-left: 0.5rem !important;
  }
  
  /* Ensure content doesn't get cut off */
  .ck.ck-editor__editable * {
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  
  /* Fix for any inline elements */
  .ck.ck-editor__editable p,
  .ck.ck-editor__editable div,
  .ck.ck-editor__editable h1,
  .ck.ck-editor__editable h2,
  .ck.ck-editor__editable h3,
  .ck.ck-editor__editable h4,
  .ck.ck-editor__editable h5,
  .ck.ck-editor__editable h6 {
    margin: 0 0 0.5rem 0 !important;
    padding: 0 !important;
  }
  
  /* Ensure toolbar doesn't interfere */
  .ck.ck-toolbar__items {
    padding: 0 0.5rem !important;
  }
  
  /* Fix for any remaining content cutoff */
  .ck.ck-editor__editable {
    position: relative !important;
    left: 0 !important;
    right: 0 !important;
  }
`;

const AdminCreatePage = ({ onNavigate, onPageCreate, pageData = null, isEdit = false }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.createPage || {});

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    body: '',
    isActive: false,
    slug: '',
    metaDescription: '',
    metaKeywords: '',
    pageImage: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form data when editing
  React.useEffect(() => {
    if (isEdit && pageData) {
      setFormData({
        title: pageData.title || '',
        excerpt: pageData.excerpt || '',
        body: pageData.body || '',
        isActive: pageData.isActive || false,
        slug: pageData.slug || '',
        metaDescription: pageData.metaDescription || '',
        metaKeywords: pageData.metaKeywords || '',
        pageImage: pageData.pageImage || null
      });
    }
  }, [isEdit, pageData]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file upload
      const file = files[0];
      if (file) {
        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
          alert('File size must be less than 2MB');
          return;
        }
        setFormData((prev) => ({
          ...prev,
          [name]: file
        }));
      }
    } else {
      // Handle other form fields
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }


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
      setFormData(prev => ({ ...prev, slug_modified: true }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      let result;
      if (isEdit && pageData) {
        result = await dispatch(updatePage(pageData._id, formData));
      } else {
        result = await dispatch(createPage(formData));
      }

      if (result.success) {
        if (onNavigate) onNavigate('adminPages');
      } else if (result.error && result.error.includes('Duplicate slug')) {
        // Set slug-specific error
        setErrors(prev => ({
          ...prev,
          slug: 'This slug is already in use. Please choose a different one.'
        }));
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} page:`, error);
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Custom CKEditor Styles */}
      <style>{ckEditorStyles}</style>

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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{isEdit ? 'Edit Page' : 'Create New Page'}</h1>
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
              <div className={`border bg-white overflow-hidden ${errors.body ? 'border-red-500' : 'border-gray-300'}`}>
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.body}
                  config={{
                    removePlugins: ['CKBox', 'EasyImage', 'MediaEmbedToolbar'],
                    toolbar: {
                      items: [
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
                      ]
                    }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setFormData((prev) => ({ ...prev, body: data }));
                    if (errors.body) setErrors(prev => ({ ...prev, body: '' }));
                  }}
                  onReady={(editor) => {
                    // Fix CKEditor styling issues
                    const editorElement = editor.ui.view.element;
                    if (editorElement) {
                      editorElement.style.width = '100%';
                      editorElement.style.minHeight = '300px';
                    }

                    // Fix the editor content area
                    const contentElement = editor.ui.view.element.querySelector('.ck-editor__editable');
                    if (contentElement) {
                      contentElement.style.padding = '1.5rem';
                      contentElement.style.minHeight = '250px';
                      contentElement.style.maxHeight = '500px';
                      contentElement.style.overflowY = 'auto';
                      contentElement.style.overflowX = 'hidden';
                    }
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
                name="isActive"
                value={formData.isActive}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value={true}>ACTIVE</option>
                <option value={false}>INACTIVE</option>
              </select>
            </div>

            {/* Page Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              <div className="space-y-2">
                <input
                  type="file"
                  name="pageImage"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500">Maximum file size: 2MB. Supported formats: JPG, PNG, GIF</p>
                {formData.pageImage && !(formData.pageImage instanceof File) && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pageImage: null }))}
                    className="text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Remove Current Image
                  </button>
                )}
              </div>
              {formData.pageImage && (
                <div className="mt-2">
                  {formData.pageImage instanceof File ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 flex items-center">
                        Selected: {formData.pageImage.name}
                      </p>
                      <img
                        src={URL.createObjectURL(formData.pageImage)}
                        alt="Selected page image"
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Current Image:</p>
                      <img
                        src={formData.pageImage}
                        alt="Current page image"
                        className="w-32 h-32 object-cover rounded-md border"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <p className="text-xs text-gray-500" style={{ display: 'none' }}>
                        Image failed to load
                      </p>
                    </div>
                  )}
                </div>
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
                disabled={isSubmitting || loading}
              >
                <FaSave className="mr-2" />
                {isSubmitting || loading ? 'Saving...' : (isEdit ? 'Update Page' : 'Save Page')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePage;