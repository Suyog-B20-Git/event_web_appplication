import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("authToken")}` });

export const enableUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "ENABLE_USER_REQUEST" });

        const res = await axiosInstance.put(`/auth/users/${userId}/enable`, {}, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            dispatch({ type: "ENABLE_USER_SUCCESS" });
            toast.success("User enabled");
            return res.data.data;
        }
        const errorMessage = res.data.message || "Failed to enable user";
        dispatch({
            type: "ENABLE_USER_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw new Error(errorMessage);
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong";
        dispatch({
            type: "ENABLE_USER_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw err;
    }
};

export const disableUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "DISABLE_USER_REQUEST" });

        const res = await axiosInstance.put(`/auth/users/${userId}/disable`, {}, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            dispatch({ type: "DISABLE_USER_SUCCESS" });
            toast.success("User disabled");
            return res.data.data;
        }
        const errorMessage = res.data.message || "Failed to disable user";
        dispatch({
            type: "DISABLE_USER_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw new Error(errorMessage);
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong";
        dispatch({
            type: "DISABLE_USER_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw err;
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_USER_REQUEST" });

        const res = await axiosInstance.delete(`/auth/users/${userId}`, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            dispatch({ type: "DELETE_USER_SUCCESS" });
            toast.success("User deleted");
            return res.data.data;
        }
        const errorMessage = res.data.message || "Failed to delete user";
        dispatch({
            type: "DELETE_USER_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw new Error(errorMessage);
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong";
        dispatch({
            type: "DELETE_USER_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw err;
    }
};

export const bulkEnableUsers = (ids) => async (dispatch) => {
    try {
        dispatch({ type: "BULK_ENABLE_USERS_REQUEST" });

        const res = await axiosInstance.put(`/auth/users/bulk/enable`, { ids }, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            dispatch({ type: "BULK_ENABLE_USERS_SUCCESS" });
            toast.success(`Enabled ${res.data.data.modified} users`);
            return res.data.data;
        }
        const errorMessage = res.data.message || "Failed to enable users";
        dispatch({
            type: "BULK_ENABLE_USERS_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw new Error(errorMessage);
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong";
        dispatch({
            type: "BULK_ENABLE_USERS_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw err;
    }
};

export const bulkDisableUsers = (ids) => async (dispatch) => {
    try {
        dispatch({ type: "BULK_DISABLE_USERS_REQUEST" });

        const res = await axiosInstance.put(`/auth/users/bulk/disable`, { ids }, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            dispatch({ type: "BULK_DISABLE_USERS_SUCCESS" });
            toast.success(`Disabled ${res.data.data.modified} users`);
            return res.data.data;
        }
        const errorMessage = res.data.message || "Failed to disable users";
        dispatch({
            type: "BULK_DISABLE_USERS_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw new Error(errorMessage);
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong";
        dispatch({
            type: "BULK_DISABLE_USERS_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw err;
    }
};

export const bulkDeleteUsers = (ids) => async (dispatch) => {
    try {
        dispatch({ type: "BULK_DELETE_USERS_REQUEST" });

        const res = await axiosInstance.post(`/auth/users/bulk/delete`, { ids }, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            dispatch({ type: "BULK_DELETE_USERS_SUCCESS" });
            toast.success(`Deleted ${res.data.data.deleted} users`);
            return res.data.data;
        }
        const errorMessage = res.data.message || "Failed to delete users";
        dispatch({
            type: "BULK_DELETE_USERS_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw new Error(errorMessage);
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong";
        dispatch({
            type: "BULK_DELETE_USERS_FAILURE",
            payload: errorMessage
        });
        toast.error(errorMessage);
        throw err;
    }
};