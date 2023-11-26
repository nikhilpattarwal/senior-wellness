// SignIn.js
import React, { useState } from 'react';
import styles from './signIn.module.css';
import { ImCross } from "react-icons/im";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = ({setShowLogin}) => {
  const navigate = useNavigate();
  const [showContainer, setShowContainer] = useState(true);
  const[error, setError] =useState();
  const handleClick = () => {
    setShowContainer(false);
    setShowLogin(false)
  };
 
  const [values, setValues] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

   const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
   signInWithEmailAndPassword(auth, values.email, values.password).then(
     async(res) => {
        navigate("/");
        setShowLogin(false);
      }
    )
    .catch((error)=>{
      setError(error.message);
    })
  };
  
  return (
    <div className={showContainer ? styles.container : styles.hidden}>
      <form className={styles.form}>
       <div className={styles.textIcon}>
       <ImCross className={styles.crossButton} onClick={handleClick} />
        <h2 className={styles.title}>Sign In</h2>
        </div>

        <label htmlFor="username">Email:</label>

        <input type="email" id="email"
         className={styles.input} 
         name="email"
         value={values.email}
         onChange={(e)=>{handleChange(e); setError("")}}
         />

        <label htmlFor="password">Password:</label>

        <input type="password" 
        id="password" 
        name="password"
        value={values.password}
        className={styles.input}  
        onChange={(e)=>{handleChange(e); setError("")}}
        />

        <button type="submit" className={styles.button} onClick={handleSubmit}>
          Sign In
        </button>
        <h5 className={styles.error}>{error}</h5>
      </form>
    </div>
  );
};

export default SignIn;
