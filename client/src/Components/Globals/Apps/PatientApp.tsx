import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ConsultationContextProvider from "../../../Contexts/Consultation.context";
import ConsultationChat from "../../Pages/ConsultationChat/ConsultationChat";
import EnterCode from "../../Pages/EnterCode/EnterCode";
import Feedback from "../../Pages/Feedback/Feedback";
import PatientLanding from "../../Pages/PatientLanding/PatientLanding";
import SymptomsChecker from "../../Pages/SymptomsChecker/SymptomsChecker";

const PatientApp = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/consultation_chat">
            <ConsultationChat />
          </Route>
          <Route path="/enter_code">
            <EnterCode />
          </Route>
          <Route path="/feedback">
            <Feedback />
          </Route>
          <ConsultationContextProvider>
            <Route path="/symptoms_checker">
              <SymptomsChecker />
            </Route>
          </ConsultationContextProvider>
          <Route path="/patient">
            <PatientLanding />
          </Route>
          <Route>
            <Redirect to="/patient" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default PatientApp;
