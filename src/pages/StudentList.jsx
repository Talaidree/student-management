import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";




export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch students");
        return response.json();
      })
      .then((data) =>{ setStudents(data);
      setFiltered(data);})
      .catch((error) => console.error(error));
  }, []);

  // Function to handle deleting a student
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this student?");
    if(confirm){

   
    fetch(`http://localhost:3001/students/${id}`, { method: "DELETE" })
      .then(() => {
        // Remove the deleted student from the state
        const updatedList = students.filter((student) => student.id !== id);
        setStudents(updatedList);
        setFiltered(updatedList);
      })
      .catch((error) => console.error("Error deleting student:", error)); }
  };

   const handleSearch = (query) => {
    const filteredList = students.filter((student) =>
      student.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filteredList);
  };
  return (
    <>
    <Navbar onSearch={handleSearch}/>
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
  <h1>Student List</h1>

  <div className="w-75 rounded bg-white border shadow p-4">
    
    <div className="d-flex justify-content-end">
      <Link to='/Add'className="btn btn-success">Add +</Link>
     </div>
    <table className="table table-striped"> 
      <thead>
        <tr>
          <th>id</th>
          <th> Name</th>
          <th>Age</th>
          <th>Grade</th>
          <th>Actions</th>


        </tr>
      </thead>
      <tbody>
        {
          filtered.map((student , i) => (
            <tr key={i}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.grade}</td>
            <td>
              <Link to ={`/edit/${student.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
              <button className='btn btn-sm btn-danger'  onClick={() => handleDelete(student.id)}>Delete</button>
           
  

             
            </td>
          
           </tr>


          ))

        }
      </tbody>
    </table>

      {/* <ul>
        {students.map((student) => (
          <li key={student.id}>
            <span>
              {" "}
              {student.name} - Age: {student.age}, Grade: {student.grade}
            </span>
          
          </li>
        ))}
      </ul> */} 
      
    </div>
    </div>
    </>
  );
}
