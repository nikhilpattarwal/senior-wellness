
import React, { useState } from 'react';
import styles from './signUp.module.css';
import { ImCross } from "react-icons/im";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = ({setShowSignup}) => {
  const navigate = useNavigate();
  const[error, setError] =useState();
  const [showContainer, setShowContainer] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

   const handleClick = () => {
    setShowContainer(false);
     setShowSignup(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
 
    
    createUserWithEmailAndPassword(auth, formData.email, formData.password).then(
     async(res) => {
        
      
        const user = res.user;
        await updateProfile(user,{
          displayName: formData.username
        })
        navigate("/");
        setShowSignup(false);
      }
    )
    .catch((error)=>{
      setError(error.message);
    })
  };

  return (
    <div className={showContainer ? styles.container : styles.hidden}>
      <div className={styles.textIcon}>
      <ImCross className={styles.crossButton} onClick={handleClick} />
      <h2>Sign Up</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={(e)=>{handleChange(e); setError("")}}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e)=>{handleChange(e); setError("")}}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e)=>{handleChange(e); setError("")}}
        />
        <button type="submit">Sign Up</button>
        <h5 className={styles.error}>{error}</h5>
      </form>
    </div>
  );
};

export default SignUp;
