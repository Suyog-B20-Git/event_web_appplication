import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../utility/utils";

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("authToken")}` });

export const enableUser = (userId) => async () => {
    try {
        const res = await axiosInstance.put(`/auth/users/${userId}/enable`, {}, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            toast.success("User enabled");
            return res.data.data;
        }
        toast.error(res.data.message || "Failed to enable user");
        throw new Error(res.data.message || "Failed to enable user");
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Something went wrong");
        throw err;
    }
};

export const disableUser = (userId) => async () => {
    try {
        const res = await axiosInstance.put(`/auth/users/${userId}/disable`, {}, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            toast.success("User disabled");
            return res.data.data;
        }
        toast.error(res.data.message || "Failed to disable user");
        throw new Error(res.data.message || "Failed to disable user");
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Something went wrong");
        throw err;
    }
};

export const deleteUser = (userId) => async () => {
    try {
        const res = await axiosInstance.delete(`/auth/users/${userId}`, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            toast.success("User deleted");
            return res.data.data;
        }
        toast.error(res.data.message || "Failed to delete user");
        throw new Error(res.data.message || "Failed to delete user");
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Something went wrong");
        throw err;
    }
};

export const bulkEnableUsers = (ids) => async () => {
    try {
        const res = await axiosInstance.put(`/auth/users/bulk/enable`, { ids }, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            toast.success(`Enabled ${res.data.data.modified} users`);
            return res.data.data;
        }
        toast.error(res.data.message || "Failed to enable users");
        throw new Error(res.data.message || "Failed to enable users");
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Something went wrong");
        throw err;
    }
};

export const bulkDisableUsers = (ids) => async () => {
    try {
        const res = await axiosInstance.put(`/auth/users/bulk/disable`, { ids }, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            toast.success(`Disabled ${res.data.data.modified} users`);
            return res.data.data;
        }
        toast.error(res.data.message || "Failed to disable users");
        throw new Error(res.data.message || "Failed to disable users");
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Something went wrong");
        throw err;
    }
};

export const bulkDeleteUsers = (ids) => async () => {
    try {
        const res = await axiosInstance.post(`/auth/users/bulk/delete`, { ids }, { headers: authHeader() });
        if (res.status === 200 && res.data.status) {
            toast.success(`Deleted ${res.data.data.deleted} users`);
            return res.data.data;
        }
        toast.error(res.data.message || "Failed to delete users");
        throw new Error(res.data.message || "Failed to delete users");
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Something went wrong");
        throw err;
    }
};