import style from './write.module.css'
import Navbar from "../component/Navbar";
import React, {FormEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getQuestions, IQuestionDto} from "../apis/Question";
import { Cookies } from 'react-cookie';

const Write = () : JSX.Element => {

    const title : string[] = ["#첫 번째 이야기", "#두 번째 이야기", "#세 번째 이야기", "#네 번째 이야기", "#다섯 번째 이야기"];
    const [form, setForm] = useState({
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: ''
    });
    const [qNum, setQNum] = useState(0);
    const [qList, setQList] = useState<IQuestionDto[]>([]);
    const cookies = new Cookies();
    const navigator = useNavigate();

    useEffect(() => {
        const userId = cookies.get('userId');
        if (!userId) {
            navigator('/login')
        }
        handleGetQuestion();
    }, []);

    useEffect(() => {
        console.log(qList);
    }, [qList]);

    const handleGetQuestion = async () => {
        try {
            const response = await getQuestions();
            setQList(response);
        } catch (e) {

        }
    }

    const handleOnChange = (e : React.FormEvent<HTMLTextAreaElement>) => {
        const nextForm = {
            ...form,
            [e.currentTarget.name]: e.currentTarget.value
        }
        setForm(nextForm);
    }

    const handleKeyPress = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            setQNum((qNum) => qNum + 1);
        }
    }

    const handleOnClick = () => {
        setQNum((qNum) => qNum - 1);
    }

    const handleOnSubmit = (e : FormEvent) => {
        e.preventDefault();
        if (answer1 && answer2 && answer3 && answer4 && answer5) {
            alert("작성을 완료했습니다.");
            navigator('/diary');
        }
        else {
            alert("모든 질문에 답해주세요.");
        }
    }

    const {answer1, answer2, answer3, answer4, answer5} = form;

    return (
        <div className={style.container}>
            <Navbar />
            <div className={style.box}>
                <div className={style.form_container}>
                    <span className={style.form_title}>당신의 속마음을 들려주세요.</span>
                    {qList.length && <form className={style.form_box} onSubmit={handleOnSubmit}>
                        {qNum === 0 &&
                        <div className={qNum === 0 ? style.input_container : style.input_container_close}>
                            <span className={style.question_title}>{title[qNum]}</span>
                            <span className={style.question_content}>{qList[qNum].content}</span>
                            <textarea
                                className={style.input_box}
                                onChange={handleOnChange}
                                onKeyPress={handleKeyPress}
                                value={answer1}
                                name={"answer1"}
                            />
                        </div>
                        }
                        {qNum === 1 &&
                        <div className={qNum === 1 ? style.input_container : style.input_container_close}>
                            <span className={style.question_title}>{title[qNum]}</span>
                            <span className={style.question_content}>{qList[qNum].content}</span>
                            <textarea
                                className={style.input_box}
                                onChange={handleOnChange}
                                onKeyPress={handleKeyPress}
                                value={answer2}
                                name={"answer2"}
                            />
                            <button className={style.previous_button} onClick={handleOnClick}>이전</button>
                        </div>
                        }
                        {qNum === 2 &&
                        <div className={qNum === 2 ? style.input_container : style.input_container_close}>
                            <span className={style.question_title}>{title[qNum]}</span>
                            <span className={style.question_content}>{qList[qNum].content}</span>
                            <textarea
                                className={style.input_box}
                                onChange={handleOnChange}
                                onKeyPress={handleKeyPress}
                                value={answer3}
                                name={"answer3"}
                            />
                            <button className={style.previous_button} onClick={handleOnClick}>이전</button>
                        </div>
                        }
                        {qNum === 3 &&
                        <div className={qNum === 3 ? style.input_container : style.input_container_close}>
                            <span className={style.question_title}>{title[qNum]}</span>
                            <span className={style.question_content}>{qList[qNum].content}</span>
                            <textarea
                                className={style.input_box}
                                onChange={handleOnChange}
                                onKeyPress={handleKeyPress}
                                value={answer4}
                                name={"answer4"}
                            />
                            <button className={style.previous_button} onClick={handleOnClick}>이전</button>
                        </div>
                        }
                        {qNum === 4 &&
                        <div className={qNum === 4 ? style.input_container : style.input_container_close}>
                            <span className={style.question_title}>{title[qNum]}</span>
                            <span className={style.question_content}>{qList[qNum].content}</span>
                            <textarea
                                className={style.input_box}
                                onChange={handleOnChange}
                                onKeyPress={handleKeyPress}
                                value={answer5}
                                name={"answer5"}
                            />
                            <div className={style.button_box}>
                            <button className={style.previous_button} onClick={handleOnClick}>이전</button>
                                <button className={style.register_button} type={"submit"}>완료</button>
                            </div>
                        </div>
                        }
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default Write;