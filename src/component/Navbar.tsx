import style from './navbar.module.css'
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () : JSX.Element => {

    //const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const userId = null;

    const handleLogoOnClick = () => {
        if (userId !== null)
            navigate('/diary');
        else
            navigate('/');
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <span className={style.logo} onClick={handleLogoOnClick}>DAILY FEEL</span>
                <div>
                    <Link className={style.nav_diary} to="/diary">일기장으로</Link>
                    <Link className={style.nav_result} to="/result">결과로</Link>
                    <button className={style.logout_button}>로그아웃</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;