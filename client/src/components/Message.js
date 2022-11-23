
import React from 'react'

const Message = ({ author, message }) => {
  return (
    <div className='message'>
      <p>{author}: {message}</p>
    </div>
  )
}

export default Message