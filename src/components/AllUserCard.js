import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useSelector,useDispatch } from 'react-redux';
import { setFollowers ,setFollowing} from '../features/auth/authSlice';

const AllUserCard = ({ users }) => {
  // State to keep track of follow status for each user

  const token = useSelector(state => state.auth.token);
  
  const dispatch = useDispatch(); 
  const follower=useSelector(state=>state.auth.follower);
  
  const follow=async(userId)=>{
    try {
      const response = await axios.post('http://localhost:4000/user/follow',{id:userId}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(
        setFollowers(response.data.updatedUser.followers)
      )
      dispatch(
        setFollowing(response.data.updatedUser.following)
      )
     
      
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  const unfollow=async(userId)=>{
    try {
      const response = await axios.delete('http://localhost:4000/user/follow', {
      data: { id: userId }, // Wrap the id in an object and pass it as data
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    dispatch(
      setFollowers(response.data.updatedUser.followers)
    )
    dispatch(
      setFollowing(response.data.updatedUser.following)
    )
      
  
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  return (
    <div className="container">
      <div className="card" style={{ width: '300px' }}>
        <h2 style={{ padding: '10px', marginLeft: '10px' }}>Users</h2>
        <div className="card-body">
          {users.map((user, index) => (
            <div key={index} className="d-flex align-items-center mb-3">
              <Link to={`/userProfile/${user._id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={`http://localhost:4000/assets/${user.picturePath}`}
                  className="card-img-top rounded-circle mr-3"
                  alt={user.fullName}
                  style={{
                    width: '60px',
                    height: '60px',
                    border: '2px solid #ccc',
                    borderRadius: '50%'
                  }}
                />
              </Link>
              <div>
                <Link to={`/userProfile/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h5 className="card-title mb-1" style={{ marginLeft: "10px" }}>{user.fullName}</h5>
                </Link>
                {/* Toggle between "Follow" and "Unfollow" based on followStatus of the current user */}
                <button
    className="btn btn-primary mt-2 p-1"
    style={{ marginLeft: "10px" }}
    onClick={() => {
        if ( follower.includes(user._id)) {
            unfollow(user._id);
        } else {
            follow(user._id);
        }
       
    }}
>
    { follower.includes(user._id) ? "Unfollow" : "Follow"}
</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllUserCard;
