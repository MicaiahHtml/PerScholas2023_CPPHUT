import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

export default function ReadOnlyCodeEditor(props){
    //console.log(props.codeState);
    const innerText = props.code;

    return(
        <AceEditor
        placeholder="Placeholder Text"
        mode="c_cpp"
        theme="solarized_light"
        name="readCode"
        // onLoad={this.onLoad}
        // onChange={(e)=>{
        //     props.codeState.setUserCode(e);
        //     props.saveState.setIsSaved(false);
        // }}
        fontSize={14}
        showPrintMargin={true}
        readOnly={true}
        showGutter={true}
        highlightActiveLine={false}
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