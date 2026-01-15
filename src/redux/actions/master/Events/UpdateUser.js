import { toast } from 'react-toastify';
import { axiosInstance } from '../../../../../utility/utils.jsx';

export const updateUser = (userId, userData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_USER_REQUEST" });

        const response = await axiosInstance.put(`/auth/user/${userId}`, userData);

        if (response.data.status) {
            dispatch({ type: "UPDATE_USER_SUCCESS" });
            toast.success('User updated successfully!');
            return { success: true, data: response.data.data };
        } else {
            const errorMessage = response.data.message || 'Failed to update user';
            dispatch({
                type: "UPDATE_USER_FAILURE",
                payload: errorMessage
            });
            toast.error(errorMessage);
            return { success: false, message: errorMessage };
        }
    } catch (error) {
        console.error('Error updating user:', error);
        const errorMessage = error.response?.data?.message || 'Failed to update user';
        dispatch({
            type: "UPDATE_USER_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
};

export const getUserById = (userId) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/auth/user/${userId}`);

        if (response.data.status) {
            return { success: true, data: response.data.data };
        } else {
            toast.error(response.data.message || 'Failed to fetch user');
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch user';
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
}; 