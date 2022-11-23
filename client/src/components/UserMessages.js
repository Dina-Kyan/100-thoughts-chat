import React from 'react'
import Message from './Message'
import useAccess from '../hooks/useAccess ';
import useThoughtsFetch from '../hooks/useThoughtsFetch';

const UserMessages = () => {
  const access = useAccess();
  const handleThoughts = useThoughtsFetch('thoughts/author');

  return (
    <div className='chat-container'>
      <svg onClick={()=> handleThoughts.changePage(-1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
      </svg>

      <div className={handleThoughts.loading ? 'messages loading' : 'messages'}>
        {
          handleThoughts.thoughts.map(e=> <Message author={e.author} message={e.message} key={e._id}/>)
        }
      </div>

      <svg onClick={()=> handleThoughts.changePage(+1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

export default UserMessages