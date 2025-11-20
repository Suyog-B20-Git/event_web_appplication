import React, { useEffect, useRef } from "react";

const MapContainer = ({ data }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_UNKNOWN_MAP_API_KEY_BY_MUSTAFA;
  const mapStyles = {
    height: window.innerWidth <= 768 ? "200px" : "400px",
    width: "90%",
    padding: "10px",
  };

  const defaultCenter = {
    lat:
      data?.googleSearchLat && !isNaN(Number(data.googleSearchLat))
        ? Number(data.googleSearchLat)
        : 40.7127753,
    lng:
      data?.googleSearchLong && !isNaN(Number(data.googleSearchLong))
        ? Number(data.googleSearchLong)
        : -74.0059728,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { AdvancedMarkerElement } = window.google.maps.marker;
      const map = new google.maps.Map(mapRef.current, {
        zoom: 13,
        center: defaultCenter,
        mapId: "76087fe6f44211bc",
      });

      markerRef.current = new AdvancedMarkerElement({
        position: defaultCenter,
        map,
        title: "Custom Marker",
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return (
    <div
      ref={mapRef}
      style={mapStyles}
      className="ml-[5%] lg:p-5 mr-0 lg:w-full mt-2 mb-6 border border-gray-300 shadow w-max"
    ></div>
  );
};

export default MapContainer;
