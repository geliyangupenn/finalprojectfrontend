// import React from 'react';
import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function LoginPage() {
    const [success, setsuccess] = useState(0); //state + mutator
   useEffect(()=>{
    document.getElementById("h1").innerHTML="Enter your name and password to log in";
    console.log("user attempted login");
 
  },[success])

function changeifsuccess(){
    console.log(document.getElementById("name").value);
    console.log(document.getElementById("password").value);
    document.getElementById("h2").innerHTML="check if following: username in db:   "+document.getElementById("name").value+"   and password :   "+document.getElementById("password").value+"if in then send to main page,otherwise return failure message";
    setsuccess(prevsuccess=>prevsuccess+1);
}


    return (
        <Router>
<h1 id="h1">User Login</h1>
  <div>
    <label for="name">UserName: </label>
    <input type="text" id="name" name="name" ></input>
  </div>

  <div>
    <label for="password">Password: </label>
    <input type="password" id="password" name="password" ></input>
  </div>
  <button type="submit" onClick={() => changeifsuccess()}>Login</button>

  {/* <button type="submit" id="resetpassword"   onClick={() => changeifsuccess()}>forgot password?</button> */}
  <button type="submit" id="resetpassword" >forgot password?</button>

  <h2 id="h2"></h2>
  </Router>
    )
  }
   
export default LoginPage;