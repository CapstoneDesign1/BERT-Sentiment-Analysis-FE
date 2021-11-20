import React, {FormEvent, useEffect, useState} from "react";
import style from './login.module.css';
import {Link, useNavigate} from "react-router-dom";

const Login = () : JSX.Element => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    const handleIdInput = (e : React.FormEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value);
    }

    const handlePwInput = (e : React.FormEvent<HTMLInputElement>) => {
        setPw(e.currentTarget.value);
    }

    const handleLogin = (e : FormEvent) => {
        e.preventDefault();
        if (id && pw) {
            console.log("성공");
            navigate('/diary');
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
                            value = {id}
                            onChange = {handleIdInput}
                            placeholder = "아이디"
                            type = "text"
                        />
                    </div>
                    <div className={style.input_box}>
                        <input
                            className={style.input}
                            value = {pw}
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