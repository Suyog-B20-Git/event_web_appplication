import { axiosInstance } from '../../../../../utility/utils.jsx';

export const getCategories = (type) => async (dispatch) => {
    try {
        const queryParams = new URLSearchParams();
        if (type) queryParams.append('type', type);

        const response = await axiosInstance.get(`/categories?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

