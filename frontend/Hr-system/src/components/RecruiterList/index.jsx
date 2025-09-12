import {useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./index.css"

const RecruiterList = ()=>{

    const [jobsList,setJobList] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
          const fetchData = async ()=>{
             const response  = await fetch("http://localhost:8080/api/jobs");
             const data = await response.json();
             setJobList(data);
        }
    
          fetchData();
        },[])

     const addJob =  ()=>{
     navigate("/postjob")
     }

    const deleteData = async (id)=>{
      const option = {
        method:"delete"
      }
      const deleteResponse = await fetch(`http://localhost:8080/api/jobs/${id}`,option);
      const responseOfDelete = await deleteResponse.text();
      // console.log(responseOfDelete);
       const response  = await fetch("http://localhost:8080/api/jobs");
        const data = await response.json();
      setJobList(data);
      
    } 

     const editData = (id)=>{
          navigate(`/recruiter/${id}`)          
    }

    return (
      <div className="recruiter-main-container">
        <div className="recruiter-container">
          <h1>
            Recruiter List
          </h1> 
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.Htg9CtMCS75t5NDh2576CgHaHa%3Fpid%3DApi&f=1&ipt=492900b4ab98d7d5388fe12c0fc2e6cf222f66725dfac5ff0cc67a35c3fa5a05&ipo=images" alt="image" className="recruiter-image"/>
       </div>
       <div className="post-job-container">
           <button className="post-btn" onClick={addJob}>Post Job</button>
       </div>
       <div>
           <div className="rz-table-wrap">
                   <table className="rz-table">
                     <thead className="rz-recruiter-thread">
                       <tr>
                          <th className="rz-th">
                             Title
                           </th>
                           <th className="rz-th">
                             Description
                           </th>
                           <th className="rz-th">
                             Required Skills
                           </th>
                           <th className="rz-th">
                             Recruiter Id
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
                          jobsList.map((each)=>{
                           return (
                             
                                <tr key={each.id} className="each-row-data">
                                    <td >{each.title}</td>
                                    <td className="description">{each.description}</td>
                                    <td  className="description">{each.requiredSkills}</td>
                                    <td style={{"textAlign":"center"}}>{each.recruiterId}</td>
                            
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

      </div>       
    )
}

export default RecruiterList
