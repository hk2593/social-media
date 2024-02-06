import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios'; // Import Axios
import { useSelector } from 'react-redux';
import "./CreatePost.css";
const MyForm = () => {
  const [caption, setCaption] = useState('');
  const [picture, setPicture] = useState(null);
  
  const token = useSelector(state => state.auth.token);
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('picture', picture);
  
    try {
      // Make POST request using Axios
      const response = await axios.post('http://localhost:4000/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }).then(
        setCaption(""),
        setPicture(null)
      );
  
      // Clear both caption and picture fields
      
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="caption" className="form-label">Caption</label>
            <input type="text" className="form-control" id="caption" value={caption} onChange={handleCaptionChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="picture" className="form-label">Upload Picture</label>
            <input type="file" className="form-control" id="picture" onChange={handlePictureChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
}

export default MyForm;

