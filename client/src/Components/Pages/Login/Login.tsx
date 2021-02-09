import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/Auth.context";
import { validateLoginForm } from "../../../utils/auth/validation.helper";
import AuthButton from "../../Globals/AuthButton/AuthButton";
import FormInput from "../../Globals/FormInput/FormInput";
import logoReduced from "../../../assets/logos/logo-reduced.svg";
import { Transition } from '@headlessui/react';

import staticTranslations from "../../../utils/static-translations.json";
const translations = staticTranslations as any;

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const { loginUser } = useAuth();
  const [error, setError] = useState<boolean>(false);

  const localLanguage: string =
    localStorage.getItem("preferredLanguage") || "en";

  const [userInfo, setUserInfo] = useState<Credentials>({
    email: "",
    password: "",
  });

  const updateInput = (inputName: string, value: string) => {
    setError(false)
    setUserInfo({ ...userInfo, [inputName]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginUser(userInfo.email, userInfo.password);
      !res && setError(true);
    } catch (error) {
      console.error(error);
    }
  };

  const localText = translations[localLanguage].loginAndRegisterTerms;

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity ease-in-out duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="flex items-center justify-center flex-col bg-white-dark min-h-screen lg:m-1 w-inherit min-w-min py-4"
    >
      <form
        className="relative bg-white h-full w-5/6 max-w-xl shadow-lg  rounded-lg p-12 flex flex-col items-center justify-between py-20"
        onSubmit={handleSubmit}
      >
        <div className="z-10">
          <h2 className="bg-gradient-to-r from-green-light to-blue-light bg-clip-text text-transparent text-5xl font-bold text-center mb-12 py-2">
            {localText.login}
          </h2>
        </div>
        <div className="items-center flex flex-col gap-y-6 mb-12">

          <div className="flex flex-col w-full items-center">
            <label htmlFor="email" className="font-bold text-blue self-start mb-2">
              {localText.email}
            </label>
            <FormInput
              type="email"
              placeholder={localText.email}
              id="email"
              name="email"
              updateInput={updateInput}
              onSubmit={() => {}}
            />
          </div>

          <div className="flex flex-col w-full items-center">
            <label htmlFor="password" className="font-bold text-blue self-start mb-2">
              {localText.password}
            </label>
            <FormInput
              type="password"
              placeholder={localText.password}
              id="password"
              name="password"
              updateInput={updateInput}
              onSubmit={() => {}}
            />
          </div>
        </div>
        <div className="flex flex-col align-center">
          <AuthButton
            name="Login Button"
            value="Login"
            text={localText.login}
            condition={validateLoginForm(userInfo.email, userInfo.password)}
          />
          <h2 className="center text-center my-2 text-blue-dark tracking-tighter">——————</h2>
          <Link to="/register">
            <p className="text-blue hover:text-blue-dark text-center">
              {localText.register}
            </p>
          </Link>
        </div>
        <img src={logoReduced} className="w-72 opacity-10 absolute top-0"></img>
      </form>
      <div
        className={`flex items-center justify-center p-3 w-2/3 shadow-lg rounded-lg
        bg-red-500 fixed bottom-5 bg-opacity-90 transition transform-gpu duration-500
        ${!error && "translate-y-full opacity-0"} h-16 text-white font-bold border-red-dark
        border-solid border-2 text-lg`}
        id="error_board"
      >
        <p className="text-lg text-center">Invalid email or password</p>
      </div>
    </Transition>
  );
};

export default Login;
