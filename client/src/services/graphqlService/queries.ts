import gql from "graphql-tag";

const queries = {
  // will return an access token.
  loginPatient: gql`
    query($password: String!, $email: String!) {
      loginPatient(password: $password, email: $email)
    }
  `,

  // will return null if there's no refresh token sent in the cookie. Otherwise, creates an access token.
  loginPatientWithToken: gql`
    query {
      loginWithTokenPatient
    }
  `,

  // returns a token.
  loginDoctor: gql`
    query($password: String!, $email: String!) {
      loginDoctor(password: $password, email: $email)
    }
  `,

  loginDoctorWithToken: gql`
    query {
      loginWithTokenDoctor
    }
  `,

  //todo confirm list of fields returned from BE
  // get a patient by the DB id.
  getPatient: gql`
    query($id: Float!) {
      getPatient(id: $id) {
        firstName
        lastName
        postCode
        language
        email
        postCode
      }
    }
  `,

  // todo: confirm list of fields returned
  // get a doctor by db Id or the publicCode. Both fields are optional
  getDoctor: gql`
    query($code: String, $id: Float) {
      getDoctor(docPublicCode: $code, id: $id) {
        id
        firstName
        lastName
        language
        docPublicCode
      }
    }
  `,

  //todo remove fields not needed.
  // get one consultation by the consultation id.
  getConsultation: gql`
    query($id: Float!) {
      getOneConsultation(id: $id) {
        id
        consultationDate
        symptomsByArea {
          area
          symptom
        }
        painLevel
        patientNotes
        transcriptOriginal
        transcriptTranslated
        patientRating
        doctorNotesOriginal
        doctorNotesTranslated
        patientId {
          firstName
          lastName
          language
        }
        doctorId {
          firstName
          lastName
        }
      }
    }
  `,

  //todo remove fields not needed. note, not added all the patient/doctor fields available
  // gets all consultations associated with one patient.
  getPatientConsultations: gql`
    query($id: Float!) {
      getPatientConsultations(patientId: $id) {
        id
        consultationDate
        symptomsByArea {
          area
          symptom
        }
        painLevel
        patientNotes
        transcriptOriginal
        transcriptTranslated
        prescriptions {
          medicine
          dose
          frequency
        }
        patientRating
        doctorNotesOriginal
        doctorNotesTranslated
        patientId {
          firstName
        }
        doctorId {
          id
          firstName
          lastName
        }
      }
    }`,

 // gets all consultations associated with one doctor.
 getDoctorConsultations: gql `
 query($id: Float!) {
   getDoctorConsultations(doctorId: $id) {
     id
     consultationDate
     symptomsByArea {
       area
       symptom
     }
     painLevel
     patientNotes
     transcriptOriginal
     transcriptTranslated
     patientRating
     doctorNotesOriginal
     doctorNotesTranslated
     patientId {
       firstName
       lastName
       language
     }
     doctorId {
       id
       firstName
     }
   }
 }`,

getActiveConsultations: gql `
query($id: Float!, $isActive: Boolean!) {
  getActiveConsultations(doctorId: $id, isActive: $isActive) {
    id
    consultationDate
    isActive
    symptomsByArea {
      area
      symptom
    }
    painLevel
    patientNotes
    transcriptOriginal
    transcriptTranslated
    patientRating
    doctorNotesOriginal
    doctorNotesTranslated
    patientId {
      firstName
      lastName
      language
    }
  }
}`,
};

export default queries;
