import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import validationComponent from '../ValidationComponent';

function LoginComponent  ()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors('');
    setLoading(true); 
    const data = {email, password};

    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
        // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
        
        const response = await axios.post('http://127.0.0.1:8000/api/login', data);

        if (response.data.message) {
          localStorage.setItem('access_token', response.data.access_token);
          toast.success(response.data.message);
          setLoading(false);
          setEmail('')
          setPassword('')
          navigate('/truck_request')
        }
     
    } catch (error) {
        if(error?.response?.status === 401){
            setErrors(error.response.data.message); 
        }
        setLoading(false)
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 mx-auto">
        <div className="card shadow-sm mt-5">
          <div className="card-header bg-primary text-white">
            <h4 className="text-center">Login</h4>
          </div>
          <div className="card-body">
            {errors && <div className="alert alert-danger">{errors}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
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
                {loading ? 'Logging in...' : 'Submit'}
              </button>

              <div className="text-center mt-3">
                <p>Don't have an account? <a href="/register">Register here</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
