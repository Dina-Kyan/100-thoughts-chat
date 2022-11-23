import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import useAccess from '../hooks/useAccess ';


const User = () => {
    const user = useSelector(state => state.userReducer);
    const access = useAccess();

    return (
        <div className='user-container'>
            <h2>User info</h2>
            <div className='center'>
                <span>Name: </span>
                <span>{user.name}</span>
            </div>
            <div className='center'>
                <span>Email: </span>
                <span>{user.email}</span>
            </div>
            <div className='center'>
                <span>Registration date: </span>
                <span>{user.date ? user.date.slice(0, 10).replaceAll('-', '/') : ''}</span>
            </div>
            <div className='center'>
                <span>Total thoughts: </span>
                <span>{user.total}</span>
            </div>
            <div>
                <Link to="/UserThoughts">
                    See your incredible thoughts
                </Link>
            </div>
        </div>
    )
}

export default User