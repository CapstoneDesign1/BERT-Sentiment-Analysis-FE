import style from './diary.module.css'
import Navbar from "../component/Navbar";
import {RouterProps, useNavigate} from "react-router-dom";

const Diary = () : JSX.Element => {

    const navigate = useNavigate();
    const userId = "simi";

    const handleOnReadClick = () => {
        navigate(`/diary/${userId}`);
    }

    const handleOnWriteClick = () => {
        navigate('/diary/write');
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