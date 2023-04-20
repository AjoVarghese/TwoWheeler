import { Box, Paper, Stack, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styles from 'styled-components'
import Navbar from '../../../components/NAVBAR/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserContacts } from '../../../api/User/ApiCalls';
// import { getAllOwnersAction } from '../../../redux/Actions/USER_ACTIONS/chatAction';
import Contacts from '../../../components/Chat/Contacts/Contacts';
import { userLoginReducer } from '../../../redux/Reducers/USER/userLoginReducer';
import Welcome from '../../../components/Chat/Welcome/Welcome';
import ChatContainer from '../../../components/Chat/ChatContainer/ChatContainer';
import { io } from 'socket.io-client'
const socket = io("http://localhost:5000")

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function Chat() {
  const dispatch = useDispatch()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  // const socket = useRef()


  const owners = useSelector((state) => state.ownersReducer.ownersData)
  // const user = useSelector((sate) => userLoginReducer.userLoginDetails)
  // console.log('CURRENT',user);
  const user = JSON.parse(localStorage.getItem('userInfo'))
  console.log('CURRENT',user);

  // useEffect(() => {
  //   dispatch(getAllOwnersAction())
  // },[])

  // useEffect(() => {
  //   if(currentUser){
  //     const details = async () => {
  //       getAllOwnersApi().then((data) => {
  //         setContacts(data.data)
  //       })
  //     }
  //     details()
  //   }
  // },[])

  useEffect(() => {
   
    if (user) {
      const details = async () => {
       getAllUserContacts(user.id).then((data)=>{
         setContacts(data.data)
       })
      }
      details()
    }
  },[])

  useEffect(() => {
   if(user){
    // socket.current = io(host)
    socket.emit("add-user",user.id)
   }
  })
  
  const handleChatChange = (chat) => {
     setCurrentChat(chat)
  }
  

  return (
    <>
    <Navbar/>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2} className='mt-3'>
        <Item><h3>Chat with Bike Owners</h3></Item>
      </Stack>
        </Box>

        <Container>
            <div className="container">
              <Contacts contacts={contacts} 
              currentUser={user}
              changeChat={handleChatChange}
              />
              {
                currentChat === undefined ?(
                  <Welcome currentUser={user}/>
                ) : (
                  <ChatContainer currentUser={user}
                   currentChat={currentChat}
                   socket={socket}
                   />
                )
              }
              
            </div>
        </Container>
    </>
  )
}

const Container = styles.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
// background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;

export default Chat