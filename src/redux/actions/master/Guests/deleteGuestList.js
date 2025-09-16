import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";

export const deleteGuestList = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "DELETE_GUEST_LIST_REQUEST" });

            const response = await axiosInstance.delete(`/guest-lists/${id}`);

            dispatch({
                type: "DELETE_GUEST_LIST_SUCCESS",
                payload: id,
            });

            toast.success(response.data.message || "Guest list deleted successfully");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete guest list";
            dispatch({
                type: "DELETE_GUEST_LIST_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};
