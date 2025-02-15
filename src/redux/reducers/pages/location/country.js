const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  countries: [],
};

const countriesReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_COUNTRY":
      return {
        ...state,
        countries: action.countries,
      };

    default:
      return { ...state };
  }
};
export default countriesReducer;
