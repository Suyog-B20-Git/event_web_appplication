import { axiosInstance } from '../../../../../utility/utils.jsx';

export const enableService = (id) => async (dispatch) => {
    await axiosInstance.patch(`/services/${id}/enable`);
};

export const disableService = (id) => async (dispatch) => {
    await axiosInstance.patch(`/services/${id}/disable`);
};

export const deleteService = (id) => async (dispatch) => {
    await axiosInstance.delete(`/services/${id}`);
};

export const bulkEnableServices = (ids) => async (dispatch) => {
    await axiosInstance.patch(`/services/bulk-enable`, { serviceIds: ids });
};

export const bulkDisableServices = (ids) => async (dispatch) => {
    await axiosInstance.patch(`/services/bulk-disable`, { serviceIds: ids });
};

export const bulkDeleteServices = (ids) => async (dispatch) => {
    await axiosInstance.delete(`/services/bulk-delete`, { data: { serviceIds: ids } });
};

export const approveService = (id) => async (dispatch) => {
    await axiosInstance.put(`/services/${id}/approve`);
};

export const rejectService = (id, reason) => async (dispatch) => {
    await axiosInstance.put(`/services/${id}/reject`, { reason });
};


