import { axiosInstance } from '../../../../../utility/utils.jsx';

// Single performer operations
export const enablePerformer = (performerId) => async () => {
    try {
        const response = await axiosInstance.patch(`/performer/${performerId}/enable`);
        return response.data;
    } catch (error) {
        console.error('Error enabling performer:', error);
        throw error;
    }
};

export const disablePerformer = (performerId) => async () => {
    try {
        const response = await axiosInstance.patch(`/performer/${performerId}/disable`);
        return response.data;
    } catch (error) {
        console.error('Error disabling performer:', error);
        throw error;
    }
};

export const deletePerformer = (performerId) => async () => {
    try {
        const response = await axiosInstance.delete(`/performer/${performerId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting performer:', error);
        throw error;
    }
};

// Bulk performer operations
export const bulkEnablePerformers = (performerIds) => async () => {
    try {
        const response = await axiosInstance.patch('/performer/bulk-enable', { performerIds });
        return response.data;
    } catch (error) {
        console.error('Error bulk enabling performers:', error);
        throw error;
    }
};

export const bulkDisablePerformers = (performerIds) => async () => {
    try {
        const response = await axiosInstance.patch('/performer/bulk-disable', { performerIds });
        return response.data;
    } catch (error) {
        console.error('Error bulk disabling performers:', error);
        throw error;
    }
};

export const bulkDeletePerformers = (performerIds) => async () => {
    try {
        const response = await axiosInstance.delete('/performer/bulk-delete', {
            data: { performerIds }
        });
        return response.data;
    } catch (error) {
        console.error('Error bulk deleting performers:', error);
        throw error;
    }
};


