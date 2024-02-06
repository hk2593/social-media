import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

import { useSelector } from 'react-redux';
import axios from 'axios';
import CustomCard from './ShowPost';
import CardComponent from './UserProfileCard';
import { useParams } from 'react-router-dom';

const OtherUserProfile = () => {
    const [posts,setPosts]=useState([]);
    const { userId } = useParams();
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
            const userResponse = await axios.get(`http://localhost:4000/user/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setPosts(userResponse.data.reverse());
            setUserDetails({
          fullName: userResponse.data[0].userId.fullName,
          occupation: userResponse.data[0].userId.occupation,
          followers: userResponse.data[0].userId.followers,
          picture: userResponse.data[0].userId.picturePath,
          _id: userResponse.data[0].userId._id
          });
            // Assuming response.data contains the posts
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
        fetchData();
       
    }, [user, token]);
   console.log('posts',posts)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Navbar></Navbar>
      <div style={{ marginTop: '70px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: '20px',marginTop:"25px" }}><CardComponent userDetails={userDetails}/></div>
        <div><CustomCard posting={posts}></CustomCard></div>
      </div>
    </div>
    
    
    
  )
}

export default OtherUserProfile
