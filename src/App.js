import React, { createContext, useEffect, useReducer } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import SurveyRouting from "./SurveyRouting";

function App() {
  return (
    <BrowserRouter >
         {/* <BrowserRouter basename={'/main_amp'} > */}
      <SurveyRouting />
    </BrowserRouter> 
  );
}

export default App;
