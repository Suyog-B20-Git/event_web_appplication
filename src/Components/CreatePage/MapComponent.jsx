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
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.onload = initializeMap;
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = initializeMap;

    function initializeMap() {
      try {
        if (!window.google || !window.google.maps) {
          console.error("Google Maps API not loaded");
          return;
        }

        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 13,
          center: defaultLocation,
        });
        mapInstanceRef.current = map;

        // Set initial marker to default location using standard Marker
        markerRef.current = new window.google.maps.Marker({
          position: defaultLocation,
          map,
          title: "Default Marker",
        });
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    }

    return () => {
      // Don't remove the script as it might be used by other components
      // Just clean up the map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current = null;
      }
    };
  }, []);

  // Update marker and center when location is selected
  useEffect(() => {
    if (mapInstanceRef.current && isValidLocation && window.google && window.google.maps) {
      try {
        mapInstanceRef.current.setCenter(parsedLocation);

        if (markerRef.current) {
          markerRef.current.setPosition(parsedLocation);
        } else {
          markerRef.current = new window.google.maps.Marker({
            position: parsedLocation,
            map: mapInstanceRef.current,
            title: "Selected Marker",
          });
        }
      } catch (error) {
        console.error("Error updating map location:", error);
      }
    }
  }, [location, isValidLocation, parsedLocation]);



  return <div ref={mapRef} style={mapStyles}></div>;
};

export default MapContainer;
