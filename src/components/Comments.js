import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Comment = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const token = useSelector(state => state.auth.token);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/comment',
        {
          id: postId,
          comment: commentText
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Comment added:', response.data);
      // Reset the comment text after adding
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Enter your comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button className="btn btn-primary" type="button" onClick={fetchData}>Add</button>
    </div>
  );
};

export default Comment;

