export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  postCode: string;
  language: string;
}
export interface User extends UserData {
  _id: number;
}

export interface Message {
  name?: string;
  isAuthor: boolean;
  content: string;
  timestamp: string;
}

export interface ConsultationInfo {
  id: string;
  consultationDate: Date;
  transcriptOriginal: string;
  transcriptTranslated: string;
  doctorId: string;
  patientId: {
    firstName: string;
    lastName: string;
    language: string;
  };
  doctorNotesOriginal: string;
  doctorNotesTranslated: string;
  painLevel: number;
  symptomsByArea: Symptom[];
  patientNotes: string;
  patientRating: number;
  isActive: boolean;
}

export interface ConsultationFeedback {
  patientRating: number;
  id: number;
}

export interface Symptom {
  area: string;
  symptom: string;
  img?: string;
  question?: string;
  selected: boolean;
}

export interface Doctor {
  lastName: string;
  firstName: string;
  id: number;
  language: string;
  docPublicCode: string;
}
