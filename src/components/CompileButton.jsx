//import handleCompile from '../compiler/functions/compiler-services.js';
import * as compilerServices from '../compiler/functions/compiler-services.js';

//props.codeState = {code, setCode}
//codeState.code codeState.setCode
export default function CompileButton(props){
    const onCompile = (outputDetails) => {alert(atob(outputDetails.stdout))};
    const clickHandler = () => {
        compilerServices.handleCompile(props.codeState.userCode, '', onCompile);//Change second parameter to take in user input.
    }
    return(
        <button type="button" onClick={clickHandler}>Run Script</button>
    )
}