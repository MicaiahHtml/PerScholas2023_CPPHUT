//SCRIPT PAGE IS A BEAST OF A COMPONENT! 

import React from 'react'
import CodeEditor from '../../components/CodeEditor';
import CompileButton from '../../components/CompileButton';
import { useState, useEffect } from 'react';
import InputSend from '../../components/InputSend';
import SaveButton from '../../components/SaveButton';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OutputWindow from '../../components/OutputWindow';

//props.code, props.title
function ScriptPage(props) {
  const [userCode, setUserCode] = useState(props.code);
  const [userTitle, setUserTitle] = useState(props.title)
  const [userInput, setUserInput] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const codeState = {userCode, setUserCode}; //don't change please
  const saveState = {isSaved, setIsSaved};
  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    console.log("ScriptPage: ", isSaved);
    let unloadCallback;
    if(!isSaved){
      unloadCallback = (event) => {
        event.preventDefault();
        event.returnValue = "";
        return "";
      };
    }else{
      unloadCallback = () => {console.log("Saved n safe")};
    }
      window.addEventListener("beforeunload", unloadCallback);
      return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [isSaved]);

  const updateUserInput = (evt) => {
    setUserInput(evt.target.value);
    //console.log(userInput, evt);
  }
  const updateUserTitle = (evt) => {
    setUserTitle(evt.target.value);
  }
  const onCompile = (outputDetails) => {
    //alert(atob(outputDetails.stdout));
    setCodeOutput(outputDetails);
  };

  const compilerParameterFunctions = {
    showSuccessToast,
    showErrorToast,
    onCompile
  }

  return (
    <div className='new-script-page-container'>
      <h1>ScriptPage</h1>
      <SaveButton saveState = {saveState} code = {userCode} title = {userTitle} currentUser = {props.user}/>
      <input className='script-title-input-box' type='text' onChange={updateUserTitle}/>
      <CodeEditor codeState={codeState} saveState={saveState}/>
      <InputSend name = "userInput" submitFunction = {updateUserInput}/> 
      <CompileButton codeState = {codeState} userInput = {userInput} functions = {compilerParameterFunctions}/>
      <OutputWindow outputDetails = {codeOutput}/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default ScriptPage