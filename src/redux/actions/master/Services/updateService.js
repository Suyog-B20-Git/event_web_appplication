import { axiosInstance } from '../../../../../utility/utils.jsx';

export const updateService = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_SERVICE_REQUEST' });
        const response = await axiosInstance.put(`/services/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        dispatch({ type: 'UPDATE_SERVICE_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'UPDATE_SERVICE_FAILURE', payload: error.response?.data?.message || 'Error updating service' });
        throw error;
    }
};


