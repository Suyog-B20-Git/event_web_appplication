import { axiosInstance } from '../../../../../utility/utils.jsx';

export const updateOrganizer = (organizerId, organizerData) => async (dispatch) => {
    try {
        // content-type: multipart/form-data    
        const response = await axiosInstance.put(`/organizer/${organizerId}`, organizerData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating organizer:', error);
        throw error;
    }
}; 