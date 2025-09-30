import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";

export const getGuestLists = (params = {}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_GUEST_LISTS_REQUEST" });

            const queryString = new URLSearchParams(params).toString();
            const url = `/guest-lists${queryString ? `?${queryString}` : ""}`;

            const response = await axiosInstance.get(url);

            dispatch({
                type: "GET_GUEST_LISTS_SUCCESS",
                payload: {
                    guestLists: response.data.guestLists,
                    pagination: {
                        page: response.data.page,
                        limit: response.data.limit,
                        totalPages: response.data.totalPages,
                        totalGuestLists: response.data.totalGuestLists,
                    },
                },
            });

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch guest lists";
            dispatch({
                type: "GET_GUEST_LISTS_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};
