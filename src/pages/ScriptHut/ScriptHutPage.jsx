import React from 'react'
import {checkToken} from '../../utilities/users-services';

//props.name: user name belonging to the hut (cpphut.com/huts/my) or (cpphut.com/huts/[username])

export default function ScriptHutPage(props) {
  const handleCheckToken = async () => {
    try {
      const expDate = await checkToken()
      console.log(expDate)
    } catch (err) {
      console.log(err)
    }
  }
  const hutSign = (props.user === 'my') ? `My Hut` : `${props.user}\'s Hut`;
  

  return (
    <div>
      <h1>ScriptHut</h1>
      <p>{hutSign}</p>
      {
      (props.user === 'my') 
      ?
        <button onClick={handleCheckToken}>Check Log In Expiration</button>
      :
        <></>
      }
    </div>
  )
}