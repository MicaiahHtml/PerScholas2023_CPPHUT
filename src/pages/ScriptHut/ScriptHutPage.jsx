import React from 'react'
import {checkToken} from '../../utilities/users-services';
import {getScriptListFromUserHut} from '../../utilities/hut-services';
import { getUser } from '../../utilities/users-services';
import {useState, useEffect} from "react";

import ScriptCard from '../../components/ScriptCard';

//props.name: user name belonging to the hut (cpphut.com/huts/my) or (cpphut.com/huts/[username])

export default function ScriptHutPage(props) {
  var hutSign;

  const curUser = getUser();
  const isParamUserCurUser = (props.user.name === curUser.name);

  const [scriptList, setScriptList] = useState([]);
  useEffect(()=>{console.log(scriptList)}, [scriptList]);
  
  const getScriptList = async(user) => {
    try{
    //const u = (isParamUserCurUser) ? curUser : props.user;
    const response = await getScriptListFromUserHut(user);
    const data = await response;
    //console.log(scriptList);
    setScriptList(data);
    //console.log("DATA: ",data)
    }catch(e){
      console.log(e);
    }
  };
  useEffect(()=>{getScriptList(props.user)},[]);


  const handleCheckToken = async () => {
    try {
      const expDate = await checkToken()
      console.log(expDate)
    } catch (err) {
      console.log(err)
    }
  }//for checking when the user will be logged out
  if(isParamUserCurUser){
    hutSign = 'My Hut';
  }else{
    hutSign = `${props.user.name}\'s Hut`;
  }

  return (
    <div>
      <h1>ScriptHut</h1>
      <p>{hutSign}</p>
      <section className='cards'>
        {
        scriptList.length
        ? 
          scriptList.map(
            (ele, index) => {
              return (<ScriptCard user={props.user} script={ele} key={index} isParamUserCurUser={isParamUserCurUser}/>)
            })
        : 
        <p>no scripts yet</p>
        }
      </section>
    </div>
  )
}

/* {
      (props.user === 'my') 
      ?
        <button onClick={handleCheckToken}>Check Log In Expiration</button>
      :
        <></>
      } */