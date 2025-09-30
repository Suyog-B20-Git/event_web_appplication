import {
    GET_PAGES_REQUEST,
    GET_PAGES_SUCCESS,
    GET_PAGES_FAILURE
} from '../../actions/master/pages/getPages';
import {
    DELETE_PAGE_SUCCESS
} from '../../actions/master/pages/deletePage';

const initialState = {
    pages: [],
    loading: false,
    error: null
};

const getPagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAGES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_PAGES_SUCCESS:
            return {
                ...state,
                pages: action.payload,
                loading: false,
                error: null
            };

        case GET_PAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case DELETE_PAGE_SUCCESS:
            return {
                ...state,
                pages: state.pages.filter(page => page._id !== action.payload)
            };

        default:
            return state;
    }
};

export default getPagesReducer; 