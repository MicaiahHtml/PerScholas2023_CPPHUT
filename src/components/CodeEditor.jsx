import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeEditor(props){
    //console.log(props.codeState);
    const innerText = props.codeState.userCode;

    return(
        <AceEditor
        placeholder="there's code to be written!"
        mode="c_cpp"
        theme="terminal"
        name="editCode"
        // onLoad={this.onLoad}
        onChange={(e)=>{
            props.codeState.setUserCode(e);
            props.saveState.setIsSaved(false);
        }}//
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={innerText}
        setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }}
    />
    )
}