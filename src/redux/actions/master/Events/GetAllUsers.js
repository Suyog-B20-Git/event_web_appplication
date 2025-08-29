import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

export const getAllUsers = (params = {}) => {
    const authToken = localStorage.getItem("authToken");
    return async (dispatch) => {
        try {
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
                    return response.data.data;
                } else {
                    toast.error(response.data.message || "Failed to fetch users");
                    throw new Error(response.data.message);
                }
            } else {
                toast.error("Failed to fetch users");
                throw new Error("Failed to fetch users");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(errorMessage);
            throw error;
        }
    };
}; 