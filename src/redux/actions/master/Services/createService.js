import { axiosInstance } from '../../../../../utility/utils.jsx';

export const createService = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_SERVICE_REQUEST' });
        const response = await axiosInstance.post('/services', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        dispatch({ type: 'CREATE_SERVICE_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'CREATE_SERVICE_FAILURE', payload: error.response?.data?.message || 'Error creating service' });
        throw error;
    }
};


