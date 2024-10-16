import React from "react"
import { useParams, useLocation } from "react-router-dom"
import "./ProductDetails.css"

const Productdetail = () => {
  const { id } = useParams()
  const location = useLocation()
  const { product } = location.state

  return (
    <>
  <div className="title">
  <h1>Product Details</h1>
  </div>
  <div className="detailpage">
  <img src={product.img} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">Price: Rs-{product.Price}</p>
      <p className="offer">Offer 50%</p>
  </div>
    
    </>
  )
}

export default Productdetail;
