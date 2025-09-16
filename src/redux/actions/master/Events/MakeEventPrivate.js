import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

export const makeEventPrivate = (eventId) => {
    const authToken = localStorage.getItem("authToken");
    return async (dispatch) => {
        try {
            const response = await axiosInstance.put(`/event/${eventId}/private`, {}, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            // Check for successful response (200 OK)
            if (response.status === 200) {
                if (response.data.status) {
                    toast.success(response.data.message || "Event made private successfully");
                    dispatch({ type: "MAKE_EVENT_PRIVATE", event: response.data.event });
                    return response.data;
                } else {
                    toast.error(response.data.message || "Failed to make event private");
                    throw new Error(response.data.message);
                }
            } else {
                toast.error("Failed to make event private");
                throw new Error("Failed to make event private");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(errorMessage);
            throw error;
        }
    };
}; 