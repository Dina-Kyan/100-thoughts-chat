import React from 'react'
import { setMessage, setUser } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import useAccess  from '../hooks/useAccess ';


const SubmitThoughts = () => {
    const thoughtInput = React.useRef(null);
    const user = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const access = useAccess();
    const submitThought = (e) => {
        if (thoughtInput.current.value.length < 371) {
            try {
                fetch('http://localhost:5000/thoughts/add', {
                    method: 'POST',
                    body: JSON.stringify({
                        author: user.name,
                        message: thoughtInput.current.value
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': user.token
                    },
                }).then(res => {
                    if (res.ok) {
                        dispatch(setMessage('Your thought is successfully submitted!'));
                        user.total++ 
                        dispatch(setUser(user));
                        return res.json();
                    }
                    throw new Error('Something went wrong');
                }).then(result => {
                    thoughtInput.current.value = ''
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
                <h2> Share your amazing expression</h2>
                <textarea ref={thoughtInput} className='textArea'>

                </textarea>
                <input onClick={(e) => submitThought(e)} className='input-btn' type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default SubmitThoughts