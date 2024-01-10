import React from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";


function NewScriptPage() {
  return (
    <div className='new-script-page-container'>
      <h1>NewScriptPage</h1>
      <AceEditor
        placeholder="Placeholder Text"
        mode="c_cpp"
        theme="terminal"
        name="blah2"
        // onLoad={this.onLoad}
        // onChange={this.onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={
`#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}`}
        setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }}
    />
            
    </div>
  )
}

export default NewScriptPage