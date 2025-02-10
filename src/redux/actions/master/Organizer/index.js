import {Axios} from 'axios'
// import {toast,Zoom,Slide} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css1
//
// '

import {axiosInstance} from "../../../../../utility/utils";


//-----------get type of lift with paginated data--------------------------//
// export const getTypeOfLiftList = (params,setisLoader) => {
//   setisLoader(true)
//   return dispatch => {
//     Axios.get(`api/master/type-of-lift-master/paginated?page=${params.page}&limit=${params.perPage}&search=${params.search}`).then(response => {
//       dispatch({
//         type: 'GET_LIFT_TYPE',
//         allData: response.data.data.total,
//         data: response.data.data.docs,
//         totalPages: response.data.data.pages,
//         params
//       })
//     })
//     .catch(error=>{
//       dispatch({
//         type: 'GET_LIFT_TYPE',
//         allData: 0,
//         data: [],
//         totalPages: 0,
//         params
//       })
//     })
//     .finally(() => {
//       setisLoader(false)
//     })
//   }
// }

//-----------------create new lift type--------------------------//
// export const createOrganizer = (data) => {
//   console.log("data",data)
//   // return (dispatch,getStore) => {
//   //   Axios.post(`/api/master/type-of-lift-master`,{
//   //     lift_name: data.lift_name.toLowerCase(),
//   //     status: JSON.parse(data.status)
//   //   })
//   //     .then(response => {
//   //       if (response.data.status === false) {
//   //         toast.error(response.data.message,
//   //           {transition: Zoom,hideProgressBar: true,autoClose: 2000})
//   //       } else {
//   //         toast.success(response.data.message,
//   //           {transition: Zoom,hideProgressBar: true,autoClose: 2000})
//   //         props.onMasterSave()
//   //         return dispatch => {
//   //           dispatch(
//   //             {
//   //               type: 'CREATE_LIFT_TYPE',
//   //               data
//   //             }
//   //           )
//   //         }
//   //       }
//   //     })
//   //     .then(() => dispatch(getTypeOfLiftList(getStore().typeOfLiftMasterData.params,setisLoader)))
//   //     .catch(function (error) {
//   //       toast.error(error.response && error.response.data ? error.response.data.message : 'Something Went Wrong !',
//   //         {transition: Zoom,hideProgressBar: false,autoClose: 2000})
//   //     })
//   // }
// }
// export const createOrganizer = (organizerData) => async (dispatch) => {
//   try {
//     console
//     console.log("organizerData",organizerData)
//     const response = await axiosInstance.post("/organizers",organizerData);
//     console.log("response",response)

//     const data = await response.json();

//     dispatch({type: "CREATE_ORGANIZER_SUCCESS",payload: data});
//   } catch (error) {
//     dispatch({type: "CREATE_ORGANIZER_FAIL",payload: error.message});
//   }
// };


//------------------update Lift Type information------------------------//
export const updateLiftType = (data,props,setisLoader) => {
  return (dispatch,getStore) => {
    Axios.put(`/api/master/type-of-lift-master/${props.preloadValue.detail._id}`,{
      lift_name: data.lift_name.toLowerCase(),
      status: JSON.parse(data.status)
    })
      .then(response => {
        if (response.data.status === false) {
          toast.error(response.data.message,
            {transition: Zoom,hideProgressBar: true,autoClose: 2000})
        } else {
          toast.success(response.data.message,
            {transition: Zoom,hideProgressBar: true,autoClose: 2000})
          props.onMasterSave();
          // props.history.push({state : {}})
          return dispatch => {
            dispatch(
              {
                type: 'UPDATE_LIFT_TYPE',
                data
              }
            )
          }
        }
      })
      .then(() => dispatch(getTypeOfLiftList(getStore().typeOfLiftMasterData.params,setisLoader)))
      .catch(function (error) {
        toast.error(error.response && error.response.data ? error.response.data.message : 'Something Went Wrong !',
          {transition: Zoom,hideProgressBar: false,autoClose: 2000})
      })


  }
}


import {toast} from "react-toastify";
import {Zoom} from "react-toastify";

export const createNewOrganizer = (data) => {
  console.log("data.:::",data)
  return (dispatch) => {
    axiosInstance
      .post(`http://localhost:5000/api/organizer`,{
        name: data.name.trim(),
        categories: data.categories, // Assuming it's an array
        description: data.description.trim(),
        tags: data.tags,
        city: data.city,
        state: data.state,
        address: data.address,
        country: data.country,
        googleSearchLocation: data.googleSearchLocation,
        googleSearchLat: data.googleSearchLat,
        googleSearchLong: data.googleSearchLong,
        phoneNumber: data.phoneNumber,
        email: data.email,
        availableTime: data.availableTime,
        rating: Number(data.rating), // Convert rating to number
        website: data.website,
        profileImage: data.profileImage ?? null,
        facebookUrl: data.facebookUrl,
        instagramUrl: data.instagramUrl,
        youtubeUrl: data.youtubeUrl,
        twitterUrl: data.twitterUrl,
        visits: Number(data.visits) || 0, // Default to 0 if undefined
      })
      .then((response) => {
        if (!response.data.status) {
          toast.error(response.data.message,{
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });
        } else {
          toast.success(response.data.message,{
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });


          dispatch({
            type: "CREATE_ORGANIZER",
            payload: data,
          });
        }
      })
      // .then(() => {
      //   dispatch(getOrganizersList(getState().organizers.params,setIsLoader));
      // })
      .catch((error) => {
        toast.error(
          error.response && error.response.data
            ? error.response.data.message
            : "Something went wrong!",
          {transition: Zoom,hideProgressBar: false,autoClose: 2000}
        );
      });
  };
};
