import { toast } from 'react-toastify';
import { axiosInstance } from '../../../../../utility/utils';

export const createUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_USER_REQUEST" });

        const response = await axiosInstance.post('/auth/add-user', userData);

        if (response.data.status) {
            dispatch({ type: "CREATE_USER_SUCCESS" });
            toast.success('User created successfully!');
            return { success: true, data: response.data.data };
        } else {
            const errorMessage = response.data.message || 'Failed to create user';
            dispatch({
                type: "CREATE_USER_FAILURE",
                payload: errorMessage
            });
            toast.error(errorMessage);
            return { success: false, message: errorMessage };
        }
    } catch (error) {
        console.error('Error creating user:', error);
        const errorMessage = error.response?.data?.message || 'Failed to create user';
        dispatch({
            type: "CREATE_USER_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
};
