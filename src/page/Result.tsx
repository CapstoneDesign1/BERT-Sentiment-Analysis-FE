import {useEffect, useState } from "react";
import style from "./result.module.css"
import {IResultDto, resultDiary} from "../apis/Result";
import {Cookies} from "react-cookie";
import {getUserDiary, IDiaryDto} from "../apis/Diary";
import Navbar from "../component/navbar/Navbar";
import {useNavigate} from "react-router-dom";

const Result = () : JSX.Element => {
    const cookies = new Cookies();
    const [dto, setDto] = useState<IResultDto | undefined>(undefined);
    const [diaryList, setDiaryList] = useState<IDiaryDto[]>([]);
    const [diarySize, setDiarySize] = useState(0);
    const navigate = useNavigate();

    const goodWordList = ["오늘 밤엔 고생했던 나에게 먼저 말을 건네봐요. 다른 것보다 나에게 집중해서 오늘은 어떤일이 힘들었고 즐거웠던 일은 무엇인지 가만히 들어주세요 -괜찮아, 사랑이야-",
        "잘하고 싶었는데, 마음처럼 안돼서 내가 싫었던 날이 있나요? 괜찮아요, 잘하고 싶다는 마음만으로도 당신은 좋은 사람이에요. -오늘처럼 내가 싫었던 날은 없었다-",
        "지금 힘들었던 만큼 당신의 내일은 더 반짝일 거예요. - 여자 서른다섯, 그런대로 안녕하다-"];

    useEffect(() => {
        if (!cookies.get('userId')) {
            navigate('/login');
        }
        onGetUserDiary(cookies.get('userId'));
        onGetResult();
    }, []);

    const onGetResult = async () => {
        const response = await resultDiary(cookies.get('userId'));
        setDto(response);
    }

    const onGetUserDiary = async (user_id : string) => {
        const response = await getUserDiary(user_id);
        setDiaryList(response);
        setDiarySize(response.length);
        if (response.length < 5) {
            alert("5개 이상의 일기를 쓰셔야 결과를 확인하실 수 있습니다.🤖");
            navigate(-1);
        }
    }

    const convertEmotion = (emotion : string | undefined) => {
        switch(emotion) {
            case "SAD":
                return "슬픔😥 ";
            case "ANGER":
                return "화남😡 ";
            case "HURT":
                return "상처🤕 ";
            case "EMBARRASS":
                return "당황😯 ";
            case "HAPPY":
                return "행복☺️ ";
            case "ANXIOUS":
                return "불안😖 ";
        }
    }

    const convertDepress = (depress : number | undefined) => {
        if (depress !== undefined) {
            switch (depress) {
                case 0:
                    return "마음 상태가 건강합니다.";
                case 1:
                    return "아직은 괜찮으나, 우울증 예방이 필요합니다.";
                case 2:
                    return "우울증이 의심됩니다.";
                case 3:
                    return "우울증 위험이 예상됩니다.";
            }
        }
    }

    return (
        <div className={style.container}>
            <Navbar />
            {(diarySize >= 5 && dto?.depress !== undefined) &&
            <div className={style.box}>
                <div className={style.user_txt}>
                    <span className={style.user_name}>{'"'}{cookies.get('userId')}{'"'}</span>
                    <span className={style.user_result}>{" 님의 최근 " + diarySize + "일간 감정 분석 결과입니다."}</span>
                </div>
                <div>
                    {
                        diaryList.map((item, index) => {
                            return (
                                <div className={style.result_box} key={item.id}>
                                    <span className={style.day}>[{index+1}일차] </span>
                                    <span>{item.createdDate.toString().substring(0,10) + "일날 작성한 일기 분석 결과는 "}</span>
                                    <span className={style.emotion}>{convertEmotion(item.emotionType)}</span>
                                    <span>입니다.</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.score}>
                    {"우울증 점수😔 = " + dto?.sadScore.toString().substring(0, 4) + "점"}
                </div>
                <div className={style.final_result}>
                    <span>{"분석 결과, "}</span>
                    <span className={style.final_emotion}>{convertDepress(dto?.depress)}</span>
                </div>
                {(dto?.depress !== 0) &&
                    <div className={style.good_word_title}>
                        우울한 사람들에게 힘이 되는 글귀 추천
                    </div>
                }
                {(dto?.depress !== 0) &&
                <div>
                    <div className={style.good_word}>
                        {goodWordList[Math.floor(Math.random() * 3)]}
                    </div>
                </div>
                }
                <div className={style.daily}>
                    DAILY FEEL이 전하고 싶은 한마디
                </div>
                {(dto?.depress === 0) &&
                    <div className={style.cheer_up}>
                        잘 해왔고, 지금도 잘 하고 있습니다. 항상 지금과 같은 모습으로 힘내주세요!
                    </div>
                }
                {(dto?.depress === 1) &&
                <div>
                    <span className={style.help_main}>{"<우울증을 극복하는데 도움이 되는 생활습관>"}</span>
                    <span className={style.help}>1. 긍정적인 생각을 가집니다.</span>
                    <span className={style.help}>2. 운동하는 습관을 가집니다.</span>
                    <span className={style.help}>3. 규칙적이고 균형 잡힌 식습관을 가집니다.</span>
                    <span className={style.help}>4. 알코올은 우울증 치료의 적이므로 반드시 피합니다.</span>
                    <span className={style.help}>5. 명상과 요가, 이완요법이 도움이 됩니다.</span>
                    <span className={style.help}>6. 낮잠을 30분 이내로 하고, 침대는 잠을 자는 용도로만 사용합니다.</span>
                </div>
                }
                {(dto?.depress === 2) &&
                <div>
                    <div className={style.consult_title}>
                        상담을 받고 싶다면
                    </div>
                    <div>
                        <span>서강대학교 학생생활상담연구소</span>
                    </div>
                    <div>
                        <div className={style.consult_link} onClick={() => {
                            window.open("https://sgcounsel.sogang.ac.kr/sgcounsel/index_new.html");
                        }}>바로가기</div>
                    </div>
                </div>}
                {(dto?.depress === 3) &&
                <div>
                    우울증이 의심되니 가까운 보건소에 들려 진단을 받으시길 추천드립니다.
                </div>
                }
                {(dto?.depress === 3) &&
                <div className={style.consult_link} onClick={() => {
                    window.open("https://health.seoulmc.or.kr/hospitalClinicInfo/healthCenterInfo.do");
                }}>찾아보기</div>
                }
            </div>
            }
        </div>
    )
}

export default Result;