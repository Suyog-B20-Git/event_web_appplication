import { axiosInstance } from '../../../../../utility/utils.jsx';

export const getAllVenuesAdmin = (params = {}) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_ALL_VENUES_ADMIN_REQUEST' });

        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.name) queryParams.append('name', params.name);
        if (params.categories) queryParams.append('categories', params.categories);
        if (params.city) queryParams.append('city', params.city);
        if (params.state) queryParams.append('state', params.state);
        if (params.status) queryParams.append('status', params.status);

        const response = await axiosInstance.get(`/venue?${queryParams.toString()}`);

        const shaped = {
            venues: response.data.venues,
            pagination: {
                currentPage: response.data.page,
                limit: response.data.limit,
                totalPages: response.data.totalPages,
                totalVenues: response.data.totalVenues,
                hasPrevPage: Number(response.data.page) > 1,
                hasNextPage: Number(response.data.page) < Number(response.data.totalPages)
            }
        };

        dispatch({
            type: 'GET_ALL_VENUES_ADMIN_SUCCESS',
            payload: shaped
        });

        return shaped;
    } catch (error) {
        dispatch({
            type: 'GET_ALL_VENUES_ADMIN_FAILURE',
            payload: error.response?.data?.message || 'Error fetching venues'
        });
        throw error;
    }
};
