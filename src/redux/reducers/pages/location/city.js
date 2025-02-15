const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  cities: [],
};

const citiesReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_CITY":
      return {
        ...state,
        cities: action.cities,
      };

    default:
      return { ...state };
  }
};
export default citiesReducer;
