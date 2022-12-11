import React from 'react'
import "../product/ReviewCard.css"
import ReactStars from 'react-rating-stars-component'

function ReviewCard({review}) {

    const options = {
        count: 5,
        size: 24,
        activeColor: "#32AEB1",
        edit: false,
        value: review.rating,
        isHalf: true,
      };
  return (
    <>  
        <div className="top_div">
        <i class="fa-solid fa-user"></i>
        <h4>{review.name}</h4>
        <ReactStars {...options}/>
        <p>{review.comment}</p>
        </div>
    </>
  )
}

export default ReviewCard