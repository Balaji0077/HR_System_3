import {useState,useEffect} from 'react'
import {Link,useNavigate,Navigate} from "react-router-dom"
import Cookies from "js-cookie"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./index.css"
import Navbar from '../Navbar';

const CandidateList = ()=>{

    const [candidate,setCandidate] = useState([])
    const [role,setRole] = useState("")
     const navigate = useNavigate()
    

    useEffect(()=>{
      const fetchData = async ()=>{

        const token = Cookies.get("token")
         const option = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
             } 
         }
         const response  = await fetch("http://localhost:8080/api/candidates",option);
         const data = await response.json();
         setCandidate(data);
      }

      fetchData();
    },[])
    
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
            setRole(data.role);
        }

        role()
    },[])

    const editData = (id)=>{
          navigate(`/form/${id}`)          
    }

    const deleteData = async (id)=>{

      const token = Cookies.get("token")
      const option = {
        method:"delete",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
             } 
      }
      const deleteResponse = await fetch(`http://localhost:8080/api/candidates/${id}`,option);
      const responseOfDelete = await deleteResponse.text();
       
        const options = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
             } 
         }
       const response  = await fetch("http://localhost:8080/api/candidates",options);
        const data = await response.json();
      setCandidate(data);
      
    }

    const addCandidate = ()=>{
         navigate("/form");
    }

    return (
    <>
    { Cookies.get("token")!==undefined && role!=="Role_Candidate"?
    <div className="candidate-list-container">
    <Navbar/>
    <div className="rz-wrapper">
      <div className="profile-container">
        <img src="https://img.freepik.com/free-vector/user-with-pie-chart_78370-7032.jpg?t=st=1757505794~exp=1757509394~hmac=814b7ac17e601c1661f262030c2713f607e59818f13fb98266089852c6fe73bb&w=1480" alt="candidate" className="profile-image"/>
       <h1 className="rz-title">Candidates List</h1>
      </div>
      <div className="rz-add-btn"><button className="add-btn" onClick={addCandidate}>Add Candidate</button></div>
      <div className="rz-table-wrap">
        <table className="rz-table">
          <thead className="rz-thead">
            <tr>
               <th className="rz-th">
                  Name
                </th>
                <th className="rz-th">
                  Email
                </th>
                <th className="rz-th">
                  Phone Number
                </th>
                <th className="rz-th">
                  Current Status
                </th>
                <th className="rz-th">
                  Resume Link
                </th>
                <th className="rz-th">
                  Edit
                </th>
                { role==="Role_Admin"&&
                <th className="rz-th">
                  Delete
                </th>
                }
            </tr>
          </thead>
          <tbody className="rz-tbody">
           {
               candidate.map((each)=>{
                return (
                  
                     <tr key={each.id} className="each-row-data">
                         <td >{each.name}</td>
                         <td >{each.email}</td>
                         <td >{each.phoneNumber}</td>
                         <td >{each.currentStatus}</td>
                         <td ><a href={each.resumeLink} target="_blank">{each.resumeLink}</a></td>
                         <td ><button  className="edit-btn" onClick={()=>editData(each.id)}><MdEdit className="edit-icon"/></button></td>
                         {role==="Role_Admin"&&<td ><button className="edit-btn" onClick={()=>deleteData(each.id)}><MdDelete className="edit-icon"/></button></td>}
                     </tr>
                    
                  
                )
               })
           }
          </tbody>
        </table>
      </div>
    </div>
    </div>
    :
    <Navigate to="/login"/>
   }
  </>
    )
}

export default CandidateList
