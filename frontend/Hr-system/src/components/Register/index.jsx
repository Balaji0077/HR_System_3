import {useState} from "react"
import {useNavigate,Link} from "react-router-dom"
import "./index.css"
const Register = ()=>{
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [role,setRole] = useState("Role_Recruiter")
     const [checkCredentials,setCredentials] =  useState(false)

     const navigate = useNavigate()
     const userNameChange = (event)=>{
         setUserName(event.target.value)
     }

     const passwordChange = (event)=>{
            setPassword(event.target.value)
     }

     const roleChange = (event)=>{
          setRole(event.target.value);
       
     }

      const loginSubmitted = async (event) =>{
          event.preventDefault();

           const details ={
            "email":username,
            "password":password,
            "role":role
          }

          const option = {
             method:"POST",
             headers:{
                "Content-Type":"application/json"
             },
             body: JSON.stringify(details)
             
          }
          const response = await fetch("http://localhost:8080/api/auth/register",option);
         
          if(response.ok)
          { 
      
            setCredentials(false)
            setUserName("")
            setPassword("")
            setRole("Role_Recruiter")
            navigate("/login")

          }
          
          else{
             setCredentials(true)
          }
      }



   return (
      <div className="login-page-container">
            <div className="login-box-container">
             <img src="https://cdn-icons-png.freepik.com/512/14668/14668936.png?ga=GA1.1.1491802060.1757505789" alt="failure" className="profile-login-image"/>
            <form onSubmit={loginSubmitted}>
                <div className="input-login-container-box">
                     <label htmlFor="user" className="username-text">UserName</label>
                     <br/>
                     <input required value={username} className="input-box-login" type="text" placeholder="Enter Email id" id="user" onChange={userNameChange}/>
                </div>
                <div className="input-login-container-box">
                     <label htmlFor="login-pass" className="username-text">Password</label>
                     <br/>
                     <input required value={password} className="input-box-login" type="password" placeholder="Enter Password" id="login-pass" onChange={passwordChange}/>
                </div>  
                <div className="input-login-container-box">
                     <label htmlFor="login-role" className="username-text">Select Role</label>
                     <br/>
                     <select id="login-role" onChange={roleChange} className="input-box-login">
                        <option value="Role_Recruiter">Recruiter</option>
                        <option value="Role_Admin">Admin</option>
                     </select>
                </div> 
                 {checkCredentials&&<p className="warnings">**Username Already Exists! Please Login **</p>}
                <div>
                    <button className="login-btn" type="submit">Register</button>
                </div> 
                <div>
                   <p className="signup-text">Already have an account?  <Link to="/login"><span className="register-text">Login</span></Link></p>
                </div>     
            </form>
          </div>
            </div>
   )
}

export default Register
