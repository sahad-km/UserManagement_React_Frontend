import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken'
import image from '../img-01.png'
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser] = useState("");
  const [type,setType] = useState("");
  const navigate = useNavigate();

  useEffect(() =>{
    const loggedInUser = localStorage.getItem('token');
    if(loggedInUser) {
        const decoded = jwt.verify(loggedInUser, 'secret123')
	    const userType = decoded.userType;
        const foundUser = loggedInUser;
        setUser(foundUser);
        setType(userType);
        console.log("hi")
    }
  },[])

  async function loginUser(e) {
    e.preventDefault();
    if(email.trim() === ""){
        alert("Please provide Email first");
        return
    }
    if(password.trim() === ""){
        alert("Enter password");
        return;
    }
    const response = await fetch('http://localhost:8000/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    const data = await response.json()

    if(data.user){
        localStorage.setItem('token',data.user)
    }
    if (data.status === 'admin') {
        navigate('/adminDashboard');
    }else if(data.status === 'user'){
        navigate('/dashboard');
    }else if(data.status === 'wrong'){
        alert("Invalid Email or Password");
    }else{
        alert("No User exist");
    }
}

if(user){
    if(type === 'user'){
      navigate('/dashboard')
    }else{
      navigate('/adminDashboard')
    }
  }


  return (
    <div className="row" >
        <div className="login-box">
        <div className="col-md-5">
            <img src={image} alt=""></img>
        </div>
        <div className="col-md-5 p-5">
            <h3 className="logText">Login Now</h3>
            <form>
                <div className="form-group">
                    <label for="">Email address</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" value={email} class="form-control"placeholder="Enter email" name="email"/>
                </div>
                <div className="form-group">
                    <label for="">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" value={password} class="form-control" placeholder="Password" name="password"/>
                    <Link className="newAcc" to={'/signup'} >Create New Account</Link>
                </div>
                <button type="submit" class="btn btn-primary" onClick={loginUser} >Login</button>
            </form>
        </div>
    </div>
    </div>
  );
}
export default Login;
