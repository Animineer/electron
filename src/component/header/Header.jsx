import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { CiMenuBurger } from "react-icons/ci";
import { IoLogoElectron } from "react-icons/io5";

import { IoIosCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import styles from "./Header.module.css"
import { ProductContext } from '../../context/ProductContext';

function Header() {
    const categories = [
        "All", "Beauty", "fragrances", "furniture",
        "groceries", "home-decoration", "kitchen-accessories",
        "laptops", "mens-shirts", "mens-watches", "mobile-accessories"
      ];

     const[show,setshow]=useState(false)
     const navigate=useNavigate()
      
     const{setcategory}=useContext(ProductContext)
     function handleshow(){
        setshow(p=>(!p))
     }
    
      function handleCategory(category){
        setcategory(category)
        navigate("/product")
        setshow(false)
      }
     
  
    return (
        <div className={styles.Allmain}>

            <div >
                <ul type="none" className={styles.Headermain} style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                <CiMenuBurger onClick={handleshow}/>
                <div><IoLogoElectron className={styles.icon} /><li>Electron</li></div>
                 <Link to="/" className="nav-link"><li>HOME</li></Link>
                 <Link to="/product" className="nav-link"><li>PRODUCTS</li></Link>
                 {/* <link to=""></link> */}
                
                
                <div><input /><FaSearch className={styles.icon}/></div>
                 
                 <div>
                <div></div>
                 <Link to="/cart" className="nav-link"> <div><IoIosCart className={styles.icon} /><li>CART</li></div></Link>
                 <div><FiHeart className={styles.icon} /><li>WHISHLIST</li></div>
                 <Link to="/login" className="nav-link"><div><FaUser className={styles.icon}/><li>LOGIN</li></div></Link>
                
                </div>
                </ul>
            </div>

            <ul  type="none" className={styles.category} style={{display:show?"none":"block"}} >
            {
                (categories.map((cat)=>(
                 
                    <li key={cat.id} onClick={()=>handleCategory(cat)}>{cat}</li>
                )))
            }
            </ul>
        </div>

    )
}

export default Header