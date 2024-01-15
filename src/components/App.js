import React from "react";
import FrontPage from './FrontPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResultPage from './ResultPage'
import HomePage from "./HomePage";

const App = ()  => {

    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play" element={<FrontPage />} />
            <Route path="/Results" element={<ResultPage />} />
        </Routes>
    </BrowserRouter>)
}

export default App;