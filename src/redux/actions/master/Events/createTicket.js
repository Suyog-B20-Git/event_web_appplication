import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Event } from "../../../Urls";

export const postTicketData = (ticketData) => async (dispatch) => {
  try {
    dispatch({ type: "POST_TICKET_REQUEST" });

    const response = await axiosInstance.post(Event.createTicket, ticketData);

    // Check if the response is successful (status 2xx)
    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message || "Ticket created successfully!", {
        transition: Zoom,
        hideProgressBar: true,
        autoClose: 2000,
      });

      dispatch({
        type: "POST_TICKET_SUCCESS",
        payload: response.data,
      });

      return response.data;
    } else {
      throw new Error(response.data.message || "Ticket creation failed");
    }
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

    dispatch({
      type: "POST_TICKET_FAILURE",
      payload: errorMessage,
    });

    throw error;
  }
};

export const getTicketFormatsByEventId = (eventId, page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: "GET_TICKET_FORMATS_REQUEST" });

    const response = await axiosInstance.get(`${Event.getTicketFormatsByEvent}/${eventId}?page=${page}&limit=${limit}`);

    if (response.status >= 200 && response.status < 300) {
      dispatch({
        type: "GET_TICKET_FORMATS_SUCCESS",
        payload: response.data.data,
      });

      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch ticket formats");
    }
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

    dispatch({
      type: "GET_TICKET_FORMATS_FAILURE",
      payload: errorMessage,
    });

    throw error;
  }
};

export const updateTicketFormat = (ticketId, ticketData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_TICKET_FORMAT_REQUEST" });

    const response = await axiosInstance.put(`${Event.updateTicket}/${ticketId}`, ticketData);

    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message || "Ticket format updated successfully!", {
        transition: Zoom,
        hideProgressBar: true,
        autoClose: 2000,
      });

      dispatch({
        type: "UPDATE_TICKET_FORMAT_SUCCESS",
        payload: response.data,
      });

      return response.data;
    } else {
      throw new Error(response.data.message || "Ticket format update failed");
    }
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

    dispatch({
      type: "UPDATE_TICKET_FORMAT_FAILURE",
      payload: errorMessage,
    });

    throw error;
  }
};

export const deleteTicketFormat = (ticketId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_TICKET_FORMAT_REQUEST" });

    const response = await axiosInstance.delete(`${Event.updateTicket}/${ticketId}`);

    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message || "Ticket format deleted successfully!", {
        transition: Zoom,
        hideProgressBar: true,
        autoClose: 2000,
      });

      dispatch({
        type: "DELETE_TICKET_FORMAT_SUCCESS",
        payload: response.data,
      });

      return response.data;
    } else {
      throw new Error(response.data.message || "Ticket format deletion failed");
    }
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

    dispatch({
      type: "DELETE_TICKET_FORMAT_FAILURE",
      payload: errorMessage,
    });

    throw error;
  }
};

export const updateEventTicketFormatsAndPublish = (eventId, ticketFormatIds, isPublish = false) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_EVENT_TICKET_FORMATS_REQUEST" });

    const response = await axiosInstance.put(Event.updateTicketFormatsAndPublish, {
      event: eventId,
      ticketFormats: ticketFormatIds,
      isPublish: isPublish
    });

    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message || "Event ticket formats updated successfully!", {
        transition: Zoom,
        hideProgressBar: true,
        autoClose: 2000,
      });

      dispatch({
        type: "UPDATE_EVENT_TICKET_FORMATS_SUCCESS",
        payload: response.data,
      });

      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to update event ticket formats");
    }
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

    dispatch({
      type: "UPDATE_EVENT_TICKET_FORMATS_FAILURE",
      payload: errorMessage,
    });

    throw error;
  }
};
