import React, { useEffect, useState } from 'react'
import './Contact.css'
import ChatContainer from '../ChatContianer/ChatContainer'
import { useSelector } from 'react-redux'
import { getAllUserchatApi } from '../../../api/User/ApiCalls'
function Contacts() {
    const userDetails = useSelector((state) => state.userLoginReducer.userLoginDetails)
    let userId = userDetails.id

    const [users,setUsers] = useState()

    useEffect(() => {
       
        const getUsers = async() => {
            try {
                const res = await getAllUserchatApi(userId)
                console.log("res",res);
                setUsers(res)
            } catch (error) {
                
            }
           
        }
        getUsers()
    },[])
  return (
    <div className="mainContactContainer">
        <div>
            <div style={{width : '20pc',padding:'10px'}}>
                <input type="search" placeholder='search..' className='searchbarForContact'/>
            </div>
            <div className='usersDetailsContainer'>
               <div className='userContainer'>
                <img src="" className='ChatUserImage' alt="" />
                
                <div style={{marginLeft:'10px'}}>
                    <p style={{color:'black',textAlign:'start'
                    ,marginTop:'5px',fontSize:'15px'}}>Ajo Varghese</p>
                    <p style={{color:'black',textAlign:'start',marginTop:'16px',fontSize:'14px'}}>Open your message</p>
                </div>
                </div> 

                <div className='userContainer'>
                <img src="" className='ChatUserImage' alt="" />
                
                <div style={{marginLeft:'10px'}}>
                    <p style={{color:'black',textAlign:'start'
                    ,marginTop:'5px',fontSize:'15px'}}>Ajo Varghese</p>
                    <p style={{color:'black',textAlign:'start',marginTop:'16px',fontSize:'14px'}}>Open your message</p>
                </div>
                </div> 
                

            </div>
        </div>
        <ChatContainer/>
    </div>
  )
}

export default Contacts