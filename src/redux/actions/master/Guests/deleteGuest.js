import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";

export const deleteGuest = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "DELETE_GUEST_REQUEST" });

            const response = await axiosInstance.delete(`/guests/${id}`);

            dispatch({
                type: "DELETE_GUEST_SUCCESS",
                payload: id,
            });

            toast.success(response.data.message || "Guest deleted successfully");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete guest";
            dispatch({
                type: "DELETE_GUEST_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};
