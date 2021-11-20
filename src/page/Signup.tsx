import React, {FormEvent, useState} from "react";
import style from './signup.module.css';
import {useNavigate} from "react-router-dom";

const Signup = () : JSX.Element => {

    const [form, setForm] = useState({
        userId: '',
        password: '',
        verifyPassword: '',
        userName: '',
        userAge: 0,
        userEmail: ''
    });
    const navigate = useNavigate();
    const {userId, password, verifyPassword, userName, userAge, userEmail} = form;

    const handleOnChange = (e : React.FormEvent<HTMLInputElement>) => {
        const nextForm = {
            ...form,
            [e.currentTarget.name]: e.currentTarget.value
        }
        setForm(nextForm);
    }

    const handleSignup = (e : FormEvent) => {
        e.preventDefault();
        if (userId && userEmail && userAge && password && verifyPassword && userName) {
            console.log(form);
        }
        else {
            alert("실패");
        }
    }

    const handleOnClick = () => {
        navigate(-1);
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <span className={style.signup_txt} onClick={handleOnClick}>DAILY FEEL</span>
                <form onSubmit={handleSignup}>
                    <div className={style.input_box}>
                        <span className={style.signup_title}>아이디</span>
                        <input
                            className={style.input}
                            onChange={handleOnChange}
                            type="text"
                            value={userId}
                            name={"userId"}
                        />
                        <span className={style.signup_error_message}>이미 사용중인 아이디입니다.</span>
                    </div>
                    <div className={style.input_box}>
                        <span className={style.signup_title}>비밀번호</span>
                        <input
                            className={style.input}
                            onChange={handleOnChange}
                            type="password"
                            value={password}
                            name={"password"}
                        />
                    </div>
                    <div className={style.input_box}>
                        <span className={style.signup_title}>비밀번호 확인</span>
                        <input
                            className={style.input}
                            onChange={handleOnChange}
                            type="password"
                            value={verifyPassword}
                            name={"verifyPassword"}
                        />
                        {(password === verifyPassword) && verifyPassword ? <></> : <span className={style.signup_error_message}>비밀번호가 일치하지 않습니다.</span>}
                    </div>
                    <div className={style.input_box}>
                        <span className={style.signup_title}>이름</span>
                        <input
                            className={style.input}
                            onChange={handleOnChange}
                            value={userName}
                            type="text"
                            name={"userName"}
                        />
                        {userName ? <></> : <span className={style.signup_error_message}>필수 입력 항목입니다.</span>}
                    </div>
                    <div className={style.input_box}>
                        <span className={style.signup_title}>나이</span>
                        <input
                            className={style.input}
                            type="number"
                            onChange={handleOnChange}
                            value={userAge}
                            name={"userAge"}
                        />
                        {userAge ? <></> : <span className={style.signup_error_message}>필수 입력 항목입니다.</span>}
                    </div>
                    <div className={style.input_box}>
                        <span className={style.signup_title}>이메일</span>
                        <input
                            className={style.input}
                            onChange={handleOnChange}
                            value={userEmail}
                            type="text"
                            name={"userEmail"}
                        />
                        {userEmail ? <></> : <span className={style.signup_error_message}>필수 입력 항목입니다.</span>}
                    </div>
                    <button className={style.signup_button} type={"submit"}>등록</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
