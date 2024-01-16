// import dependencies
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

// import my functionality that I've added
import { getUser } from '../../utilities/users-services';

// css
import './App.css'

// import pages
import AuthPage from '../Auth/AuthPage';
import ScriptPage from '../Script/ScriptPage';
import ScriptHutPage from '../ScriptHut/ScriptHutPage';
import SearchHutsPage from '../SearchHutsPage/SearchHutsPage';

// import components
import NavBar from '../../components/NavBar';

function App() {
  const [user, setUser] = useState(getUser());

  // in here
  // use the useState hook to define a state variable called user
  // initialize that to null
  // the setter function should be named according to convention
  return (
    <>
      {
        user
          ?
          <>
            <NavBar user={user} setUser={setUser}/>
            < Routes >
              <Route path='/new-script' element={<ScriptPage code='default' title='' user={user}/>}/>
              {/* <Route path={user.name + '/scripts'} element={<ScriptHistoryPage />}/> */}
              <Route path='huts/my' element={<ScriptHutPage user='my'/>}/>
              <Route path='huts' element={<SearchHutsPage/>}/>
              <Route path='/' element={<Navigate to='huts/my'/>}/> 
            </Routes>
          </>
          :
          < AuthPage setUser={setUser} />
      }
    </>
  )
}

export default App
