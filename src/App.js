import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from './store/postContext'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext,FirebaseContext } from './store/Context';
function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user);
        console.log(user.email +" shhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        const uid = user.uid;
        // ...
      } else {
        console.log("User is not logged in")
        // User is signed out
        // ...
      }
    });
  })
  return (
    <div>
      <Post>
      <Router>
        <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Login />} path="/login" />
        <Route element={<Create />}  path="/create" />
        <Route element={<View />}  path="/view" />
      </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
