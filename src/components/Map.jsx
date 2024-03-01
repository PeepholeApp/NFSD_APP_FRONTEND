import React, { useState, useEffect, useRef } from "react";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapbox.accessToken = import.meta.env.VITE_MAPBOX;

function Map({ address, activities }) {
  const mapRef = useRef(); //
  const mapElementRef = useRef();
  const markerRef = useRef(); //instancia del marcador
  console.log(address);

  useEffect(() => {
    if (mapRef.current && activities.length) {
      const activitiesWithCoordinates = activities.filter(
        (activity) => activity.latitude
      );
      activitiesWithCoordinates.forEach((activity) => {
        const marker = new mapbox.Marker()
          .setLngLat([activity.longitude, activity.latitude])
          .addTo(mapRef.current);
      });
    }
  }, [activities, mapRef]);

  useEffect(() => {
    if (mapRef.current && address) {
      const coordinates = address.features[0].geometry.coordinates;
      if (!markerRef.current) {
        console.log("coordinates", coordinates);
        markerRef.current = new mapbox.Marker({ color: "red" })
          .setLngLat(coordinates)
          .addTo(mapRef.current);
      } else {
        markerRef.current.setLngLat(coordinates);
      }
      mapRef.current.panTo(coordinates);
    }
  }, [address, mapRef]);

  useEffect(() => {
    if (mapElementRef.current) {
      mapRef.current = new mapbox.Map({
        container: mapElementRef.current,
        center: [-3.6947187, 40.4201029],
        zoom: 12.94,
      });
    }
  }, [mapElementRef]);

  return <div style={{ width: 800, height: 500 }} ref={mapElementRef}></div>;
}
export default Map;
