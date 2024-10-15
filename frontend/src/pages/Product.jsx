import React from 'react'
import { useParams } from 'react-router-dom';

const Product = () => {

  const {productId} = useParams();
  const {pro}


  return (
    <div>Product</div>
  )
}

export default Product