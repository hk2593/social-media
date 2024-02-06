import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CardComponent = ({ userDetails }) => {
  const follower = useSelector(state => state.auth.follower);
  const following = useSelector(state => state.auth.following);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [followDetails, setFollowDetails] = useState([]);
  const [followingDetails, setFollowingDetails] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const fetchFollowers = async () => {
    try {
      if (showFollowers) {
        setShowFollowers(false); // Toggle visibility if already shown
      } else {
        const response = await axios.get('http://localhost:4000/getUserFollowers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFollowDetails(response.data.followers);
        setShowFollowers(true);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
      // Handle error
    }
  };

  const fetchFollowing = async () => {
    try {
      if (showFollowing) {
        setShowFollowing(false); // Toggle visibility if already shown
      } else {
        const response = await axios.get('http://localhost:4000/getUserFollowers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFollowingDetails(response.data.following);
        setShowFollowing(true);
      }
    } catch (error) {
      console.error('Error fetching following:', error);
      // Handle error
    }
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        {userDetails.fullName === user.fullName ? (
          <a href={`/userId`} style={{ textDecoration: "none" }}>
            <h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: "35px", marginRight: "10px" }}>
              <b>{userDetails.fullName}</b>
            </h6>
          </a>
        ) : (
          <a href={`/userProfile/${userDetails._id}`} style={{ textDecoration: "none" }}>
            <h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: "35px", marginRight: "10px" }}>
              <b>{userDetails.fullName}</b>
            </h6>
          </a>
        )}

        <img src={`http://localhost:4000/assets/${userDetails.picture}`} style={{ height: '120px', width: '120px', borderRadius: "50%" }} alt="User profile" />
        <p style={{ fontSize: "20px", marginLeft: "10px" }}><b>{userDetails.occupation}</b></p>
        <div>
          <p onClick={fetchFollowers} style={{cursor:"pointer"}}>followers : {follower?.length || 0}</p>
          {showFollowers && (
            <div>
              {followDetails.map((follower, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <img src={`http://localhost:4000/assets/${follower.picturePath}`} alt="Follower profile" style={{ height: '50px', width: '50px', borderRadius: "50%", padding: "2px" }} />
                  <p style={{ padding: "4px" }}>{follower.fullName}</p>
                </div>
              ))}
            </div>
          )}
          <p onClick={fetchFollowing} style={{cursor:"pointer"}}>following : {following?.length || 0}</p>
          {showFollowing && (
            <div>
              {followingDetails.map((following, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <img src={`http://localhost:4000/assets/${following.picturePath}`} alt="Following profile" style={{ height: '50px', width: '50px', borderRadius: "50%", padding: "2px" }} />
                  <p style={{ padding: "4px" }}>{following.fullName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
