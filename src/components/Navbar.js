import React, { useState,useEffect } from 'react';
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../features/auth/authSlice'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchResults from './SearchResults';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const user=useSelector(state=>state.auth.user);
  const handleSearchChange = async (event) => {
    const query = event.target.value.trim();
    setSearchQuery(query);
    if (query === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/search?q=${encodeURIComponent(query)}`);
      console.log("mera response",response);
      setSearchResults(response.data);
      console.log("mera search results",searchResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };
  useEffect(() => {
    console.log("mera search results", searchResults);
  }, [searchResults]);
  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <div><SearchResults searchResults={searchResults}/>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/dashboard" className="navbar-brand text-white">MySocial</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Add your navigation items here if needed */}
            </ul>
            <div className="d-flex align-items-center justify-content-center flex-grow-1">
              <form className="d-flex" role="search">
                <input 
                  className="form-control me-2 rounded-pill border-0 search-input" 
                  type="search" 
                  placeholder="Search" 
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange} />
                {/* Suggestions */}
                
              </form>
            </div>
            <div className="upload-icon-container">
              <Link to="/createPost">
                <i className="fas fa-upload text-white"></i>
              </Link>
            </div>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {user.fullName}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;







