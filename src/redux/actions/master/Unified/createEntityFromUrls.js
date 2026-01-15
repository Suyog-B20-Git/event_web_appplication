import { axiosInstance } from '../../../../../utility/utils.jsx';

export const createEntityFromUrls = (entityData) => async (dispatch) => {
    try {
        // content-type: application/json (URLs only, no file uploads)
        const response = await axiosInstance.post('/unified/create-from-urls', entityData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating entity from URLs:', error);
        throw error;
    }
};

