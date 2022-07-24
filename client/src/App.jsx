import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
// import {Home, Welcome, Footer, Services, Salons, SpecificSalon} from "./components"
import Home from "./components/Home"
import AboutUs from './components/aboutUs'
import ContactUs from './components/contactUs'
import Footer from "./components/Footer"
import BarberProfile from "./components/BarberProfile"
import Navbar from "./components/Navbar"
import Salons from './components/Salons'
import SpecificSalon from "./components/SpecificSalon"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Admin/Dashboard"
import BarbersList from "./components/Admin/BarbersList"
import NewBarber from "./components/Admin/NewBarber"
import SalonsList from "./components/Admin/SalonsList"
import NewSalon from "./components/Admin/NewSalon"


const App = () => {
  return (
    <Router>

      <div className='gradient-bg-welcome'>
        <Navbar />
      </div>
      


<Switch>
      <Route exact path="/"> <Home/>  </Route>

      <Route path="/register"> <Register/> </Route>
      <Route path="/login" >  <Login/>  </Route>

      <Route path="/AboutUs">
          <AboutUs/>
        </Route>

        <Route path="/ContactUs">
          <ContactUs/>
        </Route>


 <Route  path="/salons" > <Salons total={10} /> </Route>

<Route path="/specificSalon/:id/:name" > <SpecificSalon /> </Route>

 <Route path="/specificBarber/:id/:name/:sname" > <BarberProfile/>  </Route>



{/* Admin Pages */}

<Route exact path="/salonowner/dashboard">
  <Dashboard/>
</Route>



<Route exact path="/salonowner/barbers">
  <BarbersList/>
</Route>



<Route exact path="/salonowner/newbarber">
  <NewBarber/>
</Route>


<Route exact path="/salonowner/salons">
  <SalonsList/>
</Route>


<Route exact path="/salonowner/newsalon">
  <NewSalon/>
</Route>




</Switch>

<Footer/>


    </Router>
  )
}

export default App












{/* <Route exact path="/salonowner/salonowner/salon/:id">
  <UpdateSalon/>
</Route> */}