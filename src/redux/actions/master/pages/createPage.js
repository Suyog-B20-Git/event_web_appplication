import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

// Action Types
export const CREATE_PAGE_REQUEST = 'CREATE_PAGE_REQUEST';
export const CREATE_PAGE_SUCCESS = 'CREATE_PAGE_SUCCESS';
export const CREATE_PAGE_FAILURE = 'CREATE_PAGE_FAILURE';

// Action Creators
export const createPageRequest = () => ({
    type: CREATE_PAGE_REQUEST
});

export const createPageSuccess = (page) => ({
    type: CREATE_PAGE_SUCCESS,
    payload: page
});

export const createPageFailure = (error) => ({
    type: CREATE_PAGE_FAILURE,
    payload: error
});

// Async Action Creator
export const createPage = (pageData) => {
    return async (dispatch, getState) => {
        try {
            dispatch(createPageRequest());

            // Get token from localStorage
            const authToken = localStorage.getItem("authToken");
            const isLogin = JSON.parse(localStorage.getItem("isLogin"));

            if (!authToken || !isLogin) {
                throw new Error('Authentication token not found');
            }

            const response = await axiosInstance.post('/pages', pageData);

            if (!response.data.status) {
                throw new Error(response.data.message || "Page creation failed");
            }

            toast.success(response.data.message || "Page created successfully", {
                transition: Zoom,
                hideProgressBar: true,
                autoClose: 2000,
            });

            dispatch(createPageSuccess(response.data.data));
            return { success: true, page: response.data.data };

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create page';
            dispatch(createPageFailure(errorMessage));

            toast.error(errorMessage, {
                transition: Zoom,
                hideProgressBar: false,
                autoClose: 2000,
            });

            return { success: false, error: errorMessage };
        }
    };
}; 