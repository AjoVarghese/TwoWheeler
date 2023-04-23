import React from 'react'
import './ChatContainer.css'
function ChatContainer() {
  return (
    <div className="MainChatContainer">
        <div>
           <div style={{display:'flex',marginLeft:'30px',marginTop:'10px',backgroundColor:'rgb(241 243 241)',width:'70pc',padding:'5px',borderRadius:'10px'}}>
            <img src="" alt="image" className='userProfile'/>
            <p style={{marginTop:'10px',marginLeft:'10px',}}>Ajo</p>
           </div>
           <div className='msgContainer'>
            <div className='msg' >
                <img src="" alt="image" className='chatUserProfile'/>
                <p className='msgTxt' >hi hello pahugaufahopaf uafg asi qdasygf aofj afs gfbafadf</p>
            </div>
            <div style={{display:'flex',alignItems:'center',marginLeft:'30px',backgroundColor:'rgb(241 243 241)',marginTop:'10px',padding:'3px',borderRadius:'10px',width:'50%',marginTop:'10px',marginLeft:'610px'}}>
                {/* <img src="" alt="image" className='chatUserProfile'/> */}
                <p style={{textAlign:'start',marginLeft:'10px'}}>hi hello pahugaufahopaf uafg asi qdasygfafs a vfa ad af a afd a a a aaf aofj afs gfbafadf</p>
            </div>
            <div className='msg' >
                <img src="" alt="image" className='chatUserProfile'/>
                <p className='msgTxt' >hi hello pahugaufahopaf uafg asi qdasygf aofj afs gfbafadf</p>
            </div>

            <div style={{display:'flex',alignItems:'center',marginLeft:'30px',backgroundColor:'rgb(241 243 241)',marginTop:'10px',padding:'3px',borderRadius:'10px',width:'50%',marginTop:'10px',marginLeft:'610px'}}>
                {/* <img src="" alt="image" className='chatUserProfile'/> */}
                <p style={{textAlign:'start',marginLeft:'10px'}}>hi hello pahugaufahopaf uafg asi qdasygfafs a vfa ad af a afd a a a aaf aofj afs gfbafadf</p>
            </div>
            <div className='msg' >
                <img src="" alt="image" className='chatUserProfile'/>
                <p className='msgTxt' >hi hello pahugaufahopaf uafg asi qdasygf aofj afs gfbafadf</p>
            </div>
           </div>

           <div className='msgSenderContainer'>
             <input type="text" placeholder='send msg...' name="" id=""  className='msginput'/>
             <button className='msgButton'>Send</button>
           </div>
        </div>
    </div>
  )
}

export default ChatContainer