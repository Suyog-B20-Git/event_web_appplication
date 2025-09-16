import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";

export const updateGuestList = (id, guestListData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "UPDATE_GUEST_LIST_REQUEST" });

            const response = await axiosInstance.put(`/guest-lists/${id}`, guestListData);

            dispatch({
                type: "UPDATE_GUEST_LIST_SUCCESS",
                payload: { id, guestList: response.data.guestList },
            });

            toast.success(response.data.message || "Guest list updated successfully");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update guest list";
            dispatch({
                type: "UPDATE_GUEST_LIST_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};
