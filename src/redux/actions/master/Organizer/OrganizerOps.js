import { axiosInstance } from '../../../../../utility/utils.jsx';

// Single organizer operations
export const enableOrganizer = (organizerId) => async (dispatch) => {
    try {
        const response = await axiosInstance.patch(`/organizer/${organizerId}/enable`);
        return response.data;
    } catch (error) {
        console.error('Error enabling organizer:', error);
        throw error;
    }
};

export const disableOrganizer = (organizerId) => async (dispatch) => {
    try {
        const response = await axiosInstance.patch(`/organizer/${organizerId}/disable`);
        return response.data;
    } catch (error) {
        console.error('Error disabling organizer:', error);
        throw error;
    }
};

export const deleteOrganizer = (organizerId) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(`/organizer/${organizerId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting organizer:', error);
        throw error;
    }
};

// Bulk organizer operations
export const bulkEnableOrganizers = (organizerIds) => async (dispatch) => {
    try {
        const response = await axiosInstance.patch('/organizer/bulk-enable', {
            organizerIds
        });
        return response.data;
    } catch (error) {
        console.error('Error bulk enabling organizers:', error);
        throw error;
    }
};

export const bulkDisableOrganizers = (organizerIds) => async (dispatch) => {
    try {
        const response = await axiosInstance.patch('/organizer/bulk-disable', {
            organizerIds
        });
        return response.data;
    } catch (error) {
        console.error('Error bulk disabling organizers:', error);
        throw error;
    }
};

export const bulkDeleteOrganizers = (organizerIds) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete('/organizer/bulk-delete', {
            data: { organizerIds }
        });
        return response.data;
    } catch (error) {
        console.error('Error bulk deleting organizers:', error);
        throw error;
    }
}; 