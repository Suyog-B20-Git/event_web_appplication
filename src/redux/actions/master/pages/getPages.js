import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

// Action Types
export const GET_PAGES_REQUEST = 'GET_PAGES_REQUEST';
export const GET_PAGES_SUCCESS = 'GET_PAGES_SUCCESS';
export const GET_PAGES_FAILURE = 'GET_PAGES_FAILURE';

// Action Creators
export const getPagesRequest = () => ({
    type: GET_PAGES_REQUEST
});

export const getPagesSuccess = (pages) => ({
    type: GET_PAGES_SUCCESS,
    payload: pages
});

export const getPagesFailure = (error) => ({
    type: GET_PAGES_FAILURE,
    payload: error
});

// Async Action Creator
export const getPages = (filters = {}) => {
    return async (dispatch, getState) => {
        try {
            dispatch(getPagesRequest());

            // Build query parameters
            const params = new URLSearchParams();
            if (filters.title) params.append('title', filters.title);
            if (filters.isActive !== undefined) params.append('isActive', filters.isActive);

            const url = `/pages${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await axiosInstance.get(url);

            if (!response.data.status) {
                throw new Error(response.data.message || "Failed to fetch pages");
            }

            dispatch(getPagesSuccess(response.data.data));
            return { success: true, pages: response.data.data };

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch pages';
            dispatch(getPagesFailure(errorMessage));

            toast.error(errorMessage, {
                transition: Zoom,
                hideProgressBar: false,
                autoClose: 2000,
            });

            return { success: false, error: errorMessage };
        }
    };
}; 