import React from "react";
import { Service } from "../../../types";

interface Props {
  fillColor: string;
  lat: number;
  lng: number;
}

const MapHomeIcon = (props: Props) => {
  return (
    <svg
      className={`${props.fillColor} w-8 h-8`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    </svg>
  );
};

export default MapHomeIcon;
