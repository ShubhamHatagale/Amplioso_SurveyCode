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
import ReportPdf from "./pages/Survey/steps/ReportPdf";

const SuperAdminRouting = () => { 

    return (
        <Switch>
            <Route exact path="/" render={() => (
                // <Redirect to="/unauthorized_tkn" />
                <TokenExpiredPage />

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
            <Route path="/ReportPdf">
                <ReportPdf />
            </Route>

        </Switch>
    );
};



// const colorOptions={
//     slices: {
//         0: { color: "rgb(168,26,12)" },
//         1: { color: "rgb(55,55,94)" },
//         2: { color: "rgb(53,98,136)" },
//         3: { color: "rgb(170,207,221)" },
//     },
// }

export default SuperAdminRouting