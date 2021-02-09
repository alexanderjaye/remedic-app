import React, { useState } from "react";
import { IoLanguageSharp } from "react-icons/io5";
import OKButton from "../../Globals/OKButton/OKButton";
import supportedLanguages from "../../../utils/supported-languages.json";
import { useHistory } from "react-router-dom";
import RemedicLogo from "../../../assets/logos/Remedic Text Logo.png";
import SpinningGlobe from "../../Globals/Spinning Globe/SpinningGlobe";
import Tick from "../../../assets/utils/tick.svg";
import { Transition } from "@headlessui/react";

const LanguageChoice = () => {
  const history = useHistory();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("preferredLanguage") || ""
  );

  const onLanguageChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSelectedLanguage(e.target.id);
  };
  const handleSubmit = () => {
    if (selectedLanguage) {
      localStorage.setItem("preferredLanguage", selectedLanguage);
      history.push("/login");
    }
  };

  return (
    <Transition
    appear={true}
    show={true}
    enter="transition-opacity ease-in-out duration-700"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    className="flex-col flex justify-center min-h-screen min-w-screen max-w-3xl mx-auto relative"
  >
      <div className="flex flex-col px-16 h-full justify-evenly items-center overflow-hidden z-10">
        {" "}
        <div className="flex justify-center w-full tablet:w-2/3">
          <img src={RemedicLogo} alt="Remedic Logo" />
        </div>
        <div className="flex flex-col items-center mb-4 w-full tablet:w-3/4">
          <IoLanguageSharp className="inline mr-3 h-5 w-5 self-center" />
          <p className=" text-lg inline whitespace-nowrap text-center">
            Please choose your language:
          </p>
          <form
            className="mt-5 p-3 max-h-96 overflow-y-auto w-full"
            onChange={onLanguageChange}
          >
            {supportedLanguages &&
              supportedLanguages.languages.map((language) => (
                <label
                  htmlFor={language.langCode}
                  className={`appearance-none text-lg flex align-center justify-between my-2 cursor-pointer
                    ${selectedLanguage === language.langCode && "bg-gray-200"}
                    hover:bg-gray-200 opacity-60 p-2 rounded-md`}
                  key={language.langCode}
                >
                  {language.nativeName}
                  <input
                    type="radio"
                    name="lang"
                    id={language.langCode}
                    value={language.englishName}
                    checked={selectedLanguage === language.langCode}
                    onChange={() => {}}
                    className="hidden"
                  />
                  {selectedLanguage === language.langCode ? (
                    <img
                      src={Tick}
                      alt="tick"
                      className={"h-6 bg-green-500 p-0.5"}
                    />
                  ) : (
                    <div className={"h-6 w-6 bg-gray-300"} />
                  )}
                </label>
              ))}
          </form>
          <div className="pt-2 w-full flex justify-center">
            <OKButton
              name="confirm"
              type="submit"
              value="confirm"
              text="Confirm"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <SpinningGlobe
        classes="opacity-5 absolute left-1/2 -ml-48 w-full"
        size={400}
      ></SpinningGlobe>
    </Transition>
  );
};

export default LanguageChoice;
