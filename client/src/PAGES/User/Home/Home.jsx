import React, { useEffect } from 'react'
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
import './Home.css'
import 'semantic-ui-css/semantic.min.css'
import {Form,Button} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userHomeReducer } from '../../../REDUX/Reducers/USER/userHomeReducer'
import { Toaster } from 'react-hot-toast'



function Home() {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let userData = useSelector(state => state.userLoginReducer)
  console.log("HOME USERDATA",userData);

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo")
    console.log("HOME USERINFO",userInfo);

    navigate('/')
    

    // if(userInfo) {
    //   navigate('/')
    // } else {
    //   navigate('/login')
    // }
  },[])
  return (
   
    <div>
      <Navbar/>
      <section>
      <Toaster
       position="top-right"
       reverseOrder={false}
       toastOptions={{duration:4000}}
      />
       <div className='landing-page'>
        Landing Page
        {/* <img src={require('../../../Assets/Images/ll.png')} alt="" /> */}
        {/* <div className='left-section'>
          <img src={require('../../../Assets/Images/yy.png')} alt="" />
        </div> */}
        {/* <div className='right-section'>
        <img src={require('../../../Assets/Images/landing.png')} alt="" />
        </div> */}
          

          {/* <div className='left-section'>
           <div className='search'>
            <div className='search-box'>
            <h3>Search</h3>
            <div className='form-div'>
              <Form>
                <div className='left-first'>
                <Form.Field>
                  <label htmlFor="">Pickup</label>
                  <div className='inp-date'>
                  <input type="date" placeholder='Date' />
                  </div>
                  <div className='inp-time'>
                  <input type="time" placeholder='Time'  />
                  </div>
                   
                </Form.Field>
                </div>
                
              </Form>
            </div>
            </div>
           </div>
          </div> */}

          {/* <div className='right-section'>
             <div className='image-section'>
              iii
             <img src={require('../../../Assets/Images/landing.png')} alt="" />
             </div>
          </div> */}
       </div>
      </section>
      
      {/* <section>
        <div className='store'>
           <div className='bike-cards'>
               <h1>Bike Store</h1>
                
           </div>
        </div>
      </section> */}
    </div>
  )
}

export default Home