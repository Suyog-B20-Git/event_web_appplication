import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

// Action Types
export const DELETE_PAGE_REQUEST = 'DELETE_PAGE_REQUEST';
export const DELETE_PAGE_SUCCESS = 'DELETE_PAGE_SUCCESS';
export const DELETE_PAGE_FAILURE = 'DELETE_PAGE_FAILURE';

// Action Creators
export const deletePageRequest = () => ({
    type: DELETE_PAGE_REQUEST
});

export const deletePageSuccess = (pageId) => ({
    type: DELETE_PAGE_SUCCESS,
    payload: pageId
});

export const deletePageFailure = (error) => ({
    type: DELETE_PAGE_FAILURE,
    payload: error
});

// Async Action Creator
export const deletePage = (pageId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(deletePageRequest());

            // Get token from localStorage
            const authToken = localStorage.getItem("authToken");
            const isLogin = JSON.parse(localStorage.getItem("isLogin"));

            if (!authToken || !isLogin) {
                throw new Error('Authentication token not found');
            }

            const response = await axiosInstance.delete(`/pages/${pageId}`);

            if (!response.data.status) {
                throw new Error(response.data.message || "Page deletion failed");
            }

            toast.success(response.data.message || "Page deleted successfully", {
                transition: Zoom,
                hideProgressBar: true,
                autoClose: 2000,
            });

            dispatch(deletePageSuccess(pageId));
            return { success: true };

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to delete page';
            dispatch(deletePageFailure(errorMessage));

            toast.error(errorMessage, {
                transition: Zoom,
                hideProgressBar: false,
                autoClose: 2000,
            });

            return { success: false, error: errorMessage };
        }
    };
};

// Bulk Delete Action
export const bulkDeletePages = (pageIds) => {
    return async (dispatch, getState) => {
        try {
            dispatch(deletePageRequest());

            // Get token from localStorage
            const authToken = localStorage.getItem("authToken");
            const isLogin = JSON.parse(localStorage.getItem("isLogin"));

            if (!authToken || !isLogin) {
                throw new Error('Authentication token not found');
            }

            const response = await axiosInstance.post('/pages/bulk-delete', { pageIds });

            if (!response.data.status) {
                throw new Error(response.data.message || "Bulk deletion failed");
            }

            toast.success(response.data.message || `${response.data.data.deletedCount} pages deleted successfully`, {
                transition: Zoom,
                hideProgressBar: true,
                autoClose: 2000,
            });

            // Dispatch success for each deleted page
            pageIds.forEach(pageId => {
                dispatch(deletePageSuccess(pageId));
            });

            return { success: true, deletedCount: response.data.data.deletedCount };

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to delete pages';
            dispatch(deletePageFailure(errorMessage));

            toast.error(errorMessage, {
                transition: Zoom,
                hideProgressBar: false,
                autoClose: 2000,
            });

            return { success: false, error: errorMessage };
        }
    };
}; 