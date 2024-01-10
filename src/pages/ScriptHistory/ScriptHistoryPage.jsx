import React from 'react'
import {checkToken} from '../../utilities/users-services';

function ScriptHistoryPage() {
  const handleCheckToken = async () => {
    try {
      const expDate = await checkToken()
      console.log(expDate)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>ScriptHistoryPage</h1>
      <button onClick={handleCheckToken}>Check Log In Expiration</button>
    </div>
  )
}

export default ScriptHistoryPage