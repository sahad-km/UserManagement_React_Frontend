import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

function AddUser() {
    const navigate = useNavigate()
    const [firstName,setFirsName] = useState("");
    const [lastName,setLastName] = useState("");
    const [mobNum,setMobNum] = useState("");
    const [email, setEmail] = useState("");
    const [repassword,setRepassword] = useState("");
    const [password, setPassword] = useState("");
    const [userType,setUsertype] = useState("user");


    async function registerUser(e) {
        e.preventDefault();
        if(email.trim() === ""){
            alert("Please provide Email first");
            return
        }
        if(password !== repassword){
            alert("Entered passwords are mismatched");
            return;
        }
        const response = await fetch('http://localhost:8000/register/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                mobNum,
                email,
                password,
                userType
            }),
        })
        const data = await response.json()
        if (data.status === 'ok') {
            navigate('/');
        }else if(data.status === 'fail'){
            alert("You are failed to register! Try with another Email")
        }
    }
  return (
    <div className="m-5">
        <div className="row" style={{backgroundColor:'white',borderRadius:'10px',padding:'1.5em'}}>
        <h2 className="col-md-12" >Register Here</h2>
            <div className="col-md-6">
            <input onChange={(e)=>setFirsName(e.target.value)} value={firstName} type="text" name="firstName" className="form-control form-control-sm" />
            <label className="form-label" for="firstName">First Name</label>
            </div>
            <div className="col-md-6">
            <input onChange={(e)=>setLastName(e.target.value)} value={lastName} type="text" name="lastName" className="form-control form-control-sm"/>
            <label className="form-label" for="lastName">Last Name</label>
            </div>
            <div className="col-md-6">
            <input onChange={(e)=>setMobNum(e.target.value)} value={mobNum} type="text" className="form-control form-control-sm" name="mobNumber" />
            <label for="birthdayDate" className="form-label">Mobile Number</label>
            </div>
            
            <div className="col-md-6">
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" className="form-control form-control-sm" />
            <label className="form-label" for="emailAddress">Email</label>
            </div>
            <div className="col-md-6">
            <input onChange={(e)=>setRepassword(e.target.value)} type="password" name="password" value={repassword} className="form-control form-control-sm"/>
            <label className="form-label" for="">Password</label>
            </div>
            <div className="col-md-6">
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="password" className="form-control form-control-sm"/>
            <label className="form-label" for="">Re-Enter Password</label>
            </div>
            <div className="d-none">
            <input  className="form-check-input" type="radio" name="userType" id="femaleGender"
                value={userType} defaultChecked />
            </div>
            <button style={{borderRadius:'10px',backgroundColor:'blue'}} onClick={registerUser} >Add User</button>
        </div>
    </div>
  )
}

export default AddUser