import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganisers } from "../ReactRedux/slice/organiserSlice";

const OrganiserList = () => {
  const dispatch = useDispatch();
  const { organisers, isLoading, error } = useSelector((state) => state.organiser);

  useEffect(() => {
    dispatch(fetchOrganisers()); // Fetch organisers when the component mounts
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Organisers</h2>
      <ul>
        {organisers.map((organiser) => (
          <li key={organiser._id}>
            <h3>{organiser.name}</h3>
            <p>{organiser.description}</p>
            <p>📍 {organiser.city}, {organiser.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganiserList;

