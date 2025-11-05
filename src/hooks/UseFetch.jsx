import React, { useEffect, useState } from 'react'

function UseFetch(url) {
    useEffect(()=>{
        fetchdata()
    },[])
    const[data,setdata]=useState({})
    async function fetchdata(){
     const res=await fetch(url)
     let resdata=await res.json()
     setdata(resdata)
}
    return data
}

export default UseFetch