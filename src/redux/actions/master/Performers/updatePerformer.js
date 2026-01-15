import { axiosInstance } from '../../../../../utility/utils.jsx';

export const updatePerformer = (id, formData) => async () => {
    try {
        const response = await axiosInstance.put(`/performer/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating performer:', error);
        throw error;
    }
};


