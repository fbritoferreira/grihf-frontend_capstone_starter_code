import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewForm from "./Components/ReviewForm/ReviewForm"
import Layout from "./Components/Landing_Page/Landing_Page";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign_Up/Sign_Up";
import ProfileCard from "./Components/ProfileCard/ProfileCard"
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout"
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';  
import BookingConsultation from './Components/BookingConsultation';   
import Healthblog from './Components/Healthblog/Healthblog';      
import SelfCheckup from './Components/SelfCheckup/SelfCheckup';    
import Home from './Components/Home/Home';  
import Navbar from './Components/Navbar/Navbar';
import Notification from './Components/Notification/Notification';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

    return (
      <div className="App">
          <BrowserRouter>
            <Navbar/>
                <Routes>
                <Route path="/" element={<Layout/>}/>
                <Route path="/Home" element={<Home/>} />
                <Route path="/Login" element={<Login/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/InstantConsultation" element={<InstantConsultation/>} />
                <Route path="/BookingConsultation" element={<BookingConsultation/>} />
                <Route path="/Healthblog" element={<Healthblog/>} />
                <Route path="/SelfCheckup" element={<SelfCheckup/>} />
                <Route path="/ReviewForm" element={<ReviewForm/>}/>
                <Route path="/ProfileCard" element={<ProfileCard/>}/>
                <Route path="/ReportsLayout" element={<ReportsLayout/>}/>
                </Routes>
           <Notification/>
          </BrowserRouter>
         
      </div>
    );
  }
  
  export default App;



/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <> </>
  );
}

export default App;
*/
/*
import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing_Page from './Components/Landing_Page/Landing_Page';

import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
//import InstantConsultationBooking from './Components/InstantConsultation/InstantConsultationBooking';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';  
import BookingConsultation from './Components/BookingConsultation';  
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
        
          <Navbar/>
              <Routes>
              <Route path="/" element={<Landing_Page/>}/>
              <Route path="/Login" element={<Login/>}/>
              <Route path="/Sign_Up" element={<Sign_Up/>}/>
              <Route path="/InstantConsultation" element={<InstantConsultation/>} />
              <Route path="/BookingConsultation" element={<BookingConsultation/>} />
              </Routes>
            
        </BrowserRouter>
       
    </div>
  );
}

export default App;*/