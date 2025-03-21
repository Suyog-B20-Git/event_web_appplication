/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";

const MapContainer = ({ location }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const GOOGLE_MAPS_API_KEY = "AIzaSyDBvQO - S7yEtX4__jyFra4HvGMz15MqGyE";
  const mapStyles = {
    height: window.innerWidth < 768 ? "200px" : "400px",
    width: "100%",
  };
  

  const defaultCenter = {
    lat: location ? location.lat : 40.7127753,
    lng: location ? location.lng : -74.0059728,
  };

  useEffect(() => {
    // Load the Google Maps JavaScript API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`;
    // script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_MAP_API_KEY}&libraries=marker`;
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
      // Cleanup script to prevent memory leaks
      document.head.removeChild(script);
    };
  }, [location]);

  return <div ref={mapRef} style={mapStyles}></div>;
};

export default MapContainer;
