import { axiosInstance } from "../../../../../utility/utils";

export const getMyClaims = (params = {}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_MY_CLAIMS_REQUEST" });

            // Build query parameters
            const queryParams = new URLSearchParams();

            if (params.page) queryParams.append('page', params.page);
            if (params.limit) queryParams.append('limit', params.limit);
            if (params.status) queryParams.append('status', params.status);
            if (params.modelName) queryParams.append('modelName', params.modelName);

            const response = await axiosInstance.get(`/claims/my-claims?${queryParams.toString()}`);

            if (response.data.status) {
                dispatch({
                    type: "GET_MY_CLAIMS_SUCCESS",
                    payload: response.data.data
                });
                return response.data.data;
            } else {
                const errorMessage = response.data.message || "Failed to fetch claims";
                dispatch({
                    type: "GET_MY_CLAIMS_FAILURE",
                    payload: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            dispatch({
                type: "GET_MY_CLAIMS_FAILURE",
                payload: errorMessage
            });
            throw error;
        }
    };
};

export const getAllClaims = (params = {}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_ALL_CLAIMS_REQUEST" });

            // Build query parameters
            const queryParams = new URLSearchParams();

            if (params.page) queryParams.append('page', params.page);
            if (params.limit) queryParams.append('limit', params.limit);
            if (params.status) queryParams.append('status', params.status);
            if (params.modelName) queryParams.append('modelName', params.modelName);
            if (params.search) queryParams.append('search', params.search);

            const response = await axiosInstance.get(`/claims?${queryParams.toString()}`);

            if (response.data.status) {
                dispatch({
                    type: "GET_ALL_CLAIMS_SUCCESS",
                    payload: response.data.data
                });
                return response.data.data;
            } else {
                const errorMessage = response.data.message || "Failed to fetch claims";
                dispatch({
                    type: "GET_ALL_CLAIMS_FAILURE",
                    payload: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            dispatch({
                type: "GET_ALL_CLAIMS_FAILURE",
                payload: errorMessage
            });
            throw error;
        }
    };
};

export const updateClaimStatus = (claimId, status, rejectionReason = null) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "UPDATE_CLAIM_STATUS_REQUEST" });

            const payload = { status };
            if (rejectionReason) {
                payload.rejectionReason = rejectionReason;
            }

            const response = await axiosInstance.put(`/claims/${claimId}/status`, payload);

            if (response.data.status) {
                dispatch({
                    type: "UPDATE_CLAIM_STATUS_SUCCESS",
                    payload: { claimId, status: response.data.data }
                });
                return response.data.data;
            } else {
                const errorMessage = response.data.message || "Failed to update claim status";
                dispatch({
                    type: "UPDATE_CLAIM_STATUS_FAILURE",
                    payload: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            dispatch({
                type: "UPDATE_CLAIM_STATUS_FAILURE",
                payload: errorMessage
            });
            throw error;
        }
    };
};

export const submitOwnershipClaim = (claimData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "SUBMIT_CLAIM_REQUEST" });

            const response = await axiosInstance.post('/claims', claimData);

            if (response.data.status) {
                dispatch({
                    type: "SUBMIT_CLAIM_SUCCESS",
                    payload: response.data.data
                });
                return response.data.data;
            } else {
                const errorMessage = response.data.message || "Failed to submit claim";
                dispatch({
                    type: "SUBMIT_CLAIM_FAILURE",
                    payload: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
            dispatch({
                type: "SUBMIT_CLAIM_FAILURE",
                payload: errorMessage
            });
            throw error;
        }
    };
};
