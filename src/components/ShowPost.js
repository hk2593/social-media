import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowPost.css';
import Comment from './Comments'; 
import { useDispatch, useSelector} from 'react-redux';
import { FaThumbsUp } from 'react-icons/fa';
import { setPost } from '../features/auth/authSlice';


const CustomCard = ({posting,mypost}) => {
  console.log('posting',posting)
  const dispatch=useDispatch();
  const [showCommentsForPost, setShowCommentsForPost] = useState(null);
  const [comments, setComments] = useState([]);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const posts=useSelector(state=>state.auth.posts);

  const fetchData = async (postId) => {
    try {
      const response = await axios.get('http://localhost:4000/getComments', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: { id: postId }
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };



  const Like = async (postId) => {
    try {
      const response = await axios.post('http://localhost:4000/setlike', { id: postId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update the likes state for the specific post
      const responsepost = await axios.get('http://localhost:4000/post', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch(setPost(responsepost.data.reverse()));
     
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const removeLike = async (postId) => {
    try {
      const response = await axios.post('http://localhost:4000/removelike', { id: postId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update the likes state for the specific post
      const responsepost = await axios.get('http://localhost:4000/post', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch(setPost(responsepost.data.reverse()));
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };

 
  useEffect(() => {
    if (showCommentsForPost !== null) {
      fetchData(showCommentsForPost);
    }
  }, [showCommentsForPost]);

  const toggleComments = (postId) => {
    setShowCommentsForPost(postId === showCommentsForPost ? null : postId);
  };

  return (
    <div>{mypost && mypost.map((post, index) => (
      <div key={index} className="card post-card" style={{ width: '28rem', height: 'auto', marginTop: '60px' }}>
        <img className="card-img-top" style={{ height: '180px' }} src={`http://localhost:4000/assets/${post.postPicturePath}`} alt="Card image cap" />
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <img src={`http://localhost:4000/assets/${post.userId.picturePath}`} style={{ height: '40px', width: '40px', borderRadius: "50%" }} alt="User" />
              <a href={`/userProfile/${post.userId._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <p><b>{post.userId.fullName}</b></p>
              </a>
            </div>
            <div>
              <FaThumbsUp
                onClick={() => {
                  if (post.likes.includes(user._id)) {
                    removeLike(post._id);
                  } else {
                    Like(post._id);
                  }
                }}
                style={{ cursor: 'pointer', color: post.likes.includes(user._id) ? 'red' : 'grey' }}
              />
            </div>
          </div>
          <p className="card-text">{post.caption}</p>
          <button className="btn btn-primary" onClick={() => toggleComments(post._id)}>
            {showCommentsForPost === post._id ? 'Hide Comments' : 'Show Comments'}
          </button>
          <div style={{ marginTop: "3px", marginBottom: "3px" }}>
            {showCommentsForPost === post._id && <Comment postId={post._id}></Comment>}
            {showCommentsForPost === post._id && comments.map((comment, commentIndex) => (
              <div key={commentIndex}>
                <img src={`http://localhost:4000/assets/${comment.userId.picturePath}`} style={{ height: '30px', width: '30px', borderRadius: "50%" }} alt="User" />
                <p><b>{comment.userId.fullName}:</b> {comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
      {posting && posting.map((post, index) => (
        <div key={index} className="card post-card" style={{ width: '28rem', height: 'auto', marginTop: '60px' }}>
          <img className="card-img-top" style={{ height: '180px' }} src={`http://localhost:4000/assets/${post.postPicturePath}`} alt="Card image cap" />
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <img src={`http://localhost:4000/assets/${post.userId.picturePath}`} style={{ height: '40px', width: '40px', borderRadius: "50%" }} alt="User" />
                <a href={`/userProfile/${post.userId._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p><b>{post.userId.fullName}</b></p>
                </a>
              </div>
              <div>
                <FaThumbsUp
                  onClick={() => {
                    if (post.likes.includes(user._id)) {
                      removeLike(post._id);
                    } else {
                      Like(post._id);
                    }
                  }}
                  style={{ cursor: 'pointer', color: post.likes.includes(user._id) ? 'red' : 'grey' }}
                />
              </div>
            </div>
            <p className="card-text">{post.caption}</p>
            <button className="btn btn-primary" onClick={() => toggleComments(post._id)}>
              {showCommentsForPost === post._id ? 'Hide Comments' : 'Show Comments'}
            </button>
            <div style={{ marginTop: "3px", marginBottom: "3px" }}>
              {showCommentsForPost === post._id && <Comment postId={post._id}></Comment>}
              {showCommentsForPost === post._id && comments.map((comment, commentIndex) => (
                <div key={commentIndex}>
                  <img src={`http://localhost:4000/assets/${comment.userId.picturePath}`} style={{ height: '30px', width: '30px', borderRadius: "50%" }} alt="User" />
                  <p><b>{comment.userId.fullName}:</b> {comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {!posting && !mypost && posts.map((post, index) => (
        <div key={index} className="card post-card" style={{ width: '28rem', height: 'auto', marginTop: '60px' }}>
          <img className="card-img-top" style={{ height: '180px' }} src={`http://localhost:4000/assets/${post.postPicturePath}`} alt="Card image cap" />
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <img src={`http://localhost:4000/assets/${post.userId.picturePath}`} style={{ height: '40px', width: '40px', borderRadius: "50%" }} alt="User" />
                <a href={`/userProfile/${post.userId._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p><b>{post.userId.fullName}</b></p>
                </a>
              </div>
              <div>
                <FaThumbsUp
                  onClick={() => {
                    if (post.likes.includes(user._id)) {
                      removeLike(post._id);
                    } else {
                      Like(post._id);
                    }
                  }}
                  style={{ cursor: 'pointer', color: post.likes.includes(user._id) ? 'red' : 'grey' }}
                />
              </div>
            </div>
            <p className="card-text">{post.caption}</p>
            <button className="btn btn-primary" onClick={() => toggleComments(post._id)}>
              {showCommentsForPost === post._id ? 'Hide Comments' : 'Show Comments'}
            </button>
            <div style={{ marginTop: "3px", marginBottom: "3px" }}>
              {showCommentsForPost === post._id && <Comment postId={post._id}></Comment>}
              {showCommentsForPost === post._id && comments.map((comment, commentIndex) => (
                <div key={commentIndex}>
                  <img src={`http://localhost:4000/assets/${comment.userId.picturePath}`} style={{ height: '30px', width: '30px', borderRadius: "50%" }} alt="User" />
                  <p><b>{comment.userId.fullName}:</b> {comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomCard;









