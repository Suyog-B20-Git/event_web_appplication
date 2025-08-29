import { axiosInstance } from '../../../../../utility/utils.jsx';

export const updateVenue = (venueId, formData) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_VENUE_REQUEST' });

        const response = await axiosInstance.put(`/venue/${venueId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({ type: 'UPDATE_VENUE_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'UPDATE_VENUE_FAILURE', payload: error.response?.data?.message || 'Error updating venue' });
        throw error;
    }
};
