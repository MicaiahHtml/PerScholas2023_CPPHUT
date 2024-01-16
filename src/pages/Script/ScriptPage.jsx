import React from 'react'
import CodeEditor from '../../components/CodeEditor';
import CompileButton from '../../components/CompileButton';
import { useState, useEffect } from 'react';
import InputSend from '../../components/InputSend';
import SaveButton from '../../components/SaveButton';

//props.code
function ScriptPage(props) {
  const [userCode, setUserCode] = useState(props.code);
  const [userTitle, setUserTitle] = useState(props.title)
  const [userInput, setUserInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const codeState = {userCode, setUserCode}; 
  //LINE 13: Puts line 10 into a way that compiler services understands.
  const updateUserInput = (evt) => {
    setUserInput(evt.target.value);
    //console.log(userInput, evt);
  }
  const updateUserTitle = (evt) => {
    setUserTitle(evt.target.value);
  }
  const onCompile = (outputDetails) => {alert(atob(outputDetails.stdout))};
  return (
    <div className='new-script-page-container'>
      <h1>ScriptPage</h1>
      <SaveButton code = {userCode} title = {userTitle} currentUser = {props.user}/>
      <input className='script-title-input-box' type='text' onChange={updateUserTitle}/>
      <CodeEditor codeState = {codeState}/>
      <InputSend name = "userInput" submitFunction = {updateUserInput}/> 
      <CompileButton codeState = {codeState} userInput = {userInput} onCompile = {onCompile}/>
    </div>
  )
}

export default ScriptPage