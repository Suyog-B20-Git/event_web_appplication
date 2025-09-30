import { axiosInstance } from '../../../../../utility/utils.jsx';

// Single venue operations
export const enableVenue = (venueId) => async (dispatch) => {
    try {
        dispatch({ type: 'ENABLE_VENUE_REQUEST' });
        const response = await axiosInstance.patch(`/venue/${venueId}/enable`);
        dispatch({ type: 'ENABLE_VENUE_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'ENABLE_VENUE_FAILURE', payload: error.response?.data?.message || 'Error enabling venue' });
        throw error;
    }
};

export const disableVenue = (venueId) => async (dispatch) => {
    try {
        dispatch({ type: 'DISABLE_VENUE_REQUEST' });
        const response = await axiosInstance.patch(`/venue/${venueId}/disable`);
        dispatch({ type: 'DISABLE_VENUE_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'DISABLE_VENUE_FAILURE', payload: error.response?.data?.message || 'Error disabling venue' });
        throw error;
    }
};

export const deleteVenue = (venueId) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_VENUE_REQUEST' });
        const response = await axiosInstance.delete(`/venue/${venueId}`);
        dispatch({ type: 'DELETE_VENUE_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'DELETE_VENUE_FAILURE', payload: error.response?.data?.message || 'Error deleting venue' });
        throw error;
    }
};

// Bulk operations
export const bulkEnableVenues = (venueIds) => async (dispatch) => {
    try {
        dispatch({ type: 'BULK_ENABLE_VENUES_REQUEST' });
        const response = await axiosInstance.patch('/venue/bulk-enable', { venueIds });
        dispatch({ type: 'BULK_ENABLE_VENUES_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'BULK_ENABLE_VENUES_FAILURE', payload: error.response?.data?.message || 'Error bulk enabling venues' });
        throw error;
    }
};

export const bulkDisableVenues = (venueIds) => async (dispatch) => {
    try {
        dispatch({ type: 'BULK_DISABLE_VENUES_REQUEST' });
        const response = await axiosInstance.patch('/venue/bulk-disable', { venueIds });
        dispatch({ type: 'BULK_DISABLE_VENUES_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'BULK_DISABLE_VENUES_FAILURE', payload: error.response?.data?.message || 'Error bulk disabling venues' });
        throw error;
    }
};

export const bulkDeleteVenues = (venueIds) => async (dispatch) => {
    try {
        dispatch({ type: 'BULK_DELETE_VENUES_REQUEST' });
        const response = await axiosInstance.delete('/venue/bulk-delete', { data: { venueIds } });
        dispatch({ type: 'BULK_DELETE_VENUES_SUCCESS', payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: 'BULK_DELETE_VENUES_FAILURE', payload: error.response?.data?.message || 'Error bulk deleting venues' });
        throw error;
    }
};
