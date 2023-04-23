import React, { useEffect, useState } from 'react'

function Conversation({chat,currentUserId}) {
    
    const [userData,setUserData] = useState(null)

    // useEffect(() => {
    //     //checking from chats collection members field and getting id not equal to logged in user id
    //     // const userId = chat?.members.find((id) => id !== currentUserId.id)
    //     // console.log(userId,'xxxxxxxxxx');
    //    const getUserData = async() => {
    // //      const {data} = await getUser
    // //      setUserData(data)
    //    }
    // },[])
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