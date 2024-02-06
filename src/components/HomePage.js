import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import CustomCard from './ShowPost';
import './HomePage.css'; // Import CSS file for styling
import {  useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
import CardComponent from './UserProfileCard';
import AllUserCard from './AllUserCard';
import { setPost } from '../features/auth/authSlice';


const HomePage = () => {
  const dispatch=useDispatch();
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
 
  console.log('userdetaisl',user);
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    occupation: '',
    followers: [],
    following:[],
    picture: null,
  });
  const [users,setUsers]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/post', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        dispatch(setPost(response.data.reverse()));
        
        setPosts(response.data.reverse());
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();

    setUserDetails({
      fullName: user.fullName,
      occupation: user.occupation,
      followers: user.followers,
      following:user.following,
      picture: user.picturePath
    });
  }, []);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/allUser', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data.reverse());
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  },[])
  return (
    <div>
      <Navbar />
      <div className='parent-container'>
        <div className='child-container'>
          <CardComponent userDetails={userDetails}/>
        </div>
        <div className="content-container ">
          <CustomCard />
        </div>
        <div>
          <AllUserCard users={users}></AllUserCard>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
