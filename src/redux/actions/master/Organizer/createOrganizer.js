import { axiosInstance } from '../../../../../utility/utils.jsx';

export const createOrganizer = (organizerData) => async (dispatch) => {
    try {
        // content-type: multipart/form-data
        const response = await axiosInstance.post('/organizer', organizerData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating organizer:', error);
        throw error;
    }
}; 