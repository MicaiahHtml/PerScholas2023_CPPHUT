//SCRIPT PAGE IS A BEAST OF A COMPONENT! 

import React from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'universal-cookie';
import JSEncrypt from "jsencrypt";


import "react-toastify/dist/ReactToastify.css";

import CodeEditor from '../../components/CodeEditor';
import CompileButton from '../../components/CompileButton';
import InputSend from '../../components/InputSend';
import SaveButton from '../../components/SaveButton';
import OutputWindow from '../../components/OutputWindow';
import { useEffectOnce } from '../../utilities/methods/useEffectOnce';
import { redirect } from 'react-router-dom';


//props.code, props.title
export default function ScriptPage(props) {
  
  const [userCode, setUserCode] = useState(props.code);
  const [userTitle, setUserTitle] = useState(props.title)
  const [userInput, setUserInput] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const codeState = {userCode, setUserCode}; //don't change please
  const saveState = {isSaved, setIsSaved};
  
  useEffectOnce(()=>{
    if(props.mode == 'clone' || props.mode == 'edit'){
      try{
      const cloneCookie = new Cookies();
      const receivedPayload = cloneCookie.get('encryptScript');

      const privateKey = 
      `-----BEGIN PRIVATE KEY-----
      ${import.meta.env.VITE_AES_CLONE_PRIVATE_KEY}
      -----END PRIVATE KEY-----`;
      const decryptor = new JSEncrypt();
      decryptor.setPrivateKey(privateKey);

      const newTitle = receivedPayload.title;
      const newCode = decryptor.decrypt(receivedPayload.code);

      if(props.mode=='clone'){
        setUserTitle(newTitle+' - '+props.user.name+'\'s copycat');
      }else{
        setUserTitle(newTitle);
      }
      setUserCode(newCode);

      cloneCookie.remove('encryptScript');
    }catch(e){
      console.log(e);
      window.location.href= '/404/script';
    }
  }},[]);
  
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
      <input className='script-title-input-box' type='text' value={userTitle}onChange={updateUserTitle}/>
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