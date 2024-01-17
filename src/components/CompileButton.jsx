//import handleCompile from '../compiler/functions/compiler-services.js';
import * as compilerServices from '../compiler/functions/compiler-services.js';

//ON COMPILE DOES RECIEVE *ALL* OUTPUT DETAILS :D :D

//props.codeState = {code, setCode}
//props.userInput = string
//codeState.code codeState.setCode
export default function CompileButton(props){
    
    const clickHandler = () => {
        compilerServices.handleCompile(
            props.codeState.userCode, 
            props.userInput, 
            props.functions);
    }
    return(
        <button type="button" onClick={clickHandler}>Run Script</button>
    );
};