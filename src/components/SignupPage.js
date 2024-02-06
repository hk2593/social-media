import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    occupation: '',
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullname);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('occupation', formData.occupation);
    formDataToSend.append('picture', formData.picture);
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:4000/auth/register', formDataToSend, {
        
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type for FormData
        },
      }).then(setFormData({
          fullname: '',
          email: '',
          password: '',
          occupation: '',
          picture: null,
        }));

      if (response.status === 200) {
        // Registration successful, handle accordingly
        console.log('Registration successful');
        
      } else {
        // Registration failed, handle accordingly
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-3">
            <div className="card-body">
              <h2 className="text-center mb-3">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="fullname" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter your full name" required />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
                </div>
                <div className="mb-2">
                  <label htmlFor="occupation" className="form-label">Occupation</label>
                  <input type="text" className="form-control" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Enter your occupation" required />
                </div>
                <div className="mb-2">
                  <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" id="profilePicture" name="profilePicture" onChange={handleFileChange} accept="image/*" />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-2">Sign Up</button>
                <p className="mt-3 text-center">Already have an account? <Link to="/">Sign in here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

