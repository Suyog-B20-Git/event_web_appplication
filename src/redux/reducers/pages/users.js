const initialState = {
    users: [],
    loading: false,
    error: null,
    pagination: {},
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_USERS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "GET_ALL_USERS_SUCCESS":
            return {
                ...state,
                loading: false,
                users: action.payload.users || [],
                pagination: action.payload.pagination || {},
                error: null,
            };
        case "GET_ALL_USERS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                users: [],
                pagination: {},
            };
        case "CREATE_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "CREATE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
            };
        case "CREATE_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "UPDATE_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "UPDATE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
            };
        case "UPDATE_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "DELETE_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "DELETE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
            };
        case "DELETE_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "ENABLE_USER_REQUEST":
        case "DISABLE_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "ENABLE_USER_SUCCESS":
        case "DISABLE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
            };
        case "ENABLE_USER_FAILURE":
        case "DISABLE_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "BULK_ENABLE_USERS_REQUEST":
        case "BULK_DISABLE_USERS_REQUEST":
        case "BULK_DELETE_USERS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "BULK_ENABLE_USERS_SUCCESS":
        case "BULK_DISABLE_USERS_SUCCESS":
        case "BULK_DELETE_USERS_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
            };
        case "BULK_ENABLE_USERS_FAILURE":
        case "BULK_DISABLE_USERS_FAILURE":
        case "BULK_DELETE_USERS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;
