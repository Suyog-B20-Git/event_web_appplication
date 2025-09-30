import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";

export const getAllGuestsForList = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_ALL_GUESTS_REQUEST" });

            const response = await axiosInstance.get("/guests?limit=0"); // limit=0 to fetch all

            dispatch({
                type: "GET_ALL_GUESTS_SUCCESS",
                payload: response.data.guests,
            });

            return response.data.guests;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch all guests";
            dispatch({
                type: "GET_ALL_GUESTS_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};

export const getGuests = (params = {}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_GUESTS_REQUEST" });

            const queryString = new URLSearchParams(params).toString();
            const url = `/guests${queryString ? `?${queryString}` : ""}`;

            const response = await axiosInstance.get(url);

            dispatch({
                type: "GET_GUESTS_SUCCESS",
                payload: {
                    guests: response.data.guests,
                    pagination: {
                        page: response.data.page,
                        limit: response.data.limit,
                        totalPages: response.data.totalPages,
                        totalGuests: response.data.totalGuests,
                    },
                },
            });

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch guests";
            dispatch({
                type: "GET_GUESTS_FAILURE",
                payload: errorMessage,
            });
            toast.error(errorMessage);
            throw error;
        }
    };
};
