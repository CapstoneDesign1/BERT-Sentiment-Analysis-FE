import React, {useEffect, useState} from "react";
import {countDiary, getOneDiary, getUserDiary, IDiaryDto} from "../apis/Diary";
import {Cookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import style from "./myPage.module.css"
import Navbar from "../component/navbar/Navbar";
import Slider from "react-slick";
import Modal from "../component/modal/Modal";

const MyPage = () : JSX.Element => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const [dList, setDList] = useState<IDiaryDto[]>([]);
    const [dNum, setDNum] = useState<number>(0);
    const [userId, setUserId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dto, setDto] = useState<IDiaryDto | undefined>(undefined);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
    }

    useEffect(() => {
        const userId = cookies.get('userId');
        if (!userId) {
            navigate('/login');
        }
        setUserId(userId);
        OnInit(userId);
    }, []);

    const OnInit = async (userId : string) => {
        try {
            await OnGetCount(userId);
            await OnGetUserDiary(userId);
        } catch(e) {

        }
    }

    const OnGetCount = async (userId : string) => {
        try {
            const response = await countDiary(userId);
            setDNum(response);
            return response;
        } catch(e) {

        }
    }

    const OnGetUserDiary = async (userId : string) => {
        try {
            const response = await getUserDiary(userId);
            setDList(response);
            return response;
        } catch(e) {

        }
    }

    const OnGetOneDiary = async (diary_id : number) => {
        try {
            const response = await getOneDiary(diary_id);
            setDto(response);
            return response;
        } catch (e) {

        }
    }

    const handleNoDiaryClick = () => {
        navigate('/diary/write');
    }

    const handleOnClick = async () => {
        navigate('/result');
    }

    const handleOnViewClick = async (diary_id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await OnGetOneDiary(diary_id);
            setIsModalOpen(true);
            return response;
        } catch(e) {

        }
    }

    return (
        <div className={style.container}>
            <Navbar />
            <div className={style.box}>
                {dNum === 0 ?
                    <div className={style.no_diary_box}>
                        <span className={style.no_diary_txt}>?????? ??? ????????? ?????????. ??? ????????? ??????????????????</span>
                        <button className={style.no_diary_button} onClick={handleNoDiaryClick}>????????????</button>
                    </div>
                    :
                    <div>
                        <span className={style.diary_txt}>{userId}?????? ???????????? {dNum}?????? ??????????????? ??????????????????</span>
                        <div className={style.slider_box}>
                            <Slider {...settings}>
                                {dList.map((item, index) => (
                                    <div key={item.id}>
                                        <div className={style.diary_box}>
                                            <span className={style.diary_title}>{index + 1}?????? ??????????</span>
                                            <button className={style.view_button} onClick={(e) => handleOnViewClick(item.id, e)}>????????????</button>
                                            <span className={style.diary_date}>???? {item.createdDate.toString().substring(0,10)}</span>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                }
                {dNum >= 5 ?
                    <div className={style.hidden_txt}>
                        <span className={style.delayed_txt}>5??? ????????? ???????????? ???????????? ????????? ???????????? ??? ?????????</span>
                        <button className={style.diary_button} onClick={handleOnClick}>???????????? ??????</button>
                    </div>
                            :
                    <div className={style.hidden_txt}>
                        <span className={style.delayed_txt}>?????? ????????? ???????????? 5??? ????????? ??????????????? ????????????!</span>
                    </div>
                }
                {isModalOpen && <Modal diaryDto={dto} setModalOpen={setIsModalOpen}/>}
            </div>
        </div>
    )
}

export default MyPage;