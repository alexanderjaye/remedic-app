import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useAuth } from "../../../../Contexts/Auth.context";
import getCoordsByPostcode from "../../../../services/api.geocode";
import client from "../../../../services/graphqlService";
import queries from "../../../../services/graphqlService/queries";
import { PatientContext } from "../../../../Contexts/Patient.context";
import LocationPin from "./LocationPin/LocationPin";
import { getNHSServices } from "../../../../services/api.nhs";
import { Service } from "../../../../types";
import {
  IDToServiceName,
  serviceBGColors,
} from "../../../../utils/NhsServices";
import MapHomeIcon from "../../../Globals/MapHomeIcon/MapHomeIcon";

interface Coordinates {
  lat: number;
  lng: number;
}

//lat lng
//OrganisationName
// OrganisationTypeID
// "Address1": "53 Circuit Lane",
//  "Address2": null,
//  "Postcode": null,
//  "City": "Reading",
//  "County": null,
//  "Latitude": 51.442909240722656,
//       "Longitude": -1.00676691532135,
//       "Postcode": "RG30 3AN",
//"URL": "http://www.berkshireindependenthospital.co.uk",

interface QueryService {
  Latitude: number;
  Longitude: number;
  OrganisationName: string;
  OrganisationTypeID: string;
  Address1?: string | null;
  Address2?: string | null;
  Address3?: string | null;
  City?: string | null;
  County?: string | null;
  Postcode?: string | null;
  URL?: string | null;
}

const LocalServices = () => {
  const { user } = useAuth();

  const [currentPractice, setCurrentPractice] = useState<Service>(
    {} as Service
  );

  const { coords, postcode } = useContext(PatientContext)!;
  const [services, setServices] = useState<Service[]>([]);
  // single service state that gets filled on childclick

  useEffect(() => {
    if (postcode) {
      getNHSServices(postcode)
        .then((value) => {
          const NHSServices = value.map((service: QueryService) => ({
            lat: service.Latitude,
            lng: service.Longitude,
            OrganisationName: service.OrganisationName,
            OrganisationTypeID: service.OrganisationTypeID,
            Address1: service.Address1,
            Address2: service.Address2,
            Address3: service.Address3,
            Postcode: service.Postcode,
            URL: service.URL,
          }));
          setServices(NHSServices);
        })
        .catch((e) => console.log(e));
    }
  }, [postcode]);

  if (coords.lat !== 0 || coords.lng !== 0) {
    return (
      <div className="w-full h-full">
        <div className="h-1/2 w-full px-2 py-2 bg-gray-100">
          <GoogleMapReact
            bootstrapURLKeys={{
              language: user?.language,
              key: process.env.REACT_APP_GOOGLE_TRANSLATE_KEY as string,
              libraries: ["places", "geometry"],
            }}
            defaultCenter={coords}
            defaultZoom={12}
            yesIWantToUseGoogleMapApiInternals={true}
            onChildClick={(key, childProps) =>
              setCurrentPractice(childProps.service)
            }
          >
            <MapHomeIcon
              lat={coords.lat}
              lng={coords.lng}
              fillColor="text-black"
            />
            {services &&
              services.map((s, idx) => (
                <LocationPin key={idx} lat={s.lat} lng={s.lng} service={s} />
              ))}
          </GoogleMapReact>
        </div>
        <div className="h-1/2 flex flex-col bg overflow-y-scroll">
          <div className="grid grid-cols-3 h-10 px-2 py-2 gap-2 bg-gray-100">
            <div className="bg-map-blue-600 h-8 flex justify-center items-center text-white font-semibold rounded-3xl">
              Dentist
            </div>
            <div className="bg-map-green-600 h-8  flex justify-center items-center text-white font-semibold rounded-3xl">
              GP
            </div>
            <div className="bg-map-orange-600 h-8 flex justify-center items-center text-white font-semibold rounded-3xl">
              Pharmacy
            </div>
          </div>
          <div className="grid grid-cols-2 h-12 gap-2 px-2 py-2 bg-gray-100">
            <div className="bg-map-red-600 h-8 flex justify-center items-center text-white font-semibold rounded-3xl">
              Hospital
            </div>
            <div className="bg-map-purple-600 h-8 flex justify-center items-center text-white font-semibold rounded-3xl">
              Opticians
            </div>
          </div>
          {/* Practice Display */}
          <div className="flex-grow flex justify-center items-center p-3">
            {currentPractice && Object.keys(currentPractice).length > 0 ? (
              <div className="h-full w-full max-w-xl max-h-64 flex flex-col p-3 shadow-2xl rounded-3xl overflow-y-scroll">
                <h1 className="text-sm pl-2">
                  {IDToServiceName(currentPractice.OrganisationTypeID)}
                </h1>
                <h1
                  className={`${
                    serviceBGColors[currentPractice.OrganisationTypeID]
                  } px-2 py-1 w-max max-w-full rounded-md text-white font-bold text-xl`}
                >
                  {currentPractice.OrganisationName}
                </h1>
                <h2 className="pl-2 font-semibold">
                  {currentPractice.Address1}
                </h2>
                <h2 className="pl-2 font-semibold">
                  {currentPractice.Address2}
                </h2>
                <h2 className="pl-2 font-semibold">
                  {currentPractice.Address3}
                </h2>
                <h2 className="pl-2 font-semibold">
                  {currentPractice.City}{" "}
                  {currentPractice.City && currentPractice.County ? ", " : null}{" "}
                  {currentPractice.County}
                </h2>
                <h2 className="pl-2 font-semibold">
                  {currentPractice.Postcode}
                </h2>
                <hr></hr>
                {currentPractice.URL && (
                  <a
                    className="pl-2 text-blue hover:text-underline"
                    href={currentPractice.URL}
                  >
                    {currentPractice.URL}
                  </a>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default LocalServices;
