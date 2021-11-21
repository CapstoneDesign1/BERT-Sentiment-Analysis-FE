import React, {FormEvent, useEffect, useState} from "react";
import style from './login.module.css';
import {Link, useNavigate} from "react-router-dom";
import { loginMember } from "../apis/Login";
import {useCookies} from "react-cookie";

const Login = () : JSX.Element => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const navigate = useNavigate();

    const handleIdInput = (e : React.FormEvent<HTMLInputElement>) => {
        setUserId(e.currentTarget.value);
    }

    const handlePwInput = (e : React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const handleLogin = async (e : FormEvent) => {
        e.preventDefault();
        if (userId && password) {
            try {
                const response = await loginMember({userId, password});
                setCookie('userId', response.headers["userid"], {path: '/', expires: new Date(Date.now() + 86400)});
                navigate('/diary');
            } catch (e) {
                alert("ID 혹은 PASSWORD가 일치하지 않습니다.");
                setPassword('');
            }
        }
        else {
            alert("ID 혹은 PASSWORD를 입력해야 합니다.");
        }
    }

    const handleClickLogo = () => {
        navigate('/');
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <span className={style.login_txt} onClick={handleClickLogo}>DAILY FEEL</span>
                <form className={style.login_box} onSubmit={handleLogin}>
                    <div className={style.input_box}>
                        <input
                            className={style.input}
                            value = {userId}
                            onChange = {handleIdInput}
                            placeholder = "아이디"
                            type = "text"
                        />
                    </div>
                    <div className={style.input_box}>
                        <input
                            className={style.input}
                            value = {password}
                            onChange = {handlePwInput}
                            placeholder = "비밀번호"
                            type = "password"
                        />
                    </div>
                    <button className={style.login_button} type={"submit"}>로그인</button>
                </form>
                <div className={style.button_box}>
                    <Link to="/signup">
                        <button className={style.signup_link_button}>아직 회원이 아니세요?</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;