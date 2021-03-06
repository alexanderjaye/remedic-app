import { useContext } from "react";
import { ConsultationContext } from "../../../../Contexts/Consultation.context";

interface Props {
  onHeadClick: () => void;
  onBodyClick: () => void;
  onArmsClick: () => void;
  onLegsClick: () => void;
}

const notSelectedStyle = "fill-current text-gray-light hover:text-blue cursor-pointer transition duration-300"
const selectedStyle = "fill-current text-red-negative cursor-pointer transition duration-300"

const Human = (props: Props) => {
  const {onHeadClick, onBodyClick, onArmsClick, onLegsClick} = props;
  const { physicalSymptoms } = useContext(ConsultationContext)!;

  const hasSymptomOf = (bodyPart: string) : boolean =>
    !!physicalSymptoms
      .filter(symptom => symptom.area === bodyPart)
      .find(symptom => symptom.selected === true)

  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 840.000000 1060.000000"
      preserveAspectRatio="xMidYMid meet" className="h-full flex justify-center items-center m-0">
      <g transform="translate(0.000000,1060.000000) scale(0.100000,-0.100000)"
      stroke="none">
        {/* HEAD  */}
        <path
        className={hasSymptomOf('Head') ? selectedStyle : notSelectedStyle}
        onClick={onHeadClick}
        d="M4083 10189 c-127 -16 -232 -92 -286 -206 -29 -63 -30 -69 -31 -221
        l-1 -157 -29 -3 -28 -4 4 -86 c5 -102 28 -162 90 -236 23 -26 47 -65 54 -86
        22 -64 38 -248 27 -313 l-10 -57 322 0 321 0 -7 53 c-8 57 6 250 21 308 6 20
        23 50 38 65 78 79 112 163 112 276 0 52 -2 58 -27 70 l-28 13 4 145 c4 176
        -11 228 -90 315 -68 74 -148 112 -259 125 -95 11 -109 11 -197 -1z"/>
        {/* BODY */}
        <path
        className={hasSymptomOf('Body') ? selectedStyle : notSelectedStyle}
        onClick={onBodyClick}
        d="M3822 8725 c-12 -19 -41 -49 -65 -66 -42 -31 -194 -110 -274 -142
        l-43 -17 0 -829 c0 -456 -5 -909 -10 -1007 -19 -330 -54 -582 -129 -923 -22
        -97 -47 -214 -56 -261 -9 -47 -19 -93 -21 -102 -5 -17 46 -18 976 -18 l980 0
        -5 23 c-108 478 -173 852 -194 1110 -7 78 -11 497 -11 1066 l0 938 -47 18
        c-140 53 -325 162 -365 215 l-22 30 -345 0 -346 0 -23 -35z"/>
        {/* ARMS */}
        <path
        className={hasSymptomOf('Arms') ? selectedStyle : notSelectedStyle}
        onClick={onArmsClick}
        d="M3308 8449 c-81 -33 -168 -89 -203 -131 -86 -102 -99 -204 -81 -613
        14 -327 -7 -462 -134 -835 -82 -244 -96 -301 -131 -560 -36 -267 -133 -605
        -189 -661 -24 -24 -57 -37 -177 -69 -25 -6 -67 -31 -100 -59 -78 -65 -213
        -206 -213 -221 0 -9 15 -11 54 -8 40 3 72 15 124 46 39 23 75 42 81 42 31 0
        -17 -143 -118 -358 -94 -200 -95 -205 -38 -267 l45 -50 44 43 c24 23 46 42 50
        42 3 0 1 -21 -3 -47 -32 -168 86 -69 202 170 13 26 26 47 29 47 4 0 3 -21 -1
        -47 -11 -68 -11 -211 1 -218 14 -9 37 33 84 156 24 63 68 173 99 244 30 72 76
        191 102 265 25 74 95 236 154 360 217 449 328 778 376 1110 14 101 16 210 13
        881 l-3 766 -67 -28z M5030 7665 c0 -889 0 -880 65 -1130 66 -251 159 -494 315 -815 60
        -124 130 -286 155 -360 26 -74 72 -193 102 -265 31 -71 75 -181 99 -244 47
        -123 70 -165 84 -156 12 7 12 150 1 218 -4 26 -5 47 -2 47 3 0 23 -34 44 -75
        56 -107 112 -191 142 -211 23 -15 28 -15 41 -2 13 12 14 25 6 67 -5 28 -7 51
        -4 51 4 0 26 -19 50 -42 l44 -43 45 50 c57 63 57 68 -41 273 -117 246 -143
        326 -110 339 9 3 26 0 38 -8 64 -42 132 -69 172 -69 29 0 44 4 44 13 0 16
        -231 242 -267 260 -15 8 -60 22 -99 31 -39 10 -84 26 -101 36 -75 46 -173 371
        -222 745 -29 214 -34 234 -122 495 -131 390 -150 520 -132 927 6 145 7 276 2
        315 -17 142 -96 245 -240 317 -45 23 -88 41 -95 41 -12 0 -14 -126 -14 -805z"
        />
        {/* LEGS */}
        <path
        className={hasSymptomOf('Legs') ? selectedStyle : notSelectedStyle}
        onClick={onLegsClick}
        d="M3206 5273 c-33 -164 -47 -434 -35 -720 9 -233 14 -301 60 -775 16
        -169 29 -338 29 -375 0 -38 -14 -160 -31 -273 -28 -183 -31 -230 -32 -435 0
        -255 10 -371 73 -822 62 -440 68 -654 25 -917 -17 -108 -34 -154 -89 -239 -93
        -146 -111 -226 -60 -266 43 -34 101 -44 239 -44 220 1 240 16 256 198 10 119
        17 662 11 930 -4 153 -13 94 108 665 l42 195 8 315 c8 270 12 326 30 390 79
        289 92 358 134 715 8 72 29 200 45 287 36 185 63 391 87 656 l18 192 76 0 76
        0 23 -239 c25 -268 47 -431 85 -633 14 -75 33 -196 41 -270 41 -337 56 -418
        135 -708 18 -64 22 -122 30 -390 5 -209 13 -340 24 -390 8 -41 40 -192 71
        -334 63 -295 74 -380 64 -521 -17 -236 -2 -888 22 -977 7 -27 19 -43 40 -54
        39 -20 196 -36 274 -28 227 22 255 91 120 289 -72 104 -84 138 -110 320 -20
        130 -22 393 -5 545 6 58 26 215 45 350 85 614 91 852 30 1255 -32 207 -31 240
        5 613 45 472 51 551 59 782 10 290 -3 554 -35 713 l-6 27 -988 0 -988 0 -6
        -27z"/>
      </g>
    </svg>
  )
}

export default Human
