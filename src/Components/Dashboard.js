import React, { Fragment, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import jwt from "jsonwebtoken";

function Dashboard() {
  const [email,setEmail] = useState("");
  const [user,setUser] = useState("");
  const [type,setType] = useState("");
  const [details,setDetails] = useState("");
  const navigate = useNavigate();
  const [image,setImage] = useState("")

 
  useEffect(() =>{
    const loggedInUser = localStorage.getItem('token');
    if(loggedInUser) {
        const decoded = jwt.verify(loggedInUser, 'secret123');
	      const userType = decoded.userType;
        const email = decoded.email;
        setEmail(email)
        const foundUser = loggedInUser;
        setUser(foundUser);
        setType(userType);
        if(userType !== 'user'){
          navigate('/adminDashboard')
        }else{
          userDetails(email);
        }
    }else{
      navigate('/')
    }
  },[user])

 async function userDetails(emailTosend){
  try{
    const loggedInUser = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Custom-Header": `${loggedInUser}`,
            },
            body: JSON.stringify({
              emailTosend
            }),
        })
        const data = await response.json()
        if (data.errormsg) {
          navigate('/');
        }
        setDetails(data.userDetails)
  }catch (err){
    navigate('/')
  }
 }
 
 const uploadImage = () => {
  const loggedInUser = localStorage.getItem('token');
  const decoded = jwt.verify(loggedInUser, 'secret123')
  const data = new FormData()
  data.append('file',image)
  data.append("upload_preset",'wj1iznqd')
  data.append("cloud_name",'dupfwiwnp')

  fetch(" https://api.cloudinary.com/v1_1/dupfwiwnp/image/upload",
  {
    method:'post',
    body:data
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.url)
    const id = decoded.id;
    const url = data.url
    fetch(`http://localhost:8000/dashboard/uploadImg/${id}` ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        url
    }),
  })
  .then(res => res.json())
  .then(data => {
    setUser(data.profile)
    // window.location.href();
  })
    
  })
  .catch(err => console.log(err))
}
  
  return (
    <div class="container-lg">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div
            style={{
              // backgroundColor: "grey",
              width: "190px",
              height: "200px",
              marginBottom: "20px",
            }}>
              {details.image ? <img style={{width:'190px',height:'200px',overflow:'hidden'}} src={details.image} ></img>:<h5 style={{color:'red'}}>Add your profile !!</h5>
              }
             {
              details.image ? null:
              <Fragment>
              <input type={'file'} onChange={(e) => {setImage(e.target.files[0])}}/>
              <button onClick={uploadImage} className='mt-3' variant='outline-info' >Upload</button>
              </Fragment>
             }
          </div>
          <table class="table">
            <thead>
              <h4>{details.firstName+" "+details.lastName}</h4>
            </thead>
            <tbody>
              <tr>
                <th>First Name</th>
                <td>{details.firstName}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{details.lastName}</td>
              </tr>
              <tr>
                <th>Mobile Number</th>
                <td>{details.mobNumber}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{details.email}</td>
              </tr>
              <tr>
                <th>User Type</th>
                <td>{details.userType}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
