import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
import Logo from '../../img/logo.png'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'


export default function Header({user, setUser}) {
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user")
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div id="header">
            <Link to="/">
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
            </Link>
            <div className="user-pic" onClick={() => {setIsMenuOpen((prev) => !prev)}}>
                <ProfileAvatar name={user.name} size={40} fontSize={"1.25rem"}/>
            </div>
            <div className="menu" style={isMenuOpen ? {display: "block"} : {display: "none"}}>
                <Link to="/my-recipes"><div className="option">My recipes</div></Link>
                <Link to="/add-recipe"><div className="option">Add new recipes</div></Link>
                <div className="option" style={{cursor: "pointer"}} onClick={() => handleLogout()}>Logout</div>
            </div>
        </div>
    )
}
