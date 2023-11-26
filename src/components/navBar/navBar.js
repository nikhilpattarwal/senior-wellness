import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navBar.css';
import { FaPeoplePulling } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
import SignIn from '../signIn/signIn';
import SignUp from '../signUp/signUp';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = ({auth}) => {
  const navigate = useNavigate();
  const authentication = getAuth();
  const [isAuthenticated, setIsAuthenticated] = auth;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const signout = () =>{
    signOut(authentication).then(() => {
      navigate("/");
      setIsAuthenticated(false);
    }).catch((error) => {
    });
  }

  const toggleIn = () => {
    setShowLogin(true);
    setShowSignup(false);
  }
  
  const toggleUp = () => {
    setShowSignup(true);
    setShowLogin(false);
  }
  return (
  <>
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
        <FaPeoplePulling className="people-pulling" />
        </div>
        <div className="navbar-links_container">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/doctor">Consultation</Link></p>
          <p><Link to="/volunteer">Volunteer Help</Link></p>
          <p><Link to="/medication"> Get Medicine Reminders</Link></p>
        </div>
      </div>
      <div className="navbar-sign">
       {isAuthenticated ? 
        <button type="button" onClick={signout}>Sign out</button>
        : (
       <div className="loginSign">
         <p onClick={() => toggleIn()}>Login</p>
         <button type="button" onClick={() => toggleUp()}>Sign up</button>
      </div>
  )}
      </div>
      <div className="navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="navbar-menu_container scale-up-center">
          <div className="navbar-menu_container-links">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/doctor">Consultation</Link></p>
          <p><Link to="/volunteer">Volunteer Help</Link></p>
          <p><Link to="/medication"> Get Medicine Reminders</Link></p>
          </div>
          <div className="navbar-menu_container-links-sign">
          {isAuthenticated ? 
    <button type="button" onClick={signout}>Sign out</button>
   : (
    <div>
      <p onClick={() => toggleIn()}>Login</p>
      <button type="button" onClick={() => toggleUp()}>Sign up</button>
    </div>
  )}
          </div>
        </div>
        )}
      </div>
    </div>
    {showLogin && <SignIn setShowLogin={setShowLogin}/>}
    {showSignup && <SignUp setShowSignup={ setShowSignup}/>}
    <Outlet/>
    </>
  );
};

export default Navbar;