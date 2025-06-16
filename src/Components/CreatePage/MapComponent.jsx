/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";

const MapContainer = ({ location }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const GOOGLE_MAPS_API_KEY = "AIzaSyDBvQO-S7yEtX4__jyFra4HvGMz15MqGyE";

  const mapStyles = {
    height: window.innerWidth <= 768 ? "200px" : "400px",
    width: "100%",
  };

  const isValidLocation =
  location &&
  !isNaN(parseFloat(location.lat)) &&
  !isNaN(parseFloat(location.lng));

const parsedLocation = isValidLocation
  ? {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng),
    }
  : {
      lat: 40.7127753,
      lng: -74.0059728,
    };


  const defaultLocation = (location?.lat && location?.lng)
  ? { lat: location.lat, lng: location.lng }
  : { lat: 40.7127753, lng: -74.0059728 }; // Default to New York

  // Load Google Maps script and initialize map
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { AdvancedMarkerElement } = window.google.maps.marker;
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: defaultLocation,
        mapId: "76087fe6f44211bc",
      });
      mapInstanceRef.current = map;

      // Set initial marker to default location
      markerRef.current = new AdvancedMarkerElement({
        position: defaultLocation,
        map,
        title: "Default Marker",
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Update marker and center when location is selected
useEffect(() => {
  if (mapInstanceRef.current && isValidLocation) {
    mapInstanceRef.current.setCenter(parsedLocation);

    if (markerRef.current) {
      markerRef.current.position = parsedLocation;
    } else {
      const { AdvancedMarkerElement } = window.google.maps.marker;
      markerRef.current = new AdvancedMarkerElement({
        position: parsedLocation,
        map: mapInstanceRef.current,
        title: "Selected Marker",
      });
    }
  }
}, [location]);



  return <div ref={mapRef} style={mapStyles}></div>;
};

export default MapContainer;
