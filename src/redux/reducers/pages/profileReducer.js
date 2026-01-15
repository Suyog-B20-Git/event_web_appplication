const initialState = {
  user: {},
  loading: false,
  error: null,
  successMessage: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "GET_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };

    case "GET_USER_FAILURE":
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
        successMessage: null,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        successMessage: "Profile updated successfully!",
        error: null,
      };

    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload, // Error message from API
        successMessage: null,
      };

    default:
      return state;
  }
};

export default profileReducer;
