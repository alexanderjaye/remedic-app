import React from "react";

const SymptomsChecker = () => {
  return (
    <div className=" h-full overflow-hidden">
      <div className="fixed top-0 whitespace-nowrap w-screen py-4 bg-green-light">
        <h1 className="text-bold text-2xl text-center">
          Please specify your symptoms:
        </h1>
      </div>

      <ul className="mt-10 w-full px-3 flex flex-col items-center pt-10">
        <h1 className="text-center font-bold text-xl">
          How are you generally feeling:
        </h1>
        <li className="mt-6 px-4 flex items-center">
          <div className="flex items-center justify-center flex-wrap">
            <button className="h-20 w-20 flex justify-center flex-col hover:bg-blue-light mx-2">
              <p className="text-3xl self-center">😢</p>
              <p>Bad</p>
            </button>
            <button className="flex-col h-20 w-20 flex justify-center hover:bg-blue-light mx-2">
              <p className="text-3xl self-center">🙂</p>
              <p>Ok</p>
            </button>
            <button className="flex-col h-20 w-20 flex justify-center hover:bg-blue-light mx-2">
              <p className="text-3xl self-center">😃</p>
              <p>Good</p>
            </button>
            <button className="flex-col h-20 w-20 flex justify-center hover:bg-blue-light mx-2">
              <p className="text-3xl self-center">😎</p>
              <p>Very good!</p>
            </button>
            <button className="flex-col h-20 w-20 flex justify-center hover:bg-blue-light mx-2">
              <p className="text-3xl self-center">🤩</p>
              <p>Amazing!</p>
            </button>
          </div>
        </li>
        <li className="mt-10 w-full bg-blue-superlight rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Are you sleeping well?
          </h1>
          <div className="flex justify-center mt-3">
            <button className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3">
              Yes
            </button>
            <button className="px-4 py-2 bg-red-negative rounded-lg  hover:bg-red-dark  text-opacity-50 ml-3">
              No
            </button>
          </div>
        </li>
        <li className="mt-10 w-full bg-blue-light p-2 rounded-md">
          <h1 className="text-center whitespace-nowrap">Are you eating?</h1>
          <div className="flex justify-center mt-3">
            <button className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3">
              Yes
            </button>
            <button className="px-4 py-2 bg-red-negative  rounded-lg  hover:bg-red-dark text-opacity-50 ml-3">
              No
            </button>
          </div>
        </li>

        <li className="mt-10 w-full  bg-blue-superlight rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Do you have a high temperature?
          </h1>
          <div className="flex justify-center mt-3">
            <button className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3">
              Yes
            </button>
            <button className="px-4 py-2 bg-red-negative  rounded-lg  hover:bg-red-dark  text-opacity-50 ml-3">
              No
            </button>
          </div>
        </li>
        <li className="mt-10 w-full bg-blue-light rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Are you taking any medications?
          </h1>
          <div className="flex justify-center mt-3">
            <button className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3">
              Yes
            </button>
            <button className="px-4 py-2 bg-red-negative  rounded-lg  text-opacity-50 ml-3">
              No
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SymptomsChecker;
