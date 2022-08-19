import React, { useEffect, useState } from "react";
import {
    Switch,
    Route,
    useHistory,
    useParams,
    Redirect,
} from "react-router-dom";

import SurveyHeader from "./components/SurveyHeader";
import Application from "./pages/test";
import Instruction from "./pages/Survey/Instruction";
import StepCheck from "./pages/Survey/StepCheck";

import WelcomeScreen from "./pages/Survey/welcomescreen";
import SurveyForm from "./pages/Survey/SurveyForm";
import TokenExpiredPage from "./pages/Survey/TokenExpiredPage";

const SuperAdminRouting = () => {

    return (
        <Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/unauthorized_tkn" />
            )} />

            <Route path="/tkn/:token_ele">
                <WelcomeScreen />
            </Route>
            <Route path="/instruction">
                <SurveyHeader data={<Instruction />}
                />
            </Route>
            <Route path="/StepCheck">
                <SurveyHeader data={<StepCheck />}
                />
            </Route>
            <Route path="/surveyform">
                <SurveyHeader data={<SurveyForm />}
                />
            </Route>
            <Route path="/unauthorized_tkn">
                <TokenExpiredPage />
            </Route>
        </Switch>
    );
};
export default SuperAdminRouting