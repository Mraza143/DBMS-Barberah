import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Home, Welcome, Footer, Services, Salons, SpecificSalon} from "./components"
import BarberProfile from "./components/BarberProfile"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"

const App = () => {
  return (
    <Router>
      {/* <div className='gradient-bg-welcome'>
        <Navbar />
      </div>

<Switch>

  <Route exact path="/"> <Home/>  </Route>
  <Route path="/login" >  <Login/>  </Route>
  <Route path="/register"> <Register/> </Route>


<Route  path="/salons" > <Salons total={10} /> </Route>

<Route path="/specificSalon/:id/:name" > <SpecificSalon /> </Route>
<Route path="/specificBarber/:id/:name/:sname" > <BarberProfile/>  </Route>






</Switch>
<Footer/> */}


    </Router>
  )
}

export default App