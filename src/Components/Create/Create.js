import React, { Fragment,useContext,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {useNavigate} from 'react-router-dom'
import { AuthContext,FirebaseContext } from '../../store/Context';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import Spinner from '../Spinner/Spinner'
const data = new Date()
const Create = () => {
  const navigate=useNavigate()
  const[name,setName]=useState('')
  const[category,setCategory]=useState('')
  const[price,setPrice]=useState('')
  const[image,setImage]=useState('')
  const [spinner, setSpinner] = useState(false);



  const [nameErr, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [priceError, setPriceError] = useState("");

  const {user} =useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  const handleSubmit=async (e)=>{
    setSpinner(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then(async(snapshot) => {
      console.log('Uploaded a file!');
      const url = await getDownloadURL(storageRef)
      console.log(url)
      console.log('3')

      const db = getFirestore();
      try {
         addDoc(collection(db, "products"), {
           name,
           category,
           price,
           url,
           userId:user.uid,
           createdAt: data.toDateString()
  
        }).then(()=>{
           navigate("/")
        })
        
      } catch (e) {
        setSpinner(false);
        console.error("Error adding document: ", e);
      }

    }).catch((error) => {
      console.log(error, 'error in the uploadBytes')
      setSpinner(false);
  })
  console.log('2')
  }


    const validateName=()=>{
      if(name.trim()===''){
        setNameError("Name is required")
        return false
      }
      setNameError("")
      return true
    }


    const validateCategory=()=>{
      if(category.trim()===''){
        setCategoryError("Category is required")
        return false
      }
      setCategoryError("")
      return true
    }


    const validatePrice=()=>{
      console.log(price)
      if(price.trim()===''){
        setPriceError("Price is required")
        return false
      }else if(price<1){
        setPriceError("Price should not be Negative")
        return false
      }
      setPriceError("")
      return true
    }




  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onBlur={validateName}
              onChange={(e)=>setName(e.target.value)}
              defaultValue="John"
            />
            <div style={{color:'red',fontSize:'.9vw'}}>{nameErr}</div>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onBlur={validateCategory}
              onChange={(e)=>{setCategory(e.target.value);validateCategory('')}}
              defaultValue="John"
            />
            <div style={{color:'red',fontSize:'.9vw'}}>{categoryError}</div>
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onBlur={validatePrice}  onChange={(e)=>setPrice(e.target.value)}   className="input" type="number" id="fname" name="Price" />
            <div style={{color:'red',fontSize:'.9vw'}}>{priceError}</div>
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image) : ""}></img>
            <br />
            <input   className='inputImage'  type="file"  onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
