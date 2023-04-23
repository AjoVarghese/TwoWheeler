import React from 'react'
import Contacts from '../../components/ChatTest/Contacts/Contacts'
// import ChatContainer from '../../components/ChatTest/ChatContianer/ChatContainer'
import Navbar from '../../components/NAVBAR/Navbar'

function Chat() {
  return (
    <div>
        <Navbar/>
        <div style={{display : "flex"}}>
        <Contacts/>
        {/* <ChatContainer/> */}
           
        </div>
        
    </div>
  )
}

export default Chat