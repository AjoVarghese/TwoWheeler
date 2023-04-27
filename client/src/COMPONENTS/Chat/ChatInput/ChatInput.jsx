import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { imageSendApi } from "../../../api/User/ApiCalls";


function ChatInput({ handleSendMessage,currentUser,currentChat,socket ,setMessages,message}) {
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiData, event) => {
    let message = msg;
    message += emojiData.emoji;
    setMsg(message);
  };

  // send chat
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };


  const sendImage = (e) => {
    if(e.target.files.length !== 0){
      let image = e.target.files[0]
      //cloudinary
      const formData = new FormData()
      formData.append('file',image)
      formData.append("upload_preset","ml_default")
      formData.append("cloud_name","dxt9i7gl6")
      fetch("https://api.cloudinary.com/v1_1/dxt9i7gl6/image/upload",{
      method : "post",
      body : formData
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Cloud',data.url);
      const imageMessageDetails = {
        from : currentUser.id,
        to : currentChat._id,
        image : data.secure_url
      }
      imageSendApi(imageMessageDetails).then((data) => {
        console.log("Image send api",data);
        console.log('messaes',message);
        setMessages([...message,data.data])
      })
    })

    }
    
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
      <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" onChange={sendImage}/>
              <PhotoCamera />
            </IconButton>
        <input
          type="text"
          placeholder="type your messages here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #36454f;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: yellow;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -480px;
        box-shadow: 0 5px 10px #054d60;
        border-color: #054d60;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #054d60;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .epr-emoji-list:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0f8aab;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
