import {useEffect, useState} from "react";
import {countDiary, getUserDiary, IDiaryDto} from "../apis/Diary";
import {Cookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import style from "./myPage.module.css"
import Navbar from "../component/Navbar";

const MyPage = () : JSX.Element => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const [dList, setDList] = useState<IDiaryDto[]>([]);
    const [dNum, setDNum] = useState<number>(0);
    const [userId, setUserId] = useState('');
    const [dIndex, setDIndex] = useState(0);

    useEffect(() => {
        const userId = cookies.get('userId');
        if (!userId) {
            navigate('/login');
        }
        setUserId(userId);
        OnInit(userId);
    }, []);

    const OnInit = async (userId : string) => {
        await OnGetCount(userId);
        await OnGetUserDiary(userId);
    }

    const handleOnClick = () => {
        navigate('/result');
    }

    const OnGetCount = async (userId : string) => {
        const response = await countDiary(userId);
        setDNum(response);
        return response;
    }

    const OnGetUserDiary = async (userId : string) => {
        const response = await getUserDiary(userId);
        setDList(response);
        return response;
    }

    const handleOnLeftClick = () => {
        if (dIndex === 0)
            return ;
        setDIndex((dIndex) => dIndex - 1);
    }

    const handleOnRightClick = () => {
        if (dIndex === dNum - 1)
            return ;
        setDIndex((dIndex) => dIndex + 1);
    }

    const handleOnBackClick = () => {
        navigate('/diary');
    }

    return (
        <div className={style.container}>
            <button className={style.view_button} onClick={handleOnBackClick}>돌아가기</button>
            <div className={style.box}>
                <span className={style.diary_txt}>{userId}님이 작성하신 {dNum}개의 이야기들을 확인해보세요</span>
                {dList.length && <div className={style.diary_wrap_box}>
                    <button className={style.arrow_button} onClick={handleOnLeftClick}>{"<"}</button>
                    <div className={style.diary_box}>
                        <span className={style.diary_title}>#{dIndex + 1}일차</span>
                        <span className={style.diary_date}>{dList[dIndex].createdDate.toString().substring(0,10)}의 기록</span>
                        <button className={style.view_button}>보러가기</button>
                    </div>
                    <button className={style.arrow_button} onClick={handleOnRightClick}>{">"}</button>
                </div>}
                {dNum >= 3 ?
                    <div className={style.hidden_txt}>
                        <span className={style.delayed_txt}>5개 이상의 이야기가 작성되어 감정을 분석해볼 수 있어요!</span>
                        <button className={style.diary_button} onClick={handleOnClick}>분석하러 가기</button>
                    </div>
                            :
                    <div className={style.hidden_txt}>
                        <span className={style.delayed_txt}>감정 분석을 위해서는 5개 이상의 이야기들이 필요해요!</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default MyPage;