
import './App.css'
import ClientPagination from './ClientPagination .jsx'
import Navbar from './component/header/Header.jsx'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from './pages/homepage/Homepage.jsx'
import Product from './pages/product/Product.jsx'
import Login from './pages/login/Login.jsx'
import Cart from './pages/cart/Cart.jsx'
function App() {


  return (
    <>
     <BrowserRouter>
     <Navbar />
     <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/product" element={<Product/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      {/* <Route path="/" element={}></Route> */}
     </Routes>
     </BrowserRouter>
     {/* <ProductApi /> */}
     


     {/* <ClientPagination /> */}
     {/* <AdminDashboard /> */}
    </>
  )
}

export default App
