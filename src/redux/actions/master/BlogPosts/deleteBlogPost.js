import { axiosInstance } from '../../../../../utility/utils';
import { toast } from 'react-toastify';
import { Zoom } from 'react-toastify';

export const DELETE_BLOG_POST_REQUEST = 'DELETE_BLOG_POST_REQUEST';
export const DELETE_BLOG_POST_SUCCESS = 'DELETE_BLOG_POST_SUCCESS';
export const DELETE_BLOG_POST_FAILURE = 'DELETE_BLOG_POST_FAILURE';

export const BULK_DELETE_BLOG_POSTS_REQUEST = 'BULK_DELETE_BLOG_POSTS_REQUEST';
export const BULK_DELETE_BLOG_POSTS_SUCCESS = 'BULK_DELETE_BLOG_POSTS_SUCCESS';
export const BULK_DELETE_BLOG_POSTS_FAILURE = 'BULK_DELETE_BLOG_POSTS_FAILURE';

export const deleteBlogPost = (postId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_BLOG_POST_REQUEST });

        const response = await axiosInstance.delete(`/blog/posts/${postId}`);

        dispatch({
            type: DELETE_BLOG_POST_SUCCESS,
            payload: postId
        });

        toast.success('Blog post deleted successfully!', {
            transition: Zoom,
            hideProgressBar: false,
            autoClose: 2000,
        });

        return { success: true };
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete blog post';
        dispatch({
            type: DELETE_BLOG_POST_FAILURE,
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

export const bulkDeleteBlogPosts = (postIds) => async (dispatch, getState) => {
    try {
        dispatch({ type: BULK_DELETE_BLOG_POSTS_REQUEST });

        const response = await axiosInstance.post('/blog/posts/bulk-delete', {
            postIds
        });

        dispatch({
            type: BULK_DELETE_BLOG_POSTS_SUCCESS,
            payload: postIds
        });

        toast.success(`${postIds.length} blog post(s) deleted successfully!`, {
            transition: Zoom,
            hideProgressBar: false,
            autoClose: 2000,
        });

        return { success: true };
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete blog posts';
        dispatch({
            type: BULK_DELETE_BLOG_POSTS_FAILURE,
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