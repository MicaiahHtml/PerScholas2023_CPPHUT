import React from 'react'
import { Link } from 'react-router-dom';
import * as userService from '../utilities/users-services';

function NavBar(props) {
  // Add in functionality to log out
  function handleLogOut () {
    // Delegate to users-service
    userService.logOut();
    // update state will also cause a re-render
    props.setUser(null);
  }
  //const [user, setUser] = useState(getUser());

  return (
    <nav>
        {/* <Link to={props.user.name+'/scripts'}>My Scripts</Link> */}
        <Link to='huts/my'>My Scripts</Link>
        &nbsp; | &nbsp;
        <Link to='/new-script'>New Script</Link>
        &nbsp; | &nbsp;
        <span>Welcome, {props.user.name}</span>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut}>Log Out</Link>
        &nbsp; | &nbsp;
        <Link to="/huts">Search Huts</Link>
    </nav>
  )
}

export default NavBar