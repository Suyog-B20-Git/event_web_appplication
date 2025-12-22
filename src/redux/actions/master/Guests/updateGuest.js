import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";

export const updateGuest = (id, guestData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "UPDATE_GUEST_REQUEST" });

            const response = await axiosInstance.put(`/guests/${id}`, guestData);

            dispatch({
                type: "UPDATE_GUEST_SUCCESS",
                payload: { id, guest: response.data.guest },
            });

            toast.success(response.data.message || "Guest updated successfully");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update guest";
            dispatch({
                type: "UPDATE_GUEST_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};
