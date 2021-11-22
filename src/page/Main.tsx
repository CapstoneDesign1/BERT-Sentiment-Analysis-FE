import style from './main.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { Cookies } from 'react-cookie';

const Main = () : JSX.Element => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = cookies.get('userId');
        if (userId !== undefined) {
            navigate('/diary');
        }
    }, []);

    return (
        <div className={style.container}>
            <span className={style.logo_txt}>DAILY FEEL</span>
            <div className={style.animation_box}>
                <span className={style.slogan_txt}>요즘 당신의 기분은 어떠신가요?</span>
            </div>
            <Link to="/login">
                <button className={style.login_button}>로그인</button>
            </Link>
        </div>
    )
}

export default Main;