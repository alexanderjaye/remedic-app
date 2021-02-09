import React, { useState } from "react";
import LocalServices from "./LocalServices/LocalServices";

const Services = () => {
  const [currentService, setCurrentService] = useState<string>(
    "Local Services"
  );
  const services: string[] = ["Local Services", "Translate Terms"];

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      {currentService === services[0] && (
        <div className="flex-grow w-full">
          <LocalServices />
        </div>
      )}

      {currentService === services[1] && (
        <div className="flex-grow w-full"></div>
      )}

      <div
        className={`h-14 bg-blue w-full grid grid-cols-${services.length} font-bold`}
      >
        {services.map((service, idx) => (
          <div
            className={`flex justify-center px-1 items-center row-auto ${
              service === currentService
                ? "text-blue bg-white"
                : "text-white bg-blue"
            }`}
            key={idx}
            onClick={() => setCurrentService(service)}
          >
            <h1 className="text-center">{service}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
