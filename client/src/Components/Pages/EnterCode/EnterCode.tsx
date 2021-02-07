import React, {
  useState,
  useEffect,
  useContext,
  FormEventHandler,
} from "react";
import FormInput from "../../Globals/FormInput/FormInput";
import humanSitting from "../../../assets/background-images/humans-sitting2.png";
import { getTranslatedText } from "../../../services/api.translate";
import { useMutation, useQuery } from "react-query";
import queries from "../../../services/graphqlService/queries";
import client from "../../../services/graphqlService/index";
import { Redirect, useHistory } from "react-router-dom";
import { ConsultationContext } from "../../../Contexts/Consultation.context";
import Spinner from "../../Globals/Spinner/Spinner";
import OKButton from "../../Globals/OKButton/OKButton";
import { PatientContext } from "../../../Contexts/Patient.context";

const EnterCode = () => {
  const [code, setCode] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [wrongCodeFormat, setFormatWarning] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  // consultation context
  const { updateDoctor } = useContext(ConsultationContext)!;

  // for redirection
  const history = useHistory();

  const { getTranslatedText } = useContext(PatientContext)!;
  const translatedText = getTranslatedText();
  const localText = translatedText.generalSymptomsTerms;
  const localTextUtils = translatedText.utils;

  useEffect(() => {
    setSubmitted(false);
    setFormatWarning(false);
  }, [code]);

  const changeCode = (_: string, value: string) => {
    setCode(value);
    setFormatWarning(false);
    setIsInvalid(false);
  };

  const { isLoading } = useQuery(
    "get doctor",
    async () => await client.request(queries.getDoctor, { code }),
    {
      enabled: submitted,
      onSuccess: (data) => {
        const {
          firstName,
          lastName,
          language,
          docPublicCode,
          id,
        } = data.getDoctor;
        console.log("data from server", data);
        updateDoctor(id, firstName, lastName, language, docPublicCode);
        history.push("/consultation/symptoms/general");
      },
      onError: () => setIsInvalid(true),
    }
  );

  const submitCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate format of doctor code (7 digits)
    const regex = /^[0-9]{7}$/; // 7 digits
    if (!regex.test(code)) setFormatWarning(true);
    else setSubmitted(true);
  };

  return (
    <div className="h-full w-full relative px-3 py-12 overflow-hidden flex justify-center flex-col items-center">
      <form
        className="h-48 w-5/6 flex flex-col justify-center items-center z-10"
        onSubmit={(e) => submitCode(e)}
      >
        <label className="text-extrabold text-2xl font-extrabold">
          {localText.enterDoctorCode}:
        </label>
        <div className="my-8 flex justify-center w-full px-3 tablet:w-2/3">
          <FormInput
            type="text"
            placeholder=""
            id="constultation-code"
            name="code"
            updateInput={changeCode}
            onSubmit={() => {}}
          />
        </div>
        {wrongCodeFormat ? (
          <p className="text-red-400 italic">Expected 7 Numbers</p>
        ) : null}
        {isInvalid ? <p className="text-red-400 italic">Invalid Code</p> : null}
        {isLoading && (
          <div className="w-full absolute flex justify-center top-1/3">
            <Spinner size={12} />
          </div>
        )}
        <OKButton
          name="code_btn"
          type="submit"
          value="Submit"
          text={localTextUtils.confirm}
          onClick={() => {}}
        />
      </form>
      <div className="bg-blue h-16 w-screen fixed bottom-0 left-0 flex items-center justify-center">
        <h2 className="text-white font-extrabold opacity-80">
          {localText.askAtReception}
        </h2>
      </div>
      <img
        src={humanSitting}
        alt="background human"
        className="absolute opacity-5 top-1/4"
      ></img>
    </div>
  );
};

export default EnterCode;
