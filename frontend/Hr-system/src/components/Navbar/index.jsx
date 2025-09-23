import { RiLogoutCircleRFill } from "react-icons/ri"
import { IoMdHome } from "react-icons/io";
import {useNavigate,Link} from "react-router-dom"
import Cookies from 'js-cookie'
import "./index.css"

const  Navbar = ()=>{
      
        const navigate = useNavigate();

        
        const logout = ()=>{
           Cookies.remove("token")
           Cookies.remove("username")
           navigate("/login")
           
        }

      return  <div className="nav-bar">
                    <div className="logo-container">
                        <h1 className="neon-text">HIRE</h1>
                        <p className="cabinet">CABINET</p>
                    </div>
                    <div className="logout-home-container">
                        <div>
                            <Link to="/dashboard" className="logout-container home-link">
                                <IoMdHome className="logout-icon icon-home"/>
                                <p className="logout-btn text-home">Home</p> 
                            </Link>
                        </div>    
                        <div className="logout-container" onClick={logout}>
                            <RiLogoutCircleRFill className="logout-icon"/>
                            <button className="logout-btn">Logout</button>
                        </div>
                    </div>
               </div>
}

export default Navbar