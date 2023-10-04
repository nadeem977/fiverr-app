import React, { useEffect, useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../../components/review/Reviews";

function Gig() {
  const { id } = useParams();
  const [respone, setResponse] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchdata = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/Gigs/single/${id}`,
        { withCredentials: true }
      );
      setResponse(data.data);
    } catch (error) {
      console.log("Gigs error", error);
    }
  };

  const fetchUser = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/users/${respone.userId}`,
        { withCredentials: true }
      );
      setUsers(result.data);
    } catch (error) {
      console.log("users error", error);
    }
  };

  useEffect(() => {
    fetchdata();
    fetchUser();
  }, [respone.userId]);

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            Fiverr {">"} Graphics & Design {">"}
          </span>
          <h1>{respone && respone.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={
                users.img ||
                "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
              }
              alt=""
            />
            <span>{users.username}</span>
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>{respone.startNumber}</span>
            </div>
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {respone.images ? (
              respone.images.map((img, i) => <img key={i} src={img} alt="" />)
            ) : (
              <div>Loading...</div>
            )}
          </Slider>

          <h2>About This Gig</h2>
          <p>{respone.desc}</p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={
                  users.img ||
                  "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                }
                alt=""
              />
              <div className="info">
                <span>{users.username}</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>{respone.startNumber}</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{users.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>{users.desc}</p>
            </div>
          </div>
          <Reviews gigId={respone._id} />

          <div className="main-revews">
          <textarea name="" id="" cols="30" rows="10" placeholder="writ your opinions"></textarea>
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button>Add Review</button>
          </div>
        </div>

        <div className="right">
          <div className="price">
            <h3>{respone.shortTitle}</h3>
            <h2>$ {respone.price}</h2>
          </div>
          <p>{respone.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{respone.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{respone.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {respone.features ? (
              respone.features.map((item) => (
                <div className="item" key={item}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Gig;
