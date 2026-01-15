import { axiosInstance } from '../../../../../utility/utils.jsx';

export const getAllPerformersAdmin = (params = {}) => async () => {
    try {
        const { page = 1, limit = 10, name, categories, city, state, isEnabled } = params;

        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('limit', limit);

        if (name) queryParams.append('name', name);
        if (categories) queryParams.append('categories', categories);
        if (city) queryParams.append('city', city);
        if (state) queryParams.append('state', state);
        if (typeof isEnabled === 'boolean') queryParams.append('isEnabled', String(isEnabled));

        const response = await axiosInstance.get(`/performer?${queryParams.toString()}`);

        return {
            performers: response.data.performers || [],
            pagination: {
                currentPage: response.data.page || 1,
                totalPages: response.data.totalPages || 1,
                totalPerformers: response.data.totalPerformers || 0,
                hasNextPage: (response.data.page || 1) < (response.data.totalPages || 1),
                hasPrevPage: (response.data.page || 1) > 1,
                limit: response.data.limit || limit
            }
        };
    } catch (error) {
        console.error('Error fetching performers:', error);
        throw error;
    }
};


