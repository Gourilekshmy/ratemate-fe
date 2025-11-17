
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Home from './Pages/Home'
import PNF from './components/PNF'
import Reviewpage from './Pages/Reviewpage'
import Auth from './Pages/Auth'
import Categories from './Pages/Categories'
import Help from './Pages/Help'
import AdminHome from './admin/AdminHome'
import Profile from './Pages/Profile'
import EditProfile from './components/EditProfile'
import AllReviews from './Pages/AllReviews'
import ViewReview from './Pages/ViewReview'
import AdminReviews from './admin/AdminReviews'
import EditReview from './components/EditReview'
import AdminSettings from './admin/AdminSettings'

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/review" element={<Reviewpage/>}/>
      <Route path='/allReview' element={<AllReviews/>}/>
      <Route path='/view-review/:id' element={<ViewReview/>}/>
      <Route path='/editReview' element={<EditReview/>}/>
      <Route path="/login" element={<Auth/>} />
      <Route path="/register" element={<Auth insideRegister={true}/>} />
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/help' element={<Help/>}/>
      <Route path='/admin-home' element={<AdminHome/>}/>
      <Route path='/admin-review' element={<AdminReviews/>}/>
            <Route path='/admin-settings' element={<AdminSettings/>}/>

      <Route path='/profile' element={<Profile/>}/>

      <Route path='/edit-profile' element={<EditProfile/>}/>
      <Route path='*'element={<PNF/>}/>
    </Routes>
     <Footer/>
    </>
  )
}

export default App
