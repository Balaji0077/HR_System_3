import {Navigate,Link} from "react-router-dom"
import {useState,useEffect} from "react"
import { FaArrowRightLong } from "react-icons/fa6"
import Cookies from "js-cookie"
import "./index.css"
import Navbar from "../Navbar"
const DashBoard = ()=>{

    const [role,setRole] = useState("")
    const [dataCandidate,setDataCandidate ]= useState("")
    useEffect(()=>{
        const token = Cookies.get("token")
        const email = Cookies.get("username")
         const option = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
             } 
         }
        async function role (){
            const response = await fetch(`http://localhost:8080/api/check/${email}`,option)
            const data = await response.json();
            setDataCandidate (data)
            setRole(data.role);
            
        }

        role()
    },[])
    return <>
            {
                Cookies.get("token")===undefined?
                   <Navigate to="/login"/>
                :
                <div className="dashboard-container">
                    <Navbar/>
                   { 
                    role==="Role_Candidate"?
                       
                     <div className="dashboard-navigator">
                           <div>
                              <h1 className="candidate-dashboard-text">Candidates Portal</h1>
                              <img src="https://cdn-icons-png.freepik.com/512/11569/11569582.png?ga=GA1.1.1491802060.1757505789" alt="picture" className="candidate-profile-to-identify"/>
                              <h2 className="email-text">{dataCandidate.email}</h2>
                           </div>
                           <div className="candidates-container">
                               <div className="heading-profile-candidate-dashboard">
                                 <h1 className="candidate-text candidate-apply-for-job-text">Fill in the Details</h1>
                                 <img src="https://cdn-icons-png.freepik.com/512/13330/13330944.png?ga=GA1.1.1491802060.1757505789" alt="candidate" className="candidate-image"/>
                               
                               </div>
                                <hr className="line"/>
                                <div className="checkout-btn-outer-dasnboard">
                                    <Link to="/form" className="link-to">
                                            <div className="btn-checkout-container">
                                            <button className="checkout-btn">Check Out </button>
                                            <FaArrowRightLong className="checkout-arrow"/> 
                                            </div>
                                    </Link>
                                </div>
                           </div> 
                           <div className="candidates-container">
                            <div className="heading-profile-candidate-dashboard">
                                <h1 className="candidate-text candidate-apply-for-job-text">Apply For Jobs</h1>
                                <img src="https://cdn-icons-png.freepik.com/512/8062/8062190.png?ga=GA1.1.1491802060.1757505789" alt="candidate" className="candidate-image"/>
                               
                            </div>
                            <hr className="line"/>
                            <div className="checkout-btn-outer-dasnboard">
                                   <Link to="/openings" className="link-to">
                                        <div className="btn-checkout-container">
                                        <button className="checkout-btn">Check Out </button>
                                        <FaArrowRightLong className="checkout-arrow"/> 
                                        </div>
                                    </Link>
                            </div>

                           </div>
                          
                     </div> 
                
                     :
                     <div className="dashboard-navigator">
                        <div className="candidates-container">
                            <div className="heading-profile-candidate-dashboard">
                                <h1 className="candidate-text">Candidates</h1>
                                <img src="https://cdn-icons-png.freepik.com/512/17986/17986373.png?ga=GA1.1.1491802060.1757505789" alt="candidate" className="candidate-image"/>
                               
                            </div>

                            <hr className="line"/>
                            <div className="checkout-btn-outer-dasnboard">
                                    <Link to="/" className="link-to">
                                        <div className="btn-checkout-container">
                                        <button className="checkout-btn">Check Out </button>
                                        <FaArrowRightLong className="checkout-arrow"/> 
                                        </div>
                                    </Link>
                            </div>

                        </div> 
                        <div className="candidates-container">
                            <div className="heading-profile-candidate-dashboard">
                                <h1 className="candidate-text">JOBS</h1>
                                <img src="https://img.freepik.com/free-photo/hands-holding-up-colorful-letters-forming-word-jobs_53876-146857.jpg?t=st=1758391630~exp=1758395230~hmac=de0183432cef0dcaa144c55742e2306ec7af1252acc6bed30a64ed8b498556f8&w=1480" alt="candidate" className="candidate-image"/>
                               
                            </div>

                            <hr className="line"/>
                            <div className="checkout-btn-outer-dasnboard">
                                    <Link to="/recruiter" className="link-to">
                                        <div className="btn-checkout-container">
                                        <button className="checkout-btn">Check Out </button>
                                        <FaArrowRightLong className="checkout-arrow"/> 
                                        </div>
                                    </Link>
                            </div>

                        </div> 
                         <div className="candidates-container">
                            <div className="heading-profile-candidate-dashboard">
                                <h1 className="candidate-text candidate-apply-for-job-text">Apply For Candidate</h1>
                                <img src="https://cdn-icons-png.freepik.com/512/8062/8062190.png?ga=GA1.1.1491802060.1757505789" alt="candidate" className="candidate-image"/>
                               
                            </div>

                            <hr className="line"/>
                            <div className="checkout-btn-outer-dasnboard">
                                   <Link to="/openings" className="link-to">
                                        <div className="btn-checkout-container">
                                        <button className="checkout-btn">Check Out </button>
                                        <FaArrowRightLong className="checkout-arrow"/> 
                                        </div>
                                    </Link>
                            </div>

                        </div> 
                     </div>
                   }         
                 </div>
            }    
    
    </>
}

export default DashBoard
