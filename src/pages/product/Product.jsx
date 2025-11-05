import React, { useContext } from 'react'
import { useEffect, useState } from "react"
import { ProductContext } from '../../context/ProductContext.jsx';
function Product() {
    const productperpage=20; 
    
    const [data, setdata] = useState([]) // state for api fetching
    const [currentpage,setcurrentpage]=useState(1) // state for current page
     
    const{category}=useContext(ProductContext)



    //fetch api function
    async function fetchdata() {

        try {
            const res = await fetch("https://dummyjson.com/products?limit=100")
            let datas = await res.json()
            console.log(datas.products)
            setdata(datas.products)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])

     // to filter by category
     const filterdata=
     category==="All"?data
    
     :data.filter((item)=>(item.category||"").toLowerCase() === (category||"").toLowerCase())

    // calculating the total pages
    const totalpages=(Math.ceil(filterdata.length/productperpage))

    //taking the starting index and ending index for slice
    //0-10-19
    let startIndex=(currentpage-1)*productperpage
    let endIndex=startIndex+productperpage
      
    const currentdata=filterdata.slice(startIndex,endIndex)

     const handlepagechange=(page)=>{
        if(page>=1 &&page<=totalpages) //a normal condition that pages are in rage
        {
            setcurrentpage(page)
        }
     }

    return (
        <div style={{paddingTop:"60px"}}>
            
            <ul type="none" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
                {
                    currentdata.map((ele) => (
                        <div key={ele.id} style={{ background: "lightgray", width: "200px", height: "200px", textAlign: "center", margin: "10px", borderRadius: "10px" }}>

                            <img src={ele.thumbnail} alt="" height="100px" />
                            <li>{ele.title}</li>
                            <li>{ele.price}</li>


                        </div>
                    ))
                }
            </ul>
           {currentdata.length==20 && <div style={{display:"flex",justifyContent:"center"}}>
               {/* button for previous page */}
            <button onClick={()=>handlepagechange(currentpage-1)}>prev</button>   
             {/* generate buttons according to total pages */}
            {[...Array(totalpages)].map((_,index)=>(<button key={index} onClick={()=>handlepagechange(index+1)}>{index+1}</button>))}  
            

            {/* button for next page  */}
            <button onClick={()=>handlepagechange(currentpage+1)}>next</button>  
            </div>}  
          


        </div>
    )
}

export default Product