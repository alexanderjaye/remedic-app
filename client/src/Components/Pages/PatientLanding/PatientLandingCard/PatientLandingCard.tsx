import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  bgColorClass: string;
  title: string;
  textColor: string;
  path: string;
}

const PatientLandingCard = (props: Props) => {
  let history = useHistory();
  const handleClick = (path: string) => {
    history.push(path);
  };

  return (
    <div
      className={
        props.bgColorClass +
        " relative h-20 w-3/4 max-w-xl flex justify-end p-2 rounded-b-2xl z-10 opacity-90 to-transparent cursor-pointer shadow-2xl"
      }
      onClick={() => handleClick(props.path)}
    >
      <div className="flex justify-end items-center absolute bottom-3 text-right">
        <h1 className={"text-" + props.textColor + " font-bold px-2 text-xl"}>
          {props.title}
        </h1>

        <svg
          className="w-6 h-6"
          fill={props.textColor}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            stroke={props.textColor}
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default PatientLandingCard;
