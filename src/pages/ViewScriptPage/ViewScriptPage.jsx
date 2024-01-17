//props.user: object

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { checkIfUserScriptExists } from '../../utilities/hut-services';
import NotFoundComponent from "../../components/NotFoundComponent";
import { getUser } from '../../utilities/users-services';
import ReadOnlyCodeEditor from "../../components/ReadOnlyCodeEditor";

export default function ViewScriptPage(props){
    const routeParams = useParams(); 
    const curUser = getUser();

    const userName = (props.userName) ? props.userName: routeParams.userName; 
    const scriptName = (props.scriptName) ? props.scriptName: routeParams.scriptName;
    const isParamUserCurUser = (props.userName === curUser.name);

    const [isValidRequest, setIsValidRequest] = useState();
    const [viewCode, setViewCode] = useState(null);
    const [problem, setProblem] = useState('loading');
    
    const validateRequest = async(userName, scriptName)=>{
        try{
            const response = await checkIfUserScriptExists(userName, scriptName);
            setIsValidRequest(response);
            if(!response){ 
                setProblem('hut');
            }else{
                setViewCode(response);
            }
        }catch(e){
            console.log("ViewScriptPage Error: ", e);
            setProblem('hut');
        }
    };
    //useEffect(()=>{console.log(problem)},[problem]);
    // useEffect(()=>{
    //     console.log(isValidRequest)
    // },[isValidRequest]);

    useEffect(()=>{validateRequest(userName, scriptName)}, []);
    
    return(
        
            (isValidRequest) ?
        <div className="view-script-page-container">
            <h2>{scriptName}</h2>
            <p>Crafted By <em>{userName}</em> {(isParamUserCurUser)?"(That's You!)":""}</p>
            <div className="view-script-page-script-options">
                <a>Fork</a>
                <a>Edit</a>
                <a>Delete</a>
                <a>Rename</a>
            </div>
            <ReadOnlyCodeEditor code={viewCode.code}/>
        </div>
        :
        <div className="view-script-page-container">
            <NotFoundComponent problem = {problem}/>
        </div>
        
    )
}