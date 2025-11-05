import React from 'react'
import UseFetch from '../hooks/UseFetch'
import { useState } from 'react'
function ProductApi() {
     const [productdataapi,setproductdataapi]=useState([])
    const productdata=UseFetch("https://dummyjson.com/products")
  
    // setproductdataapi(productdata.products);
    console.log(productdata.products);
   

  return (
    <div>
    <div>ProductApi</div>
  
  

  </div>
  )
}
export default ProductApi