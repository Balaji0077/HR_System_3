import {useState} from "react"
import {useNavigate,Navigate,Link} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"


const Login = ()=>{

     const  navigate = useNavigate()
     const [username,setUserName] = useState("")
     const [password,setPassword] = useState("")
     const [checkCredentials,setCredentials] =  useState(false)

     const userNameChange = (event)=>{
         setUserName(event.target.value)
     }

     const passwordChange = (event)=>{
            setPassword(event.target.value)
     }

     const loginSubmitted = async (event) =>{
          event.preventDefault();
           
          const details ={
            "email":username,
            "password":password
          }

          const option = {
             method:"POST",
             headers:{
                "Content-Type":"application/json"
             },
             body: JSON.stringify(details)
             
          }
          const response = await fetch("http://localhost:8080/api/auth/login",option);

          if(response.ok)
          { 
            const token = await response.json();
            Cookies.set("token",token.token,{expires:1})
            Cookies.set("username",username,{expires:1})
            setCredentials(false)
            setUserName("")
            setPassword("")
            navigate("/dashboard")
          }
          
          else{
             setCredentials(true)
          }
          
     }

     return <>
     { Cookies.get("token")===undefined?
        <> 
            <div className="login-page-container">
            <div className="login-box-container">
             <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1758346949~exp=1758350549~hmac=28b209d3cc1d80db14439123ccf8380880ba837de52678f013d0ae75d027f713&w=1060" alt="failure" className="profile-login-image"/>
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
                 {checkCredentials&&<p className="warnings">**Invalid Username or Password!**</p>}
                <div>
                    <button className="login-btn" type="submit">Login</button>
                </div> 
                <div>
                    <p className="signup-text">Don't have an account? <Link to="/register"><span className="register-text">Register</span></Link></p>
                </div>     
            </form>
          </div>
            </div>
        </>    
            :
         <Navigate to="/dashboard"/>   

     }
     </> 
}

export default Login
