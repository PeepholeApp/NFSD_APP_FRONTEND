import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef } from "react";
import "./Map.css";

mapbox.accessToken = import.meta.env.VITE_MAPBOX;

function Map({ address, mapView, activities }) {
  const mapRef = useRef(); //
  const mapElementRef = useRef();
  const markerRef = useRef(); //instancia del marcador

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
  }, [activities, mapView, mapRef]);

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
  }, [address, mapView, mapRef]);

  useEffect(() => {
    if (mapElementRef.current) {
      mapRef.current = new mapbox.Map({
        container: mapElementRef.current,
        center: [-3.6947187, 40.4201029],
        zoom: 12.94,
      });
    }
  }, [mapElementRef, mapView]);

  return <div className="mapStyle" ref={mapElementRef}></div>;
}
export default Map;
