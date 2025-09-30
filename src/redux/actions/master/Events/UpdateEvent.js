import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

export const updateEvent = (eventId, data) => {
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    const authToken = localStorage.getItem("authToken");

    return async (dispatch) => {
        try {
            const response = await axiosInstance.put(`/event/${eventId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (!response.data.status) {
                toast.error(response.data.message || "Event update failed", {
                    transition: Zoom,
                    hideProgressBar: true,
                    autoClose: 2000,
                });
                throw new Error(response.data.message);
            }

            toast.success(response.data.message || "Event updated successfully", {
                transition: Zoom,
                hideProgressBar: true,
                autoClose: 2000,
            });

            if (isLogin) {
                dispatch({ type: "UPDATE_EVENT", event: response.data });
            }

            return response.data;
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong!";
            toast.error(errorMessage, {
                transition: Zoom,
                hideProgressBar: false,
                autoClose: 2000,
            });
            throw error;
        }
    };
}; 