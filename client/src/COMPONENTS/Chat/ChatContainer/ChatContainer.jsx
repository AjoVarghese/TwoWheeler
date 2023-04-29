import React, { useEffect, useRef, useState } from "react";
import styles from "styled-components";
import ChatInput from "../ChatInput/ChatInput";
import { v4 as uuidv4 } from "uuid";
import { getAllMessagesAPI, sendMessageAPI } from "../../../api/User/ApiCalls";
import ChatImage from "../../ChatImage/ChatImage";

function ChatContainer({ currentUser, currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [showImage, setshowImage] = useState(false);
  const [image, setImage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat) {
      const messages = async () => {
        const response = await getAllMessagesAPI({
          from: currentUser.id,
          to: currentChat._id,
        });
        setMessages(response.data);
        console.log(response.data, "ALL MESSAGES");
      };
      messages();
    }
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    sendMessageAPI({
      from: currentUser.id,
      to: currentChat._id,
      message: msg,
    }).then((data) => {
      socket.emit("send-msg", {
        to: currentChat._id,
        from: currentUser.id,

        message: data.data,
      });

      console.log(messages, "THIS IS THE MESSAGE SENDINGG");
      setMessages([...messages, data.data]);
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (msg) => {
        //  console.log(messages,"THIS IS THE FCKING MESSAGES");
        // console.log('msg',msg);
        //  setMessages([msg,..messages]);
        // setMessages([...messages, msg]);
        setMessages((prevMessages) => [...prevMessages, msg]);
        console.log("msgeeeeeeee", messages);
      });
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages, showImage]);

  return (
    <>
      {showImage ? (
        <ChatImage
          setShowImage={setshowImage}
          message={messages}
          image={image}
          currentUser={currentUser}
        />
      ) : (
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
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  {console.log(
                    message.sender,
                    currentUser.id,
                    "THISS IS IS IS IS"
                  )}
                  <div
                    className={`message ${
                      message.sender === currentUser.id ? "sended" : "received"
                    }`}
                  >
                    <div className="content">
                      {message.message?.text === "" ? (
                        <img
                          src={message.message?.image}
                          alt=""
                          style={{
                            width: "10rem",
                            height: "10rem",
                            background: "none",
                          }}
                          onClick={() => {
                            setshowImage(true);
                            setImage(message.message?.image);
                          }}
                          key={message.message?.id} 
                        />
                      ) : (
                        <p>
                          {message.message?.text}
                          {console.log("wwwwww",message.message?.text)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <ChatInput
            handleSendMessage={handleSendMessage}
            currentUser={currentUser}
            currentChat={currentChat}
            socket={socket}
            message={messages}
            setMessages={setMessages}
          />
          
          <div className="chat-input"></div>
        </Container>
      )}
    </>
  );
}

const Container = styles.div`
display: grid;
      grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
       grid-template-rows: 10% 78% 12%;
  }
  .chat-header {
    background-color:#F5F5DC;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 2.5rem;
          border-radius:20px
        }
      }
      .username {
        h5 {
            margin-bottom:0;
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: grey;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #0f8aab;
        p {
            margin-bottom:0;
        }
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #387180;
         p {
            margin-bottom:0;
        }
      }
    }
  }
 
`;
export default ChatContainer;
