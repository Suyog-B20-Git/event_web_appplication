import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizer } from "../../redux/actions/master/Organizer/getOrganiser";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

function GetOrganizer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getOrganizer(setLoading));
  }, [dispatch]);

  const store = useSelector((state) => state.getOrganizerReducer) || {
    organizerData: [],
  };

  const data = store.organizerData;
  console.log(data, "OragnizerData....");

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Organiser Data</h1>
      <div className="grid grid-cols-4 gap-20">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate("/getOrganizerById", { state: item._id });
              }}
            >
              <img
                src={item.profileImage}
                alt=""
                height={"200px"}
                width={"300px"}
              />
              <h1>name:{item.name}</h1>
              <p>Id:{item._id}</p>
              <section>
                <p>Address:{item.address}</p>
                <p>
                  City:{item.city},{item.state}
                </p>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetOrganizer;
