import React, { useEffect, useState } from 'react'

function Conversation({chat,currentUserId}) {
    
    const [userData,setUserData] = useState(null)

  return (
    <>
      <div className="follower conversation">
        <div>
            <div className="online-dot">
                <img src={chat?.ProfileImage} alt="profileImage" 
                className='followerImage'
                style={{width : "50px" , height:"50px"}}
                />
                <div className="name" style={{fontSize : "0.8rem"}}>
                   <span>{chat?.Name}</span>
                   <span>Online</span>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Conversation