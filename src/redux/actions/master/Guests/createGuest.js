import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";

export const createGuest = (guestData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "CREATE_GUEST_REQUEST" });

            const response = await axiosInstance.post("/guests", guestData);

            dispatch({
                type: "CREATE_GUEST_SUCCESS",
                payload: response.data.guest,
            });

            toast.success(response.data.message || "Guest created successfully");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to create guest";
            dispatch({
                type: "CREATE_GUEST_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};
