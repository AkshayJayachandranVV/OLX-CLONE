import React, { useState, useContext } from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, reauthenticateWithCredential } from "firebase/auth";
// Add a second document with a generated ID.
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Spinner from "../Spinner/Spinner";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    const auth = getAuth();
    console.log("111");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed");
        // Signed up
        const user = userCredential.user;
        console.log(user);
        const db = getFirestore();
        try {
          addDoc(collection(db, "users"), {
            id: user.uid,
            userName: username,
            phoneNo: phone,
          }).then(() => {
            navigate("/login");
          });
        } catch (error) {
          console.error("Error adding document: ", error);
          const errorMessage = error.message;
          const message = errorMessage.split("(auth/")[1].split(")")[0];
          setError(message);
        }
        // history.push("/")
        // ...
      })
      .catch((error) => {
        setSpinner(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };


  const validateUserName=()=>{
    const usernameRegex = /^[A-Za-z]+$/;
        if(username.trim()===''){
          setNameError("Username is required")
          return false
        }else if(!usernameRegex.test(username)){
          setNameError("Username is Invalid")
          return false
        }
        setNameError("")
        return true
  }

  const validateEmail=()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim()===''){
          setEmailError("Email is required")
    }else if(!emailRegex.test(email)){
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError("")
    return true
  }

  const validatePhone = () => {
    const phoneRegex = /^[0-9]{10,12}$/;
    if (phone.trim() === '') {
      setPhoneError('Phone number is required');
      return false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError('Invalid phone number format');
      return false;
  }
    setPhoneError('');
    return true;
  };


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onBlur={validateUserName}
            onChange={(e) => {setUsername(e.target.value);setNameError("");validateUserName()}}
            defaultValue="John"
          />
          <div style={{ color: "red", fontSize: ".9vw" }}>{nameError}</div>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onBlur={validateEmail}
            onChange={(e) =>{ setEmail(e.target.value);validateEmail();}}
            defaultValue="John"
          />
          <div style={{ color: "red", fontSize: ".9vw" }}>{emailError}</div>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => {setPhone(e.target.value);validatePhone()}}
            defaultValue="Doe"
          />
           <div style={{color:'red',fontSize:'.9vw'}}>{phoneError}</div>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onBlur={validatePhone}
            value={password}
            onChange={(e) =>{ setPassword(e.target.value);}}
            defaultValue="Doe"
          />
          <br />
          <span style={{ marginBottom: "3%", color: "red" }}>
                                {
                                    error ? error : ""
                                }
                            </span>
          <br />
          <button>Signup</button>
        </form>
        <a
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </a>
      </div>
    </div>
  );
}
