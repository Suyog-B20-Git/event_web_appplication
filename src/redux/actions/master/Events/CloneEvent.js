import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

export const cloneEvent = (eventId) => {
    const authToken = localStorage.getItem("authToken");
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post(`/event/${eventId}/clone`, {}, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            // Check for successful response (201 Created or 200 OK)
            if (response.status === 201 || response.status === 200) {
                if (response.data.status) {
                    toast.success(response.data.message || "Event cloned successfully");
                    dispatch({ type: "CLONE_EVENT", event: response.data.event });
                    return response.data;
                } else {
                    toast.error(response.data.message || "Event clone failed");
                    throw new Error(response.data.message);
                }
            } else {
                toast.error("Event clone failed");
                throw new Error("Event clone failed");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(errorMessage);
            throw error;
        }
    };
}; 