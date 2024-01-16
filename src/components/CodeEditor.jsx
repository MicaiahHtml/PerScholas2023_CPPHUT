import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeEditor(props){
    //console.log(props.codeState);
    const innerText = 
        (props.codeState.userCode === 'default') ?
        `#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}`
        :
        props.codeState.userCode
        ;

    return(
        <AceEditor
        placeholder="Placeholder Text"
        mode="c_cpp"
        theme="terminal"
        name="blah2"
        // onLoad={this.onLoad}
        onChange={(e)=>props.codeState.setUserCode(e)}//
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={innerText}
        setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }}
    />
    )
}