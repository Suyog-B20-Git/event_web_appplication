import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Organizer } from "../../../Urls";

export const createNewOrganizer = (data) => {
  return () => {
    const token = localStorage.getItem("authToken");
    axiosInstance
      .post(`${Organizer.postOrganizer}`, data, {
        headers: { "Content-Type": "multipart/form-data", 'Authorization': ` ${token}` },
      })
      .then((response) => {
        if (!response.data.status) {
          toast.error(response.data.message, {
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });
        } else {
          toast.success(response.data.message, {
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });

        }
      })

      .catch((error) => {
        toast.error(
          error.response && error.response.data
            ? error.response.data.message
            : "Something went wrong!",
          { transition: Zoom, hideProgressBar: false, autoClose: 2000 }
        );
      });
  };
};
