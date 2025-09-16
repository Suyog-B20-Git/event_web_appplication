const initialState = {
    venues: [],
    pagination: {
        page: 1,
        limit: 10,
        totalPages: 0,
        totalVenues: 0
    },
    loading: false,
    error: null
};

const getVenuesAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_VENUES_ADMIN_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'GET_ALL_VENUES_ADMIN_SUCCESS':
            return {
                ...state,
                loading: false,
                venues: action.payload.venues,
                pagination: action.payload.pagination,
                error: null
            };
        case 'GET_ALL_VENUES_ADMIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default getVenuesAdminReducer;
