import React,{useEffect,useContext, useState} from 'react';
import './View.css';
import { postContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(postContext)
  const {firebase}=useContext(FirebaseContext)
  const userId = postDetails.userId || ""
  useEffect(()=>{
      const FetchData=async()=>{
        const db = getFirestore(firebase);
        const q = query(collection(db, 'users'), where('id', '==', userId));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => (doc.data()))
        setUserDetails(...data)
      }
      FetchData()
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span></span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt} </span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.userName}</p>
          <p>{userDetails.phoneNo}</p>
        </div>
       }
       </div>
    </div>
  );
}
export default View;
