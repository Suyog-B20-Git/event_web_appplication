import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

export const getAllUsers = (params = {}) => {
    const authToken = localStorage.getItem("authToken");
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_ALL_USERS_REQUEST" });

            // Build query parameters
            const queryParams = new URLSearchParams();

            if (params.page) queryParams.append('page', params.page);
            if (params.limit) queryParams.append('limit', params.limit);
            if (params.search) queryParams.append('search', params.search);
            if (params.role) queryParams.append('role', params.role);
            if (params.status) queryParams.append('status', params.status);

            const response = await axiosInstance.get(`/auth/all-users?${queryParams.toString()}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.status === 200) {
                if (response.data.status) {
                    dispatch({
                        type: "GET_ALL_USERS_SUCCESS",
                        payload: response.data.data
                    });
                    return response.data.data;
                } else {
                    const errorMessage = response.data.message || "Failed to fetch users";
                    dispatch({
                        type: "GET_ALL_USERS_FAILURE",
                        payload: errorMessage
                    });
                    toast.error(errorMessage);
                    throw new Error(errorMessage);
                }
            } else {
                const errorMessage = "Failed to fetch users";
                dispatch({
                    type: "GET_ALL_USERS_FAILURE",
                    payload: errorMessage
                });
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            dispatch({
                type: "GET_ALL_USERS_FAILURE",
                payload: errorMessage
            });
            toast.error(errorMessage);
            throw error;
        }
    };
}; 