import React,{useEffect,useContext, useState} from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { postContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
const{firebase}=useContext(FirebaseContext)
const [products,setProducts]=useState([])
const {setPostDetails}=useContext(postContext)
const navigate=useNavigate()
   useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const db = getFirestore(firebase);
        const prodtCol = collection(db, 'products');
        const querySnapshot = await getDocs(prodtCol);
        console.log(querySnapshot, '.......////')
        const allPost = [];
        querySnapshot.forEach((product) => {
            allPost.push({
                ...product.data(),
                id: product.id
            });
        });
        console.log(allPost)
        setProducts(allPost)
      }catch(e){
        console.error("Error getting documents: ", e);
      }
    }
    fetchData();
   },[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
          products.map(product=>{

         return  <div
            className="card"
            onClick={()=>{
              setPostDetails(product)
              navigate("/view")
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
               })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
