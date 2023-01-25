import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

function EditUser() {
  const navigate = useNavigate();
  const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [mobNumber,setMobNum] = useState("");
    const [email, setEmail] = useState("");
    
    const {id} = useParams()

    useEffect(()=>{
      fetch(`http://localhost:8000/admin/userEdit/${id}`)
      .then(res => res.json())
      .then(data => {
        setFirstName(data.editUser.firstName)
        setLastName(data.editUser.lastName)
        setMobNum(data.editUser.mobNumber)
        setEmail(data.editUser.email)
      })
    },[])

    async function updateDetails(e){
      e.preventDefault()
        const response = await fetch(`http://localhost:8000/admin/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                mobNumber,
                email,
            }),
        })
        const data = await response.json()
      if (data.status === 'updated') {
        alert("Updated Successfully")
        navigate('/adminDashboard');
      }else{
        alert("Updation Failed");
      }
    }

  return (
    <div className="m-5">
        <div className="row" style={{backgroundColor:'white',borderRadius:'10px',padding:'1.5em'}}>
        <h2 className="col-md-12" >Register Here</h2>
        <div className="col-md-6">
            <input onChange={(e)=>setFirstName(e.target.value)} value={firstName} type="text" name="firstName" className="form-control form-control-sm" />
            <label className="form-label" for="firstName">First Name</label>
            </div>
            <div className="col-md-6">
            <input onChange={(e)=>setLastName(e.target.value)} value={lastName} type="text" name="lastName" className="form-control form-control-sm"/>
            <label className="form-label" for="lastName">Last Name</label>
            </div>
            <div className="col-md-6">
            <input onChange={(e)=>setMobNum(e.target.value)} value={mobNumber} type="text" className="form-control form-control-sm" name="mobNumber" />
            <label for="birthdayDate" className="form-label">Mobile Number</label>
            </div>
            <div className="col-md-6">
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" className="form-control form-control-sm" />
            <label className="form-label" for="emailAddress">Email</label>
            </div>
            <button style={{borderRadius:'10px',backgroundColor:'blue'}} onClick={updateDetails} >Update</button>
        </div>
    </div>
  )
}

export default EditUser