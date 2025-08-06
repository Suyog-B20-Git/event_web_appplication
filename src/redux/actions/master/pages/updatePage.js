import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

// Action Types
export const UPDATE_PAGE_REQUEST = 'UPDATE_PAGE_REQUEST';
export const UPDATE_PAGE_SUCCESS = 'UPDATE_PAGE_SUCCESS';
export const UPDATE_PAGE_FAILURE = 'UPDATE_PAGE_FAILURE';

// Action Creators
export const updatePageRequest = () => ({
    type: UPDATE_PAGE_REQUEST
});

export const updatePageSuccess = (page) => ({
    type: UPDATE_PAGE_SUCCESS,
    payload: page
});

export const updatePageFailure = (error) => ({
    type: UPDATE_PAGE_FAILURE,
    payload: error
});

// Async Action Creator
export const updatePage = (pageId, pageData) => {
    return async (dispatch, getState) => {
        try {
            dispatch(updatePageRequest());

            // Get token from localStorage
            const authToken = localStorage.getItem("authToken");
            const isLogin = JSON.parse(localStorage.getItem("isLogin"));

            if (!authToken || !isLogin) {
                throw new Error('Authentication token not found');
            }

            // Create FormData for file upload
            const formData = new FormData();

            // Append all form fields
            Object.keys(pageData).forEach(key => {
                if (key === 'pageImage' && pageData[key] instanceof File) {
                    formData.append('pageImage', pageData[key]);
                } else if (key !== 'pageImage') {
                    formData.append(key, pageData[key]);
                }
            });

            const response = await axiosInstance.put(`/pages/${pageId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.data.status) {
                throw new Error(response.data.message || "Page update failed");
            }

            toast.success(response.data.message || "Page updated successfully", {
                transition: Zoom,
                hideProgressBar: true,
                autoClose: 2000,
            });

            dispatch(updatePageSuccess(response.data.data));
            return { success: true, page: response.data.data };

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update page';
            dispatch(updatePageFailure(errorMessage));

            toast.error(errorMessage, {
                transition: Zoom,
                hideProgressBar: false,
                autoClose: 2000,
            });

            return { success: false, error: errorMessage };
        }
    };
}; 