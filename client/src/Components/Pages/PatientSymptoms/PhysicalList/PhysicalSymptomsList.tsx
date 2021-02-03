import React, { useContext } from 'react'
import backArrow from '../../../../assets/utils/back-arrow.svg';
import { ConsultationContext } from '../../../../Contexts/Consultation.context';

interface Props {
  area?: string;
  onBackArrowClick: () => void;
}

const PhysicalSymptomsList = (props: Props) => {
  const { area, onBackArrowClick } = props;
  const { physicalSymptoms, toggleSymptomSelect } = useContext(ConsultationContext)!;

  const areaSymptoms = physicalSymptoms.filter((symptom) => {
    return area === symptom.area;
  })

  const iconClasses = "flex flex-col justify-between items-center";

  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col">
      {/* Top Container */}
      <div className="bg-green  text-white h-28 w-full flex items-center justify-between pr-8 z-10">
        <div 
          className="h-full flex justify-center items-center w-1/4 hover:bg-gray-300"
          onClick={onBackArrowClick}
        >
          <img src={backArrow} alt="back" className="w-12 text-white" />
        </div>
        <h1 className="font-extrabold text-2xl bg-white text-green px-2 py-1">{area}</h1>
      </div>
      <div className="flex-grow px-3 py-3 overflow-y-scroll z-10">
        <div className="grid grid-cols-2 gap-5 h-5/6 py-4">
          {
            areaSymptoms.map((symptom, i) => (
              <div 
                key={i} 
                className={symptom.selected ? 'bg-green ' + iconClasses : iconClasses}
                onClick={() => toggleSymptomSelect(symptom)}
              >
                <img src={symptom.img} alt={symptom.symptom} className="w-24 p-2 mb-2"/>
                <h2 className="font-bold">{symptom.symptom}</h2>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PhysicalSymptomsList