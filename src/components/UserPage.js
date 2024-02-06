import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

import { useSelector } from 'react-redux';
import axios from 'axios';
import CustomCard from './ShowPost';
import CardComponent from './UserProfileCard';

const UserPage = () => {
    const [posts,setPosts]=useState([]);
    const token = useSelector(state => state.auth.token);
    const user=useSelector(state=>state.auth.user);
    console.log(user);
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        occupation: '',
        followers: [],
        picture: null,
        _id:''
      });
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/post/${user._id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setPosts(response.data.reverse());
            
            // Assuming response.data contains the posts
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
        fetchData();
        setUserDetails({
            fullName: user.fullName,
            occupation: user.occupation,
            followers: user.followers,
            picture: user.picturePath,
            _id:user._id
          });
    }, [user, token]);
   
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Navbar></Navbar>
      <div style={{ marginTop: '70px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: '20px',marginTop:"25px" }}><CardComponent userDetails={userDetails}/></div>
        <div><CustomCard mypost={posts}></CustomCard></div>
      </div>
    </div>
    
    
    
  )
}

export default UserPage
