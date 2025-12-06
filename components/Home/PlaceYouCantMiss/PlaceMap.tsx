"use client";

import React from "react";

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

interface Props {
  place: Place;
}

const PlaceMap: React.FC<Props> = ({ place }) => {
  const mapSrc = `https://maps.google.com/maps?q=${place.lat},${place.lng}&t=m&z=14&output=embed&iwloc=near`;

  return (
    <iframe
      src={mapSrc}
      width="100%"
      height="100%"
      style={{ 
        border: 0,
        filter: "invert(90%) hue-rotate(180deg) contrast(90%)"
      }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={place.name}
    />
  );
};

export default PlaceMap;