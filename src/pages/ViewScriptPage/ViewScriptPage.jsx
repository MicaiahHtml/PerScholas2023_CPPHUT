
import { useEffect, useState } from "react";
import { useParams, redirect } from "react-router-dom"
import { checkIfUserScriptExists, destroyScript, renameScript } from '../../utilities/hut-services';
import { getUser } from '../../utilities/users-services';
import { createNewScriptFromExisting } from "../../utilities/script-client-services";
import NotFoundComponent from "../../components/NotFoundComponent";

import ReadOnlyCodeEditor from "../../components/ReadOnlyCodeEditor";

export default function ViewScriptPage(props){
    const routeParams = useParams(); 
    const curUser = getUser();

    const userName = (props.userName) ? props.userName: routeParams.userName; 
    const scriptName = (props.scriptName) ? props.scriptName: routeParams.scriptName;
    const isParamUserCurUser = (props.userName === curUser.name);
    const userPath = (isParamUserCurUser) ? 'my' : props.userName;

    const [isValidRequest, setIsValidRequest] = useState(); //holds the scriptSchema :)
    const [viewCode, setViewCode] = useState(null);
    const [renameVal, setRenameVal] = useState(null);
    const [isRenaming, setIsRenaming] = useState(false);
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
    const handleClone = () =>{
        try{
            createNewScriptFromExisting(viewCode, 'clone');
        }catch(e){
            console.log(e);
            window.location.href= '/404/script';
        }
    }
    const handleEdit = () => {
        try{
        createNewScriptFromExisting(viewCode, 'edit');
        }catch(e){
            console.log(e);
            window.location.href= '/404/script';
        }
    }
    const handleDelete = async () => {
        if(confirm("Are you ABSOLUTELY SURE you want to destroy this script? Nobody can undo that.")){
            //console.log("destroy here");
            try{
                await destroyScript(isValidRequest, curUser);
                window.location.href= `/huts/my`;
            }catch(e){
                console.log("ViewScriptPage Error: During Delete, ", e);
            }
        }else{
            console.log("Destroy Aborted.");
        }
    }
    const handleRename = async () => {
        console.log("implement rename :)");
        console.log(renameVal);
        try{
            await renameScript(isValidRequest, curUser, renameVal);
            setIsRenaming(false);
            window.location.replace(`/huts/${userPath}/${renameVal}`);
        }catch(e){
            console.log("ViewScript Page Error: During rename, ", e);
        }
    }
    //useEffect(()=>{console.log(problem)},[problem]);
    // useEffect(()=>{
    //     console.log(isValidRequest)
    // },[isValidRequest]);

    useEffect(()=>{validateRequest(userName, scriptName)}, []);
    const yourList = (
        <div className="view-script-page-script-options">
            <a href='#' onClick={handleClone}>Clone</a>
            <a href="#" onClick={handleEdit}>Edit</a>
            <a href='#' onClick={handleDelete}>Destroy</a>
            <a href='#' onClick={()=>{setIsRenaming(true)}}>Rename</a>
        </div>
    );

    const theirList = (
        <div className="view-script-page-script-options">
            <a href='#' onClick={handleClone}>Clone</a>
        </div>
    );

    const renamingTools = (
        <div className="renaming-tools-container">
            <input type='text' onChange={(evt)=>setRenameVal(evt.target.value)}/>
            <button onClick={handleRename}>OK!</button>
        </div>
    );

    return(
        
            (isValidRequest) ?
        <div className="view-script-page-container">
            <h2>{scriptName}</h2>
            <p>Crafted By <em>{userName}</em> {(isParamUserCurUser)?"(That's You!)":""}</p>
            {(isParamUserCurUser) ? yourList: theirList}
            {(isRenaming) ? renamingTools : <></>}
            <ReadOnlyCodeEditor code={viewCode.code}/>
        </div>
        :
        <div className="view-script-page-container">
            <NotFoundComponent problem = {problem}/>
        </div>
        
    )
}