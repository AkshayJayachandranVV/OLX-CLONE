import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getAuth, signOut } from "firebase/auth";
function Header() {
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  console.log(user+" 66666666666666666666666666666666666666")
  const {firebase}=useContext(FirebaseContext)

  const signout =()=>{
    console.log("hyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login')
      // Sign-out successful.
  }).catch((error) => {
      // An error happened.
  });
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
         <span>{user? user.email :<span onClick={()=>navigate("/login")} >Login</span>}</span>
          <hr />
        </div>
         {user && <span onClick={signout} >Logout</span> }
        <div className="sellMenu">
          <SellButton  ></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>navigate("/create")} >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
