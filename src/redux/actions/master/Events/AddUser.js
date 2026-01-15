import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

export const addUser = (userData) => {
    const authToken = localStorage.getItem("authToken");
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post(`/auth/add-user`, userData, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            // Check for successful response (201 Created)
            if (response.status === 201) {
                if (response.data.status) {
                    toast.success(response.data.message || "User created successfully");
                    return response.data;
                } else {
                    toast.error(response.data.message || "Failed to create user");
                    throw new Error(response.data.message);
                }
            } else {
                toast.error("Failed to create user");
                throw new Error("Failed to create user");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(errorMessage);
            throw error;
        }
    };
}; 