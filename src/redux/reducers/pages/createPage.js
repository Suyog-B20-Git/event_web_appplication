import {
    CREATE_PAGE_REQUEST,
    CREATE_PAGE_SUCCESS,
    CREATE_PAGE_FAILURE
} from '../../actions/master/pages/createPage';

const initialState = {
    loading: false,
    error: null,
    success: false
};

const createPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };

        case CREATE_PAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true
            };

        case CREATE_PAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        default:
            return state;
    }
};

export default createPageReducer; 