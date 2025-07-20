import { useEffect, useState } from 'react';
import { useParams, useNavigate ,Link} from 'react-router-dom';

export default function EditStudent() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/students/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setAge(data.age);
        setGrade(data.grade);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: parseInt(age), grade }),
    })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
     <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
       <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
 <h1> Edit a student</h1>
 <form onSubmit={handleSubmit}  > 
   <div className='mb-2'>
     <label htmlFor="name">Name:</label>
     <input type='text' id='name' name='name' className='form-control' placeholder='Enter name'
   value={name}  
   onChange={(e) => setName(e.target.value)}/>
   </div>
 
   <div className='mb-2'>
     <label htmlFor="age">Age:</label>
     <input type='text' id='age' name='age' className='form-control' placeholder='Enter age'
     value={age} 
     onChange={e => setAge(e.target.value)}/>
   </div>
 
   <div className='mb-2'>
     <label htmlFor="grade">Grade:</label>
     <input type='text' id='grade' name='grade' className='form-control' placeholder='Enter grade'
       value={grade}
       onChange={e => setGrade(e.target.value)}/>
   </div>
 
   <button className='btn btn-success me-5'>Edit</button>
    <Link to="/" className='btn btn-secondary'>Back</Link>
   
 </form>
 
       </div>
     </div>
  );
}