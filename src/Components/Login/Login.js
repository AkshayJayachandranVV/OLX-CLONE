import React, { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../olx-logo.png";
import "./Login.css";
import Spinner from '../Spinner/Spinner'
import {useNavigate} from 'react-router-dom'

import {AuthContext} from '../../store/Context'



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError,setEmailError]=useState("")
  const [passwordError,setPasswordError]=useState("")
  const [error, setError] = useState("");

  const[spinner,setSpinner]=useState(false)
  const {setUser}=useContext(AuthContext)
  const navigate=useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    setSpinner(true)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user)
        console.log(user+ "9999999sbsjbsjbsjjsnsn")
        navigate("/")
        // ...
      })
      .catch((error) => {
        setSpinner(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("login error", errorCode);
        console.log("login error ", errorMessage);
        const message = errorMessage.split("(auth/")[1].split(")")[0];
        setError(message);
      });
  };


  const validateEmail=()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim()===''){
      setEmailError("Email is required")
      return false
    }else if (!emailRegex.test(email)){
       setEmailError('Invalid email format')
       return false
    }

    setEmailError('');
    return true;

  }




  return (
    <div>
      {
      spinner? <Spinner /> :
      
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onBlur={validateEmail}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="John"
          />
          <div style={{color:'red',fontSize:'.9vw'}} >{emailError}</div>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <span style={{ color: "red", marginBottom: "3%" }}>
              {error ? error : ""}
              <br />
            </span>
          {/* <br /> */}
          <button>Login</button>
        </form>
        <a onClick={()=>{navigate("/signup")}} >Signup</a>
      </div>
}
    </div>
  );
}

export default Login;
