"use client";

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

export interface Place {
  id: number;
  name: string;
  image: string;
  lat: number;
  lng: number;
  rating: number;      
  reviews: number;     
  type: string;      
  open: string;        
  close: string;      
}

export interface Props {
  place: Place;
}


const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { animate: true, duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

const PlaceMap: React.FC<Props> = ({ place }) => {
const customMarker = L.icon({
  iconUrl: "/images/pin.png",    // your custom image
  iconSize: [60, 60],            // width, height
  iconAnchor: [20, 40],          // the point corresponding to marker position
  popupAnchor: [0, -40],         // popup relative to icon
});

  const googleMapsUrl = `https://www.google.com/maps?q=${place.lat},${place.lng}`;

  const markerRef = useRef<L.Marker>(null);

  // Always keep popup open
  useEffect(() => {
    const interval = setInterval(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [place]);

  return (
    <MapContainer
      key={place.id}
      center={[place.lat, place.lng]}
      zoom={11}
      scrollWheelZoom={false}
      className="w-full h-full z-500"
    >
      <ChangeView center={[place.lat, place.lng]} zoom={11} />

      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <Marker ref={markerRef} position={[place.lat, place.lng]} icon={customMarker}>
        <Popup autoPan={false} closeButton={false}>
          <div
            style={{
              width: "250px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              backgroundColor: "white",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "120px" }}>
              <Image src={place.image} alt={place.name} fill style={{ objectFit: "cover" }} />
            </div>

            <div style={{ padding: "10px 12px" }}>
             <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: 4 }}>
              {place.name}
            </h3>
            <p style={{ fontSize: "12px", color: "#555" }}>
              {place.rating} ★ ({place.reviews}) · {place.type}
            </p>
            <p style={{ fontSize: "12px", color: "#16a34a", marginBottom: "8px" }}>
              Open: {place.open} · Closes: {place.close}
            </p>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "500",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
              >
                <span>📍</span> Open in Maps
              </a>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default PlaceMap;
