import React,{useState,useEffect} from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const GigCard = ({ item }) => {
const[data ,setData]=useState()
const fetchdata = async ()=>{
   const respons= await axios.get(`http://localhost:8000/api/users/${item.userId}`
 ,{withCredentials: true})
  const data = respons.data
 setData(data)
}

useEffect(() =>{
  fetchdata()
},[])
  
  return (
    <Link to={`/gig/${data && data._id}`}className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">

       {data && <div className="user">
            <img src={data.img} alt="" />
            <span>{data.username}</span>
          </div>}

          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{!isNaN(Math.round(item.totalStar / item.startNumber)) &&
             Math.round(item.totalStar / item.startNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
