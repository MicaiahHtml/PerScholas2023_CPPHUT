import React from 'react'
import CodeEditor from '../../components/CodeEditor';
import CompileButton from '../../components/CompileButton';
import { useState, useEffect } from 'react';

//props.code
function ScriptPage(props) {
  const [userCode, setUserCode] = useState(props.code);
  const codeState = {userCode, setUserCode};
  return (
    <div className='new-script-page-container'>
      <h1>ScriptPage</h1>
      <CodeEditor codeState = {codeState}/>
      <CompileButton codeState = {codeState}/>
    </div>
  )
}

export default ScriptPage