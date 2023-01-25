import React, {useEffect, useState} from 'react';
import jwt from 'jsonwebtoken'
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState("");
    const [type,setType] = useState("");
    const [searchValue, setSearchValue] = useState("")

    const navigate = useNavigate();
   
    useEffect(() =>{
      const loggedInUser = localStorage.getItem('token');
      if(loggedInUser) {
          const decoded = jwt.verify(loggedInUser, 'secret123');
          const userType = decoded.userType;
          setType(userType);
          if(userType === 'user'){
            navigate('/')
          }else{
            userDetails();
          }
      }else{
        navigate('/')
      }
    },[])
    useEffect(() => {
      if (searchValue.length >0){
      const newPacientes = users.filter(value => value.lastName.toLowerCase().includes(searchValue.toLowerCase()))
      // const newPacientes= users.filter(value => value.lastName.toLowerCase() === searchValue.toLowerCase())
      setUsers(newPacientes)
      }else{
        userDetails();
      }
    }, [searchValue])

    async function deleteUser(userId){
        const id = userId
        const response = await  fetch(`http://localhost:8000/admin/userDelete/${id}`)
        const data = await response.json()
        if (data.status === 'deleted') {
            alert("Deleted Successfully")
            window.location.reload();
          }else{
            alert("Deletion Failed"); 
          }
    }

      async function userDetails(){
        try{
        const response = await fetch("http://localhost:8000/admin/dashboard")
              const data = await response.json()
              console.log(data)
              if (data.errormsg) {
                navigate('/');
              }else{
                setUsers(data.userDisplay)
              }
        }catch (err){
          navigate('/')
        }
       }

  return (
  <div class="table-responsive">
    <input type="text" style={{width:'90%',margin:'1em',marginLeft:'3em'}} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder="Search by name"/>
      <div class="table-wrapper">
          <div class="table-title" >
                  <div class="col-md-12"><h2>Employee <b>Details</b></h2>
                  <button style={{marginBottom:'20px'}} type="button" class="btn btn-info add-new">
                  <Link style={{color:'black'}} to={'/admin/addUser'} >Add New User</Link></button>
                  </div>
          </div>
          <table id="userTable" class="table table-bordered">
              <thead>
                  <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Mobile Number</th>
                      <th>Email</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                {
                    users.map(user=> {
                        return(<tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.mobNumber}</td>
                        <td>{user.email}</td>
                      <td>
                          <Link className='btn btn-warning m-2' to={`/admin/userEdit/${user._id}`} >Edit</Link>
                            <button class="btn btn-danger m-2" onClick={()=>{deleteUser(user._id)}} >Delete</button>
                      </td>
                    </tr>)
                    })
                }
                    
              </tbody>
          </table>
      </div>
  </div>

  )
}

export default AdminDashboard