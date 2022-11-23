import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { setMessage } from '../actions';
import { useDispatch } from 'react-redux';
import useAccess from '../hooks/useAccess ';

const Registration = () => {
  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [isPasswordEqual, setIsPasswordEqual] = useState();
  const access = useAccess(true);
  const nameInput = useRef(null);
  const passwordInput = useRef(null);
  const passwordConfInput = useRef('');
  const emailInput = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkName = () => {
    if (nameInput.current.value.length > 2) setValidName(true);
    else setValidName(false);
  }

  const checkValidPassword = () => {
    const passwordIsValid = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/.test(passwordInput.current.value);
    if (passwordConfInput.current.value) checkIsPasswordEqual()
    if (passwordIsValid) setValidPassword(true);
    else setValidPassword(false);
  }

  const checkIsPasswordEqual = () => {
    if (passwordInput.current.value === passwordConfInput.current.value) setIsPasswordEqual(true)
    else setIsPasswordEqual(false)
  }

  const registration = (e) => {
    if (validName && validPassword && isPasswordEqual) {
      try {
        fetch('http://localhost:5000/user/register', {
          method: 'POST',
          body: JSON.stringify({
            name: nameInput.current.value,
            password: passwordInput.current.value,
            email: emailInput.current.value
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Something went wrong');
        }).then(result => {
          navigate('/Login');
          dispatch(setMessage('Registration completed successfully, you can log in now.'))
        })
      } catch (err) {
        console.log(err);
      }
    }

    e.preventDefault()
  }

  return (
    <div className='form-container'>
      <form action="" method="get" className="form" >
        <h2>Registration</h2>
        <div className='inputs'>
          <div className='center'>
            <div>
              <label htmlFor="name">Enter a usernasme: </label>
              <input onChange={checkName} ref={nameInput} type="text" name="name" id="name" ></input>
            </div>
            <p style={{ color: validName ? '#232C33' : 'red' }} >Your username has to be min 3 and max 20 characters long</p>
          </div>
          <div className='center'>
            <div>
              <label htmlFor="password">Enter a password: </label>
              <input onChange={checkValidPassword} ref={passwordInput} type="text" name="password" id="password"></input>
            </div>
            <div>
              <label htmlFor="password2">Confirm password: </label>
              <input onChange={checkIsPasswordEqual} ref={passwordConfInput} type="text" name="password" id="password2"></input>
            </div>
            <p style={{ color: validPassword ? '#232C33' : 'red' }}>Your password has to min 6 characters long including Uppercase letters and numbers.</p>
            {isPasswordEqual ? '' : !!passwordConfInput.current.value ? <p style={{ color: 'red' }}>Passwords are not equal!!! </p> : ''}
          </div>
          <div className='center'>
            <div>
              <label htmlFor="email">Enter your email: </label>
              <input ref={emailInput} type="email" name="email" id="email" ></input>
            </div>
          </div>
        </div>
        <input onClick={(e) => registration(e)} className='input-btn' type="submit" value="REGISTER"></input>
      </form>
    </div>
  )
}

export default Registration