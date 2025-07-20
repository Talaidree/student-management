import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

export default function AddStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: parseInt(age), grade }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to add student');
        return response.json();
      })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
     <>
        <Navbar />
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
<h1> Add a student</h1>
<form onSubmit={handleSubmit}>
  <div className='mb-2'>
    <label htmlFor="name">Name:</label>
    <input type='text' name='name' className='form-control' placeholder='Enter name'
    onChange={e => setName(e.target.value)} />
  </div>

  <div className='mb-2'>
    <label htmlFor="name">age:</label>
    <input type='text' name='name' className='form-control' placeholder='Enter age'
    onChange={e => setAge(e.target.value)} />
  </div>

  <div className='mb-2'>
    <label htmlFor="name">grade:</label>
    <input type='text' name='name' className='form-control' placeholder='Enter grade'
    onChange={e => setGrade(e.target.value)} />
  </div>

  <button className='btn btn-success me-2'>Submit</button>
  <Link to="/" className='btn btn-secondary'>Back</Link>
</form>

      </div>
    </div>
    </>
  );
}