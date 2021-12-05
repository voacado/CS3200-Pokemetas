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
                <Route path="/" children={<Dashboard />}/>
                <Route path="/home" children={<Home />}/>
                <Route path="/single-team-eval" children={<SingleTeamEval />}/>
                {/* <Route path="/page-3" children={<Page3 />}/> */}
                <Route component={NotFound}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routes;