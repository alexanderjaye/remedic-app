import React from "react";
import { Symptom } from "../../../../types";
import languages from "../../../../utils/supported-languages.json";

interface Props {
  currentConsultation: {
    painLevel: number;
    patientId: {
      language: string;
    };
    symptomsByArea: Symptom[];
  };
}

const langEnglishName = (langCode: string) =>
  languages.languages.find((l) => l.langCode === langCode)?.englishName;

const SymptomDescriptor = (props: Props) => {
  const { currentConsultation } = props;
  return (
    <div className="flex flex-col items-center justify-center h-full pt-24">
      <h1 className="text-xl font-bold text-blue-dark">
        Pain intensity:{" "}
        <span className="text-black">{currentConsultation.painLevel}</span>
      </h1>
      <h1 className="text-xl font-bold text-blue-dark mt-4">
        Patient language:{" "}
        <span className="text-black">
          {langEnglishName(currentConsultation.patientId.language)}
        </span>
      </h1>
      <h1 className="text-xl font-bold mt-4 text-blue-dark">
        General symptoms
      </h1>
      <ul>
        {currentConsultation.symptomsByArea
          .filter((s: any) => s.area === "Global")
          .map((s: any) =>
            s.symptom.split(",").map((sym: string, i: number) => (
              <li className="list-disc ml-12" key={i}>
                {sym}
              </li>
            ))
          )}
      </ul>
      <h1 className="text-xl font-bold mt-4 text-blue-dark">
        Specific Symptoms by Area
      </h1>
      {currentConsultation.symptomsByArea
        .filter((s: any) => s.area !== "Global")
        .map((s: any, i: number) => (
          <React.Fragment key={i}>
            <h3 className="font-semibold ml-4 text-green-dark">{s.area}</h3>
            <ul>
              {s.symptom.split(",").map((sym: string, j: number) => (
                <li className="list-disc ml-12" key={j}>
                  {sym}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
    </div>
  );
};

export default SymptomDescriptor;
