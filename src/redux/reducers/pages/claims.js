const initialState = {
    claims: [],
    loading: false,
    error: null,
    pagination: {},
};

const claimsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_MY_CLAIMS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "GET_MY_CLAIMS_SUCCESS":
            return {
                ...state,
                loading: false,
                claims: action.payload.claims || [],
                pagination: action.payload.pagination || {},
                error: null,
            };
        case "GET_MY_CLAIMS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                claims: [],
                pagination: {},
            };
        case "GET_ALL_CLAIMS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "GET_ALL_CLAIMS_SUCCESS":
            return {
                ...state,
                loading: false,
                claims: action.payload.claims || [],
                pagination: action.payload.pagination || {},
                error: null,
            };
        case "GET_ALL_CLAIMS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                claims: [],
                pagination: {},
            };
        case "UPDATE_CLAIM_STATUS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "UPDATE_CLAIM_STATUS_SUCCESS":
            return {
                ...state,
                loading: false,
                claims: state.claims.map(claim =>
                    claim._id === action.payload.claimId
                        ? { ...claim, status: action.payload.status.status }
                        : claim
                ),
                error: null,
            };
        case "UPDATE_CLAIM_STATUS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "SUBMIT_CLAIM_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "SUBMIT_CLAIM_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
            };
        case "SUBMIT_CLAIM_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default claimsReducer;
