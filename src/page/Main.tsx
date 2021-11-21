import style from './main.module.css'
import {Link} from "react-router-dom";

const Main = () : JSX.Element => {
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