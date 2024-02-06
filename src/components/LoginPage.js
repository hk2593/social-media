import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useDispatch, useSelector } from 'react-redux'; 
import { setFollowers, setFollowing, setLogin } from '../features/auth/authSlice'; 

const LoginForm = () => {
  const dispatch = useDispatch(); 
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const follower=useSelector(state=>state.auth.follower);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', formData);
      console.log(response);
      if (response) {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          })
        );
        dispatch(
          setFollowers(response.data.user.followers)
        );

        
      
        dispatch(
          setFollowing(response.data.user.following)
        )

        
     
       navigate("/dashboard");
    } }catch (error) {
      console.error('Error:', error);
      // Handle error responses from the server
      // You can display an error message to the user
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <p className="mt-3 text-center">Not signed up? <Link to="/signup">Sign up here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
