import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import './Navbar.css'
import { CiHome, CiMenuBurger } from "react-icons/ci";
import { SlGraph } from "react-icons/sl";
import { GoPencil } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import supabase from '../config/superbaseClient';
const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)
    const navigate = useNavigate();
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <h1 style={{ fontFamily: "Permanent Marker", color: "#3ecf8e" }}>SCRIPTIN</h1>
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <CiMenuBurger />
                </div>
                <div className={`nav-elements  ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <NavLink to="/"><span className='navicon'><CiHome size={18} /></span>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/trending"><span className='navicon'><SlGraph size={18} /></span>Trending</NavLink>
                        </li>
                        <li>
                            <NavLink to="/stories"><span className='navicon'><GoPencil size={18} /></span>Create</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Profile"><span className='navicon'><IoSettingsOutline size={18} /></span>Settings</NavLink>
                        </li>
                        <li>
                            <span style={{ cursor: "pointer" }} onClick={handleSignOut}><span span className='navicon'><IoIosLogOut size={18} /></span>Logout</span>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar