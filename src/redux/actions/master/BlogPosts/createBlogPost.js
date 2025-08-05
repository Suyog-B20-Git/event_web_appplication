import { axiosInstance } from '../../../../../utility/utils';
import { toast } from 'react-toastify';
import { Zoom } from 'react-toastify';

export const CREATE_BLOG_POST_REQUEST = 'CREATE_BLOG_POST_REQUEST';
export const CREATE_BLOG_POST_SUCCESS = 'CREATE_BLOG_POST_SUCCESS';
export const CREATE_BLOG_POST_FAILURE = 'CREATE_BLOG_POST_FAILURE';

export const createBlogPost = (postData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_BLOG_POST_REQUEST });

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        formData.append('slug', postData.slug);
        formData.append('status', postData.status);
        formData.append('category', postData.category);
        formData.append('isFeatured', postData.isFeatured);
        formData.append('excerpt', postData.excerpt);
        formData.append('additionalFields', postData.additionalFields);
        formData.append('metaDescription', postData.metaDescription);
        formData.append('metaKeywords', postData.metaKeywords);
        formData.append('seoTitle', postData.seoTitle);

        if (postData.image && postData.image instanceof File) {
            formData.append('image', postData.image);
        }

        const response = await axiosInstance.post('/blog/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({
            type: CREATE_BLOG_POST_SUCCESS,
            payload: response.data.data
        });

        toast.success('Blog post created successfully!', {
            transition: Zoom,
            hideProgressBar: false,
            autoClose: 2000,
        });

        return { success: true, data: response.data.data };
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to create blog post';
        dispatch({
            type: CREATE_BLOG_POST_FAILURE,
            payload: message
        });

        toast.error(message, {
            transition: Zoom,
            hideProgressBar: false,
            autoClose: 2000,
        });

        return { success: false, error: message };
    }
}; 