import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import SingleTeamEval from "./pages/SingleTeamEval";
// import Page3 from "./pages/Page-3";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function Routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/single-team-eval" element={<SingleTeamEval />}/>
                <Route element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routes;