import React from 'react'
import { setIsLogged, setUser, setMessage } from '../actions';
import { useDispatch, useSelector } from 'react-redux'

const Modal = () => {
  const text = useSelector(state => state.modalMessage);
  const dispatch = useDispatch();

  return (
      <div className='modal-container'>
        <div className='modal'>
          <p>{text}</p>
          <button className='input-btn' onClick={()=> dispatch(setMessage(''))}>
            Ok
          </button>
        </div>
      </div>
  )
}

export default Modal