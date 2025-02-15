import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "../Loading";
import { getOrganizerById } from "../../redux/actions/master/Organizer/getOrganizerById";

function GetOrganizerById() {
  const location = useLocation();
  const organizerId = location.state;
  console.log(organizerId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state.getOrganizerByIdReducer) || {
    organizerData: [],
  };

  const data = store.organizerData;
  console.log(data, "OrganizerData....");

  useEffect(() => {
    dispatch(getOrganizerById(organizerId, setLoading));
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="pt-10">
      <h1>Organizer Details </h1>
      <div>
        <img src={data.profileImage} className="h-40 w-40 rounded-full border-2" alt="" />
        <p>Name:{data.name}</p>
        <p>Id:{data._id}</p>
        <p>email:{data.email}</p>
        <p>Address Details:</p>
        <p>
          {data.address},{data.city},{data.country}
        </p>
      </div>
    </div>
  );
}

export default GetOrganizerById;
