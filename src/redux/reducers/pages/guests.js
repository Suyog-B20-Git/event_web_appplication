const initialState = {
    guests: [],
    guestLists: [],
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        totalPages: 0,
        totalGuests: 0,
        totalGuestLists: 0,
    },
    currentGuest: null,
    currentGuestList: null,
};

const guestsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Guest Actions
        case "CREATE_GUEST_REQUEST":
        case "GET_GUESTS_REQUEST":
        case "UPDATE_GUEST_REQUEST":
        case "DELETE_GUEST_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "CREATE_GUEST_SUCCESS":
            return {
                ...state,
                loading: false,
                guests: [action.payload, ...state.guests],
                error: null,
            };

        case "GET_GUESTS_SUCCESS":
            return {
                ...state,
                loading: false,
                guests: action.payload.guests,
                pagination: action.payload.pagination,
                error: null,
            };

        case "UPDATE_GUEST_SUCCESS":
            return {
                ...state,
                loading: false,
                guests: state.guests.map((guest) =>
                    guest._id === action.payload.id ? action.payload.guest : guest
                ),
                error: null,
            };

        case "DELETE_GUEST_SUCCESS":
            return {
                ...state,
                loading: false,
                guests: state.guests.filter((guest) => guest._id !== action.payload),
                error: null,
            };

        case "CREATE_GUEST_FAILURE":
        case "GET_GUESTS_FAILURE":
        case "UPDATE_GUEST_FAILURE":
        case "DELETE_GUEST_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // New case for fetching all guests for list creation
        case "GET_ALL_GUESTS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "GET_ALL_GUESTS_SUCCESS":
            return {
                ...state,
                loading: false,
                allGuests: action.payload, // Store all guests in a separate field
                error: null,
            };

        case "GET_ALL_GUESTS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        // Guest List Actions
        case "CREATE_GUEST_LIST_REQUEST":
        case "GET_GUEST_LISTS_REQUEST":
        case "UPDATE_GUEST_LIST_REQUEST":
        case "DELETE_GUEST_LIST_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "CREATE_GUEST_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                guestLists: [action.payload, ...state.guestLists],
                error: null,
            };

        case "GET_GUEST_LISTS_SUCCESS":
            return {
                ...state,
                loading: false,
                guestLists: action.payload.guestLists,
                pagination: {
                    ...state.pagination,
                    ...action.payload.pagination,
                },
                error: null,
            };

        case "UPDATE_GUEST_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                guestLists: state.guestLists.map((list) =>
                    list._id === action.payload.id ? action.payload.guestList : list
                ),
                error: null,
            };

        case "DELETE_GUEST_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                guestLists: state.guestLists.filter((list) => list._id !== action.payload),
                error: null,
            };

        case "CREATE_GUEST_LIST_FAILURE":
        case "GET_GUEST_LISTS_FAILURE":
        case "UPDATE_GUEST_LIST_FAILURE":
        case "DELETE_GUEST_LIST_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CLEAR_GUESTS_ERROR":
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export default guestsReducer;
