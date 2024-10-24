import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import validationComponent from '../ValidationComponent';

function RegisterComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    const data = { name, email, password };

    try {
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
      
      const response = await axios.post('http://127.0.0.1:8000/api/register', data);
      
      if (response.data.message) {
        toast.success(response.data.message);
        setIsRegistered(true); 
        setName('');
        setEmail('');
        setPassword('');
        setLoading(false); 
        navigate('/login');
      }
    } catch (error) {
        setLoading(false); 
        if (error?.response?.status === 422) {
          setErrors(error.response.data.message); 
        } else if (error?.response?.data?.message) {
          toast.error(error.response.data.message); 
        } else {
          toast.error('An error occurred. Please try again.');
        }
        console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 mx-auto">
        <div className="card shadow-sm mt-5">
          <div className="card-header bg-primary text-white">
            <h4 className="text-center">Register</h4>
          </div>
          <div className="card-body">
            {/* {isRegistered && <div className="alert alert-success">Registration successful! Please log in.</div>} */}
            {errors && <div className="alert alert-danger">{errors}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {validationComponent(errors, 'name')}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {validationComponent(errors, 'email')}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password*</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {validationComponent(errors, 'password')}
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registering...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
