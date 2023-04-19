import React, { useEffect, useState } from 'react'
import styles from 'styled-components'


function Contacts({contacts,currentUser,changeChat}) {
  
  const [currentUserName,setCurrentUserName] = useState(undefined)
  const [currentUserImage,setCurrentUserImage] = useState(undefined)
  const [currentSelected,setCurrentSelected] = useState(undefined)

  useEffect(() => {
   if(currentUser){
    setCurrentUserImage(currentUser.ProfileImage)
    setCurrentUserName(currentUser.Name)
   }
  },[currentUser])

  const changeCurrentChat = (index,contact) => {
      setCurrentSelected(index)
      changeChat(contact)
  }

  return (
        <>
        {
          currentUserName && currentUserImage && (
            <Container>
               <div className="brand">
                <img src="https://media.istockphoto.com/id/1197203809/vector/live-chat-speech-bubbles-concept-vector-stock-illustration.jpg?s=612x612&w=0&k=20&c=DB02XNlZ0eeEfDO7WB0ylExYSKq1u0zRxNU2p86m-Oo=" alt="" />
                <h3>Chat</h3>
               </div>
               <div className="contacts">
                {
                  contacts ? contacts.map((contact,index) => {
                        return (
                          <div className={`contact ${
                            index === currentSelected ? "selected" : ""
                            }`} key={index}
                            onClick={() => changeCurrentChat(index,contact)}
                            >
                             <div className="avatar">
                               <img 
                               src={contact.ProfileImage} 
                               alt="avatar"
                                />
                             </div>
                             <div className="username">
                              <h3>{contact.Name}</h3>
                             </div>
                          </div>
                        )
                  }) : "No Owners to chat with"

                  
                }
               </div>
               <div className="current-user">
               <div className="avatar">
                <img 
                 src={currentUserImage} 
                  alt="sender"
                  />
                  </div>
                  <div className="username ">
                    <p >{currentUserName}</p>
                  </div>
               </div>
            </Container>
          )
        }
        </>
  )
}

const Container = styles.div`
display: grid;
grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  background-color: #054D60;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    p {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.3s ease-in-out;
          font-weight: bold;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        p {
          color: white;
        }
      }
    }
    .selected {
      background-color: #129bc0c7;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      p {
       font-weight: bold;
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        p {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts