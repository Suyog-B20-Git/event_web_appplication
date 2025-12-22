import {
    GET_BLOG_POSTS_REQUEST,
    GET_BLOG_POSTS_SUCCESS,
    GET_BLOG_POSTS_FAILURE
} from '../../actions/master/BlogPosts/getBlogPosts';
import {
    CREATE_BLOG_POST_REQUEST,
    CREATE_BLOG_POST_SUCCESS,
    CREATE_BLOG_POST_FAILURE
} from '../../actions/master/BlogPosts/createBlogPost';
import {
    UPDATE_BLOG_POST_REQUEST,
    UPDATE_BLOG_POST_SUCCESS,
    UPDATE_BLOG_POST_FAILURE
} from '../../actions/master/BlogPosts/updateBlogPost';
import {
    DELETE_BLOG_POST_REQUEST,
    DELETE_BLOG_POST_SUCCESS,
    DELETE_BLOG_POST_FAILURE
} from '../../actions/master/BlogPosts/deleteBlogPost';
import {
    BULK_DELETE_BLOG_POSTS_REQUEST,
    BULK_DELETE_BLOG_POSTS_SUCCESS,
    BULK_DELETE_BLOG_POSTS_FAILURE
} from '../../actions/master/BlogPosts/deleteBlogPost';


const initialState = {
    posts: [],
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
    bulkDeleteLoading: false,
    bulkDeleteError: null
};

const blogPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Get Blog Posts
        case GET_BLOG_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_BLOG_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: null
            };
        case GET_BLOG_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
                // Don't clear posts on error - keep existing data
            };

        // Create Blog Post
        case CREATE_BLOG_POST_REQUEST:
            return {
                ...state,
                createLoading: true,
                createError: null
            };
        case CREATE_BLOG_POST_SUCCESS:
            return {
                ...state,
                createLoading: false,
                posts: [action.payload, ...state.posts],
                createError: null
            };
        case CREATE_BLOG_POST_FAILURE:
            return {
                ...state,
                createLoading: false,
                createError: action.payload
            };

        // Update Blog Post
        case UPDATE_BLOG_POST_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateError: null
            };
        case UPDATE_BLOG_POST_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                posts: state.posts.map(post =>
                    post._id === action.payload._id ? action.payload : post
                ),
                updateError: null
            };
        case UPDATE_BLOG_POST_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload
            };

        // Delete Blog Post
        case DELETE_BLOG_POST_REQUEST:
            return {
                ...state,
                deleteLoading: true,
                deleteError: null
            };
        case DELETE_BLOG_POST_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                posts: state.posts.filter(post => post._id !== action.payload),
                deleteError: null
            };
        case DELETE_BLOG_POST_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                deleteError: action.payload
            };

        // Bulk Delete Blog Posts
        case BULK_DELETE_BLOG_POSTS_REQUEST:
            return {
                ...state,
                bulkDeleteLoading: true,
                bulkDeleteError: null
            };
        case BULK_DELETE_BLOG_POSTS_SUCCESS:
            return {
                ...state,
                bulkDeleteLoading: false,
                posts: state.posts.filter(post => !action.payload.includes(post._id)),
                bulkDeleteError: null
            };
        case BULK_DELETE_BLOG_POSTS_FAILURE:
            return {
                ...state,
                bulkDeleteLoading: false,
                bulkDeleteError: action.payload
            };

        default:
            return state;
    }
};

export default blogPostsReducer; 