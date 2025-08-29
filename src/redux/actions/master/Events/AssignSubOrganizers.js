import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

export const assignSubOrganizers = (eventId, data) => {
    const authToken = localStorage.getItem("authToken");
    return async (dispatch) => {
        try {
            console.log('Making API call to assign sub-organizers:', {
                eventId,
                data,
                url: `/event/${eventId}/assign-suborganizers`
            });

            const response = await axiosInstance.put(`/event/${eventId}/assign-suborganizers`, data, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            console.log('API response:', response);

            if (response.status === 200 && response.data.status) {
                toast.success(response.data.message || "Sub-organizers assigned successfully");
                return response.data.data;
            } else {
                const errorMsg = response.data.message || "Failed to assign sub-organizers";
                toast.error(errorMsg);
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error('Error in assignSubOrganizers action:', error);
            console.error('Error response:', error.response);

            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(errorMessage);
            throw error;
        }
    };
}; 