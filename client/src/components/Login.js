import React from 'react';
import { useNavigate } from "react-router-dom";
import { setIsLogged, setUser, setMessage } from '../actions';
import { useDispatch } from 'react-redux'
import useAccess from '../hooks/useAccess ';

const Login = () => {
    const navigate = useNavigate();
    const passwordInput = React.useRef(null);
    const emailInput = React.useRef(null);
    const dispatch = useDispatch();
    const access = useAccess(true);

    const login = (e) => {
        e.preventDefault()
        if (passwordInput && emailInput) {
            try {
                fetch('http://localhost:5000/user/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        password: passwordInput.current.value,
                        email: emailInput.current.value
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(response => {
                    if (response.ok) {
                        dispatch(setIsLogged(true))
                        dispatch(setMessage('You are logged in, welcom back!'));
                        navigate('/', { replace: true });
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                }).then(result => {
                    dispatch(setUser(result));
                })
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className='form-container'>
            <form action="" method="get" className="form" >
                <h2>Log In</h2>
                <div className='inputs'>
                    <div className='center'>
                        <div>
                            <label htmlFor="password">Enter your password: </label>
                            <input ref={passwordInput} type="text" name="password" id="password" required></input>
                        </div>
                    </div>
                    <div className='center'>
                        <div>
                            <label htmlFor="email">Enter your email: </label>
                            <input ref={emailInput} type="email" name="email" id="email" required></input>
                        </div>
                    </div>
                </div>
                <input onClick={(e) => login(e)} className='input-btn' type="submit" value="Log In"></input>
            </form>
        </div>
    )
}

export default Login