const initialState = {
    loading: false,
    error: null,
    success: null
};

const venueOpsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Single venue operations
        case 'ENABLE_VENUE_REQUEST':
        case 'DISABLE_VENUE_REQUEST':
        case 'DELETE_VENUE_REQUEST':
        case 'UPDATE_VENUE_REQUEST':
        case 'CREATE_VENUE_REQUEST':
        case 'BULK_ENABLE_VENUES_REQUEST':
        case 'BULK_DISABLE_VENUES_REQUEST':
        case 'BULK_DELETE_VENUES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };

        case 'ENABLE_VENUE_SUCCESS':
        case 'DISABLE_VENUE_SUCCESS':
        case 'DELETE_VENUE_SUCCESS':
        case 'UPDATE_VENUE_SUCCESS':
        case 'CREATE_VENUE_SUCCESS':
        case 'BULK_ENABLE_VENUES_SUCCESS':
        case 'BULK_DISABLE_VENUES_SUCCESS':
        case 'BULK_DELETE_VENUES_SUCCESS':
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            };

        case 'ENABLE_VENUE_FAILURE':
        case 'DISABLE_VENUE_FAILURE':
        case 'DELETE_VENUE_FAILURE':
        case 'UPDATE_VENUE_FAILURE':
        case 'CREATE_VENUE_FAILURE':
        case 'BULK_ENABLE_VENUES_FAILURE':
        case 'BULK_DISABLE_VENUES_FAILURE':
        case 'BULK_DELETE_VENUES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };

        default:
            return state;
    }
};

export default venueOpsReducer;
