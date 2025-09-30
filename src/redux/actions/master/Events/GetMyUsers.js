import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

export const getMyUsers = (params = {}) => {
    const authToken = localStorage.getItem("authToken");
    return async (dispatch) => {
        try {
            // Build query parameters
            const queryParams = new URLSearchParams();
            if (params.role) queryParams.append('role', params.role);
            if (params.page) queryParams.append('page', params.page);
            if (params.limit) queryParams.append('limit', params.limit);

            const response = await axiosInstance.get(`/auth/my-users?${queryParams}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.status === 200 && response.data.status) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || "Failed to fetch users");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(errorMessage);
            throw error;
        }
    };
}; 