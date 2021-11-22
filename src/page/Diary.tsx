import style from './diary.module.css'
import Navbar from "../component/Navbar";
import {useNavigate} from "react-router-dom";
import { Cookies } from 'react-cookie';
import {useEffect, useState} from "react";

const Diary = () : JSX.Element => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        setUserId(cookies.get('userId'));
    }, []);

    const handleOnReadClick = () => {
        userId ? navigate('/diary/me') : navigate('/login');
    }

    const handleOnWriteClick = () => {
        userId ? navigate('/diary/write') : navigate('/login');
    }

    return (
        <div className={style.container}>
            <Navbar />
            <div className={style.box}>
                <div className={style.in_box}>
                    <span className={style.diary_txt}>"내가 나를 기록한 기억들"</span>
                    <button className={style.diary_button} onClick={handleOnReadClick}>읽어보러 가기</button>
                </div>
                <div className={style.line}> </div>
                <div className={style.animation_box}>
                    <div className={style.in_box2}>
                        <span className={style.diary_txt}>"우리가 기다리는 당신의 솔직한 마음"</span>
                        <button className={style.diary_button} onClick={handleOnWriteClick}>작성하러 가기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Diary;