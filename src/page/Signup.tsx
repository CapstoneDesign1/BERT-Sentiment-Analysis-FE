import React, {FormEvent, useEffect, useState} from "react";
import style from './signup.module.css';
import {useNavigate} from "react-router-dom";
import {duplicateMember, registerMember} from "../apis/Member";

const Signup = () : JSX.Element => {

    const [isDuplicate, setIsDuplicate] = useState(false);
    const [form, setForm] = useState({
        userId: '',
        password: '',
        verifyPassword: '',
        name: '',
        age: 0,
        email: ''
    });
    const navigate = useNavigate();
    const {userId, password, verifyPassword, name, age, email} = form;

    const handleOnChangeWithCheck = async (e: React.FormEvent<HTMLInputElement>) => {
        const nextForm = {
            ...form,
            [e.currentTarget.name]: e.currentTarget.value
        }
        setForm(nextForm);
        const response = await duplicateMember(e.currentTarget.value);
        response ? setIsDuplicate(true) : setIsDuplicate(false);
    }

    const handleOnChange = (e : React.FormEvent<HTMLInputElement>) => {
        const nextForm = {
            ...form,
            [e.currentTarget.name]: e.currentTarget.value
        }
        setForm(nextForm);
    }

    const checkPassword = (password : string, verifyPassword: string) => {
        return (password === verifyPassword);
    }

    const handleSignup = async (e : FormEvent) => {
        e.preventDefault();
        if (!(password && verifyPassword) || !checkPassword(password, verifyPassword)) {
            alert("비밀번호가 일치하지 않습니다.");
        }
        else if ((userId && email && age && password && verifyPassword && name)) {
            try {
                const response = await registerMember({userId, age, password, email, name});
                alert("회원가입이 완료되었습니다.");
                navigate('/login');
            } catch (e) {
                alert("다시 시도해주세요.");
            }
        }
        else {
            alert("실패");
        }
    }

    const handleOnClick = () => {
        navigate('/login');
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
                            onChange={handleOnChangeWithCheck}
                            type="text"
                            value={userId}
                            name={"userId"}
                        />
                        {isDuplicate ? <span className={style.signup_error_message}>이미 사용중인 아이디입니다.</span> : <span> </span>}
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
                            value={name}
                            type="text"
                            name={"name"}
                        />
                        {name ? <></> : <span className={style.signup_error_message}>필수 입력 항목입니다.</span>}
                    </div>
                    <div className={style.input_box}>
                        <span className={style.signup_title}>나이</span>
                        <input
                            className={style.input}
                            type="number"
                            onChange={handleOnChange}
                            value={age}
                            name={"age"}
                        />
                        {age ? <></> : <span className={style.signup_error_message}>필수 입력 항목입니다.</span>}
                    </div>
                    <div className={style.input_box}>
                        <span className={style.signup_title}>이메일</span>
                        <input
                            className={style.input}
                            onChange={handleOnChange}
                            value={email}
                            type="text"
                            name={"email"}
                        />
                        {email ? <></> : <span className={style.signup_error_message}>필수 입력 항목입니다.</span>}
                    </div>
                    <button className={style.signup_button} type={"submit"}>등록</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
