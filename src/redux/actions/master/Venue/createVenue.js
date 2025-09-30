import { axiosInstance } from '../../../../../utility/utils.jsx';

export const createVenue = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_VENUE_REQUEST' });

        const response = await axiosInstance.post('/venue', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({ type: 'CREATE_VENUE_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'CREATE_VENUE_FAILURE', payload: error.response?.data?.message || 'Error creating venue' });
        throw error;
    }
};
