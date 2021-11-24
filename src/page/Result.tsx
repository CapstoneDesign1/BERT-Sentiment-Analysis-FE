import { useState } from "react";
import Modal from "../component/modal/Modal";
import Navbar from "../component/navbar/Navbar";
import style from "./result.module.css"

const Result = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.box}>
                <div>
                    result 페이지
                </div>
            </div>
        </div>
    )
}

export default Result;