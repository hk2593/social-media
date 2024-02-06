import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import LoginForm from './components/LoginPage';
import SignupForm from './components/SignupPage';
import { useSelector } from 'react-redux';
import HomePage from './components/HomePage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MyForm from './components/CreatePost';
import UserPage from './components/UserPage';
import OtherUserProfile from './components/OtherUserProfile';


function App() {  
      const token = useSelector(state => state.auth.token);
      console.log(token)
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={token ? <HomePage /> : <Navigate to="/" />}/>
          <Route path="/createPost" element={token ? <MyForm /> : <Navigate to="/" />}/>
          <Route path="/userId" element={token ? <UserPage /> : <Navigate to="/" />}/>
          <Route path="/userProfile/:userId" element={token ? <OtherUserProfile /> : <Navigate to="/" />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
