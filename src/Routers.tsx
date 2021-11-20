import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./page/Main";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Diary from "./page/Diary";
import Write from "./page/Write";
import React from "react";

const Routers = () : JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/diary/write" element={<Write />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;