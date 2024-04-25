import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  const postDate = new Date(props.created_at);
  const now = new Date();
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  let timeAgo;

  if (diffInSeconds < 60) {
    timeAgo = "just now";
  } else if (diffInSeconds < 3600) {
    // less than 1 hour
    const minutes = Math.floor(diffInSeconds / 60);
    timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    // less than 1 day
    const hours = Math.floor(diffInSeconds / 3600);
    timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    // less than 1 week
    const days = Math.floor(diffInSeconds / 86400);
    timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2629800) {
    // less than 1 month
    const weeks = Math.floor(diffInSeconds / 604800);
    timeAgo = `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 31557600) {
    // less than 1 year
    const months = Math.floor(diffInSeconds / 2629800);
    timeAgo = `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    // more than 1 year
    const years = Math.floor(diffInSeconds / 31557600);
    timeAgo = `${years} year${years > 1 ? "s" : ""} ago`;
  }

  return (
    <div className="card">
      <Link to={`/details/${props.id}`} className="card-link">
        <div className="card-content">
          <img className="card-img" src={props.image} alt="" />
          <div className="card-text">
            <p className="posted-time">Posted {timeAgo}</p>
            <h2>{props.title}</h2>
            <p className="card-upvotes">{props.upvotes} upvotes</p>
          </div>
        </div>
      </Link>
      {/* <Link to={`/edit/${props.id}`}>
        <button>Edit Crewmate</button>
      </Link> */}
    </div>
  );
};

export default Card;
