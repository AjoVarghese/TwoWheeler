import React, { useEffect, useState } from 'react'
import styles from 'styled-components'
import ChatInput from './ChatInput'
import Message from './Message'
import { getAllMessagesAPI, sendMessageAPi } from '../../api/User/ApiCalls'
function ChatContainer({currentUser,currentChat}) {

    const [messages,setMessages] = useState([])

    const handleSendMsg = async(msg) => {
       sendMessageAPi({
        from : currentUser.id,
        to : currentChat._id,
        message : msg
       })
    }

    useEffect(async() => {
        const response = await getAllMessagesAPI({
            from : currentUser.id,
            to : currentChat._id
        })
        setMessages(response.data)
    },[currentChat])
  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={currentChat.ProfileImage} alt="" />
                </div>    
                    <div className="username">
                        <h3>{currentChat.Name}</h3>
                    </div>
                </div>
            </div>

            {/* <Message/> */}
            <div className="chat-messages">
        {
          messages.map((message) => {
            return (
              <div>
                <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                  <div className="content">
                    <p>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
            <ChatInput handleSendMsg = {handleSendMsg}/>
            <div className="chat-input"></div>
    </Container>
  )
}

const Container = styles.div`
padding-top : 1rem;
 .chat-header {
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding : 0.2rem;
    .user-details {
        display : flex;
        align-items : center;
        gap : 1rem;
        .avatar {
            img {
                height : 2.5rem
            }
        }
        .username {
            h3 {
                color : white
            }
        }
    }
 }
`
export default ChatContainer