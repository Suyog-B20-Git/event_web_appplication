import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

export const updateLiftType = (data, props, setisLoader) => {
  return (dispatch, getStore) => {
    Axios.put(
      `/api/master/type-of-lift-master/${props.preloadValue.detail._id}`,
      {
        lift_name: data.lift_name.toLowerCase(),
        status: JSON.parse(data.status),
      }
    )
      .then((response) => {
        if (response.data.status === false) {
          toast.error(response.data.message, {
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });
        } else {
          toast.success(response.data.message, {
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });
          props.onMasterSave();
          // props.history.push({state : {}})
          return (dispatch) => {
            dispatch({
              type: "UPDATE_LIFT_TYPE",
              data,
            });
          };
        }
      })
      .then(() =>
        dispatch(
          getTypeOfLiftList(getStore().typeOfLiftMasterData.params, setisLoader)
        )
      )
      .catch(function (error) {
        toast.error(
          error.response && error.response.data
            ? error.response.data.message
            : "Something Went Wrong !",
          { transition: Zoom, hideProgressBar: false, autoClose: 2000 }
        );
      });
  };
};

import axios from "axios";
import { Organizer } from "../../../Urls";
let api = "http://localhost:5000/api/organizer";

export const getOrganizer = (setLoader, filter, page, category) => {
  setLoader(true); // Start loading
  switch (filter) {
    case "title asc":
      if (category) {
        api = `${Organizer.getOrganizerByFilter}categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=9&sortOrder=asc`;
        // api = `http://localhost:5000/api/organizer/filter?categories=${encodeURIComponent(
        //   category
        // )}&page=${page}&limit=9&sortOrder=asc`;
      } else {
        api = `${Organizer.getOrganizerByFilter}page=${page}&limit=9&sortOrder=asc`;
        // api = `http://localhost:5000/api/organizer/filter?page=${page}&limit=9&sortOrder=asc`;
      }

      break;

    case "title desc":
      if (category) {
        api = `${Organizer.getOrganizerByFilter}categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=8&sortOrder=desc`;
        // api = `http://localhost:5000/api/organizer/filter?categories=${encodeURIComponent(
        //   category
        // )}&page=${page}&limit=8&sortOrder=desc`;
      } else
        api = `${Organizer.getOrganizerByFilter}page=${page}&limit=8&sortOrder=desc`;
        // api = `http://localhost:5000/api/organizer/filter?page=${page}&limit=8&sortOrder=desc`;
      break;

    case "alphabetical":
      if (category) {
        api = `${Organizer.getOrganizerByFilter}categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=8&sortOrder=asc`;
        // api = `http://localhost:5000/api/organizer/filter?categories=${encodeURIComponent(
        //   category
        // )}&page=${page}&limit=8&sortOrder=asc`;
      } else
        api = `${Organizer.getOrganizerByFilter}page=${page}&limit=8&sortOrder=asc`;
        // api = `http://localhost:5000/api/organizer/filter?page=${page}&limit=8&sortOrder=asc`;
      break;

    default:
      if (category) {
        api = ` ${Organizer.getOrganizerByFilter}categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=9`;
        // api = ` http://localhost:5000/api/organizer/filter?categories=${encodeURIComponent(
        //   category
        // )}&page=${page}&limit=9`;
      } else
        api = ` ${Organizer.getOrganizerByFilter}page=${page}&limit=9`;
        // api = ` http://localhost:5000/api/organizer/filter?page=${page}&limit=9`;
      break;
  }

  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axios.get(`${api}`);
      // console.log("response", response);
      dispatch({
        type: "GET_ORGANIZER",
        organizerData: response.data.organizers, // Ensure the API actually returns this structure
        // pageNo: page,
        totalPages:response.data.totalPages
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_ORGANIZER",
        organizerData: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};

// import axios from "axios";
// import { Organizer } from "../../../Urls";

// let api = `${Organizer.getOrganizerFilter}filter`;

// export const getOrganizer = (setLoader, filter, page = 1, limit = 10) => {
//   return async (dispatch) => {
//     setLoader(true); // Start loading

//     // let api = `${baseApi}?page=${page}&limit=${limit}`;
//     // if (filter) {
//     //   api += `&sortOrder=${
//     //     filter === "title asc"
//     //       ? "asc"
//     //       : `${filter === "alphabetical" ? "asc" : "desc"}`
//     //   }`;
//     // }
//     switch (filter) {
//       case "title asc":
//         api = `${api}?page=${page}&limit=${limit}&sortOrder=asc`;
//         break;

//       case "title desc":
//         api = `${api}?page=${page}&limit=${limit}&sortOrder=desc`;
//         break;

//       case "alphabetical":
//         api = `${api}?page=${page}&limit=${limit}&sortOrder=asc`;
//         break;

//       default:
//         api = ` ${api}?page=${page}&limit=${limit}`;
//         break;
//     }

//     try {
//       const response = await axios.get(api);
//       console.log("API Response:", response);

//       dispatch({
//         type: "GET_ORGANIZER",
//         organizerData: response.data.organizers || [], // Ensure correct data structure
//         page,
//       });
//     } catch (error) {
//       console.error(
//         "API Error:",
//         error.response ? error.response.data : error.message
//       );
//       dispatch({
//         type: "GET_ORGANIZER",
//         organizerData: [],
//       });
//     } finally {
//       setLoader(false); // Stop loading
//     }
//   };
// };
