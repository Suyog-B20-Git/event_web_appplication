import axios from "axios";
import { Event } from "../../../Urls";

export const getAllEvents = (params = {}) => {
    return async (dispatch) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `${Event.getAllEvents}${queryString}`;
            const response = await axios.get(url);

            dispatch({
                type: "GET_ALL_EVENTS",
                payload: response.data.events || response.data,
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching all events:", error);
            dispatch({
                type: "GET_ALL_EVENTS_ERROR",
                payload: error.message,
            });
            throw error;
        }
    };
};

export const clearAllEvents = () => ({
    type: "CLEAR_ALL_EVENTS",
});
