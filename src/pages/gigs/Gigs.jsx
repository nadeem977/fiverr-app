import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import axios from "axios";
import { useLocation } from "react-router-dom";



function Gigs() {

  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const {search} = useLocation()
  const [responseData, setResponseData] = useState([]);

  
const techdata = async () => {
  try {
    const response = await axios
    .get(`http://localhost:8000/api/Gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`,
     { withCredentials: true });
    setResponseData(response.data);
    // console.log(response.data)
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  techdata()
},[sort]);

const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
const apply = () => {
    techdata()
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {responseData && responseData.map((gig) => {
            return <GigCard key={gig._id} item={gig} />
            })}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
