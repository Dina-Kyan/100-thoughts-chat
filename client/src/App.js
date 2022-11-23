import React from 'react';
import './App.css';
import Messages from './components/Messages';
import UserMessages from './components/UserMessages';
import Registration from './components/Registration';
import Login from './components/Login';
import SubmitThoughts from './components/SubmitThoughts';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import User from './components/User';
import Modal from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setThoughts } from './actions';

function App() {
  const thoughts = useSelector(state => state.thoughtReducer);
  const modalMessage = useSelector(state => state.modalMessage);
  const dispatch = useDispatch();
  

  // React.useEffect(() => {
  // }, [thoughts]);

  return (
    <div className="App">
      {modalMessage ? <Modal /> : ''}
      <div className='container'>

        <div className='logo'>
          <span>100Thoughts</span>
          <span>Express yourself!</span>
        </div>

        <div className='content'>
          <Routes>
            <Route exact path="/" element={<Messages />}></Route>
            <Route path="UserThoughts" element={<UserMessages />}></Route>
            <Route path="user" element={<User />}></Route>
            <Route path="Registration" element={<Registration />}></Route>
            <Route path="Login" element={<Login />}></Route>
            <Route path="SubmitThoughts" element={<SubmitThoughts />}></Route>
          </Routes>
          <Nav />
        </div>

      </div>
    </div>
  );
}

export default App;
