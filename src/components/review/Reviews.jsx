import React, { useEffect, useState } from "react";
import "./review.scss";
import axios from "axios";



const Reviews = ({ gigId }) => {

  const [Reviews, seReviews] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchreviews = async () => {
    try {
      const getreview = await axios.get(
        `http://localhost:8000/api/Reviews/${gigId}`,
        { withCredentials: true }
      );
      const result = getreview.data;
      seReviews(result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      console.log('userI:',Reviews.userId)
      const result = await axios.get(
        `http://localhost:8000/api/users/${Reviews.userId}`,
        { withCredentials: true }
      );
      setUsers(result.data);
    } catch (error) {
      console.log("users error", error);
    }
  };

  useEffect(() => {
    fetchreviews();
      fetchUser();
  }, [gigId]);



  return (
    <>
     {Reviews && <div className="reviews">
        <h2>Reviews</h2>
        <div className="item">
          <div className="user">
            <img
              className="pp"
              src={ users.img ||"https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"}
              alt=""
            />
            <div className="info">
              <span>{users.username}</span>
              <div className="country">
                <img
                  src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                  alt=""
                />
                <span>{users.country}</span>
              </div>
            </div>
          </div>
          <div className="stars">
            {Reviews &&
              Array(Reviews.star)
                .fill()
                .map((item, i) => <img src="/img/star.png" alt="" key={i} />)}
            <span>({Reviews && Reviews.star})</span>
          </div>
          <p>{Reviews && Reviews.desc}</p>
          <div className="helpful">
            <span>Helpful?</span>
            <img src="/img/like.png" alt="" />
            <span>Yes</span>
            <img src="/img/dislike.png" alt="" />
            <span>No</span>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Reviews;
