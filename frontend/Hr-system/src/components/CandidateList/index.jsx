import {useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CandidateForm from '../CandidateForm';
import "./index.css"

const CandidateList = ()=>{

    const [candidate,setCandidate] = useState([])
     const navigate = useNavigate()

    useEffect(()=>{
      const fetchData = async ()=>{
         const response  = await fetch("http://localhost:8080/api/candidates");
         const data = await response.json();
         setCandidate(data);
      }

      fetchData();
    },[])
  
    const editData = (id)=>{
         
          navigate(`/form/${id}`)
         
          
    }
    const deleteData = async (id)=>{
      const option = {
        method:"delete"
      }
      const deleteResponse = await fetch(`http://localhost:8080/api/candidates/${id}`,option);
      const responseOfDelete = await deleteResponse.text();
      // console.log(responseOfDelete);
       const response  = await fetch("http://localhost:8080/api/candidates");
        const data = await response.json();
      setCandidate(data);
      
    }

    const addCandidate = ()=>{
         navigate("/form");
    }

    return (
    <>
    <div className="rz-wrapper">
      <h1 className="rz-title">Candidates List</h1>
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
                <th className="rz-th">
                  Delete
                </th>
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
                         <td ><button className="edit-btn" onClick={()=>deleteData(each.id)}><MdDelete className="edit-icon"/></button></td>
                     </tr>
                    
                  
                )
               })
           }
          </tbody>
        </table>
      </div>
    </div>
  </>
    )
}

export default CandidateList
