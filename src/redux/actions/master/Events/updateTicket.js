import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Event } from "../../../Urls";

export const postTicketData = (ticketData) => async (dispatch) => {
  try {
    dispatch({ type: "POST_TICKET_REQUEST" });

    const response = await axiosInstance.post(Event.updateTicket, ticketData);

    if (!response.data.status) {
      throw new Error(response.data.message || "Ticket creation failed");
      console.error("Ticket POST error:", error.response?.data); 

    }

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
