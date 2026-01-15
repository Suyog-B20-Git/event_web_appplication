import { axiosInstance } from '../../../../../utility/utils';
import { toast } from 'react-toastify';
import { Zoom } from 'react-toastify';

export const GET_BLOG_POSTS_REQUEST = 'GET_BLOG_POSTS_REQUEST';
export const GET_BLOG_POSTS_SUCCESS = 'GET_BLOG_POSTS_SUCCESS';
export const GET_BLOG_POSTS_FAILURE = 'GET_BLOG_POSTS_FAILURE';

export const getBlogPosts = (filters = {}) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_BLOG_POSTS_REQUEST });

        // Build query parameters
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.category) params.append('category', filters.category);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page);
        if (filters.limit) params.append('limit', filters.limit);

        const url = `/blog/posts${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await axiosInstance.get(url);

        dispatch({
            type: GET_BLOG_POSTS_SUCCESS,
            payload: response.data.data || []
        });

        return { success: true, data: response.data.data };
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch blog posts';
        dispatch({
            type: GET_BLOG_POSTS_FAILURE,
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