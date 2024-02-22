import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LoginForm';
import hutWood from "../../assets/hut-wood.svg";
import { TypeAnimation } from 'react-type-animation';


function AuthPage(props) {
  return (
    <>
    <img src = {hutWood} style = {{width: "100px"}}></img>
    <h1 className='siteTitle'>CPPHUT.com</h1>
    {/* <h4>the world is yours to script away</h4> */}
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'script huts for exploring syntax',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'script huts for practicing back end',
        1000,
        'script huts for sharing code',
        1000,
        'script huts for minimalist editing',
        1000,
      ]}
      // wrapper="span"
      speed={50}
      style={{color: '#ac5900', display: 'block', fontSize: "2.5vmin"}}
      repeat={Infinity}
    />
    <div className='authpage-forms-container'>
      <SignUpForm setUser={props.setUser}/>
      <LoginForm setUser={props.setUser} />
    </div>
    <p style = {{color: "#8a8178", fontSize: "11px", paddingBottom: "20px"}}>By Micaiah Vinson | Last Updated Jan 31 2024</p>
    </>
  )
}

export default AuthPage