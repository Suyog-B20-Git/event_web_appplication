import { axiosInstance } from '../../../../../utility/utils.jsx';

export const getAllOrganizers = (params = {}) => async (dispatch) => {
    try {
        const { page = 1, limit = 10, name, categories, city, state } = params;

        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('limit', limit);

        if (name) queryParams.append('name', name);
        if (categories) queryParams.append('categories', categories);
        if (city) queryParams.append('city', city);
        if (state) queryParams.append('state', state);

        const response = await axiosInstance.get(`/organizer?${queryParams.toString()}`);

        return {
            organizers: response.data.organizers || [],
            pagination: {
                currentPage: response.data.page || 1,
                totalPages: response.data.totalPages || 1,
                totalOrganizers: response.data.totalOrganizers || 0,
                hasNextPage: (response.data.page || 1) < (response.data.totalPages || 1),
                hasPrevPage: (response.data.page || 1) > 1,
                limit: response.data.limit || limit
            }
        };
    } catch (error) {
        console.error('Error fetching organizers:', error);
        throw error;
    }
}; 