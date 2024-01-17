import React from 'react'
import {checkToken} from '../../utilities/users-services';
import {getScriptListFromUserHut} from '../../utilities/hut-services';
import { getUser, findUserByName } from '../../utilities/users-services';
import {useState, useEffect} from "react";
import { useEffectOnce } from '../../utilities/methods/useEffectOnce';

import ScriptCard from '../../components/ScriptCard';
import { useParams } from 'react-router-dom';



export default function ScriptHutPage(props) {
  var hutSign;
  
  const thisParams = useParams();
  const curUser = getUser();
  
  const [thisUser, setThisUser] = useState({});
  const [isParamUserCurUser, setIsParamUserCurUser] = useState(false);

  const [scriptList, setScriptList] = useState([]);
  //useEffect(()=>{console.log(scriptList)}, [scriptList]);
  
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

  const prepareHutIfNotYours = async ()=>{ //if not our script hut, set it up for other users
    setThisUser('loading');
    if(thisParams.userName && !props.user){
      console.log("We're at someone else's hut :) ");
      const q = thisParams.userName;
      //console.log(q);
      //const res = await findUserByName(q);
      //setThisUser(res);
      await findUserByName(q).then(result=>setThisUser(result));
      
      console.log(thisUser);
    }else{
      setIsParamUserCurUser(true);
      setThisUser(props.user);
      //console.log(props.user);
    }
    hutSign = (isParamUserCurUser) ? 'My Hut' : `${thisUser.name}\'s Hut`;
  }
  const fetchData = async()=>{
    await prepareHutIfNotYours();
    await getScriptList(thisUser);
  }
  useEffect( ()=>{
    async function a(){await prepareHutIfNotYours()}
    a();
  },[]);
  useEffect(()=>{
    console.log(thisUser)
    async function b(){await getScriptList(thisUser)}
    if(thisUser != {}) b();
  }, [thisUser])

  const handleCheckToken = async () => {
    try {
      const expDate = await checkToken()
      console.log(expDate)
    } catch (err) {
      console.log(err)
    }
  }//for checking when the user will be logged out


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
              return (<ScriptCard user={thisUser} script={ele} key={index} isParamUserCurUser={isParamUserCurUser}/>)
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