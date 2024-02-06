import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  follower: [], 
  following:[],
  posts:[],
  // Add follow status field
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null; // Clear follow status on logout
    },
    setFollowers: (state,action)=>{
      state.follower = action.payload;
    },
    setFollowing: (state,action)=>{
      state.following = action.payload;
    },
    setPost: (state,action)=>{
      state.posts=action.payload;
    }
  },
});

export const { setLogin, setLogout, setFollowers,setFollowing ,setPost} = userSlice.actions;
export default userSlice.reducer;
