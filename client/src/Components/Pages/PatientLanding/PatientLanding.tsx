import React, { useContext } from "react";
import PatientLandingCard from "./PatientLandingCard/PatientLandingCard";
import bgHumanOne from "../../../assets/background-images/humans-sitting.png";
import bgHumanTwo from "../../../assets/background-images/humans-standing.png";
import logoReduced from "../../../assets/logos/logo-reduced.svg";
import { AuthContext } from "../../../Contexts/Auth.context";
import { PatientContext } from "../../../Contexts/Patient.context";
import { useHistory } from "react-router-dom";
import { Transition } from "@headlessui/react";
interface LandingCards {
  route?: string;
  title: string;
  bgColorClass: string;
  textColor: string;
  path: string;
}

//TODO add routes
const PatientLanding = () => {
  const { logout } = useContext(AuthContext)!; // logout from auth context
  const { getTranslatedText } = useContext(PatientContext)!;
  const history = useHistory();
  const localText = getTranslatedText().patientLandingTerms;

  // put landingCards in here
  const landingCards: LandingCards[] = [
    {
      title: localText.startConsultation,
      bgColorClass: "bg-green-dark",
      textColor: "white",
      path: "/consultation/enter_code",
    },
    {
      title: "Services",
      bgColorClass: "bg-blue",
      textColor: "white",
      path: "/patient/services",
    },
    {
      title: localText.profile,
      bgColorClass: "bg-map-orange-400",

      textColor: "white",
      path: "/patient/profile",
    },
  ];

  const handleLogoutClick = (): void => {
    logout();
    history.push("/language");
  };

  return (
    <Transition
    appear={true}
    show={true}
    enter="transition-opacity ease-in-out duration-700"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    className="h-full w-full relative p-3 overflow-hidden"
  >
      <div className="flex items-center justify-center h-28 absolute w-full">
        <img
          src={logoReduced}
          alt="logo"
          className="w-24 top-8 animate-pulse"
        ></img>
      </div>
      <div className="h-full flex flex-col justify-around items-center py-20">
        {landingCards.map((card, i) => (
          <PatientLandingCard
            key={i}
            title={card.title}
            bgColorClass={card.bgColorClass}
            textColor={card.textColor}
            path={card.path}
          />
        ))}
      </div>
      <img
        src={bgHumanOne}
        alt="background human"
        className="absolute top-1/4 -right-12 opacity-10 w-72"
      ></img>
      <img
        src={bgHumanTwo}
        alt="background human"
        className="absolute top-16 -left-12 opacity-10 w-72"
      ></img>
      <div className="bg-blue h-16 w-screen fixed bottom-0 left-0 flex items-center justify-center">
        <button
          className="px-8 py-2 text-white border border-white rounded-xl border-solid font-extrabold text-xl focus:bg-white focus:text-blue"
          onClick={() => handleLogoutClick()}
        >
          Logout
        </button>
      </div>
    </Transition>
  );
};

export default PatientLanding;
