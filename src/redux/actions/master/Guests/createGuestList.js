import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";

export const createGuestList = (guestListData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "CREATE_GUEST_LIST_REQUEST" });

            const response = await axiosInstance.post("/guest-lists", guestListData);

            dispatch({
                type: "CREATE_GUEST_LIST_SUCCESS",
                payload: response.data.guestList,
            });

            toast.success(response.data.message || "Guest list created successfully");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to create guest list";
            dispatch({
                type: "CREATE_GUEST_LIST_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};
