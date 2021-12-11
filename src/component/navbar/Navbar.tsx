import style from './navbar.module.css'
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';

const Navbar = () : JSX.Element => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const userId = cookies.get('userId');
        userId ? setIsLogin(true) : setIsLogin(false);
    }, [cookies]);

    const handleLogoOnClick = () => {
        isLogin ? navigate('/diary') : navigate('/login');
    }

    const handleLogoutClick = () => {
        cookies.remove('userId', {path: '/'});
        navigate('/');
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <span className={style.logo} onClick={handleLogoOnClick}>DAILY FEEL</span>
                <div>
                    <Link className={style.nav_diary} to="/diary">일기장으로</Link>
                    <Link className={style.nav_result} to="/result">결과로</Link>
                    {isLogin ? <button className={style.logout_button} onClick={handleLogoutClick}>로그아웃</button> : <button className={style.logout_button} onClick={handleLoginClick}>로그인</button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;