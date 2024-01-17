import * as hutsAPI from './huts-api';

export async function destroyScript(script, user){
    const cPayload = {
        user: user,
        code: script.code,
        title: script.title
    };
    //console.log("this script is set to be destroyed: ", script );
    
    const res = await hutsAPI.destroyScript(cPayload);
    return res;
    
}

export async function renameScript(script, user, newTitle){
    const cPayload = {
        userID: user._id,
        code: script.code,
        title: script.title,
        newTitle: newTitle
    };
    //console.log("this script is set to be renamed: ", script, " to ", newTitle );
    
    const res = await hutsAPI.renameScript(cPayload);
    return res;
    
}

export async function checkIfUserScriptExists(userName, scriptName){
    const cPayload = {
        userName: userName,
        scriptName: scriptName
    }
    const res = await hutsAPI.checkIfUserScriptExists(cPayload);
    return res;
}

export async function getScriptListFromUserHut(user){
    const scriptArr = await hutsAPI.getScriptListFromUserHut(user._id);
    return scriptArr;
}

export async function saveScript(code, currentUser, title){
    const cPayload = {
        user: currentUser,
        code: code,
        title: title
    };
    if(title == ''){alert("Please name your script so it can be saved in your hut.")}
    else{
        const doesScriptAlreadyExist = await hutsAPI.checkIfScriptExists(cPayload);
        if(doesScriptAlreadyExist){
            if(confirm("You already have a script with that title! Are you sure you want to save over it? This action cannot be undone." )){
                await hutsAPI.saveScript(cPayload, true).then(()=>{return true}) //overwrite/force = true;
            }else{
                console.log("Save aborted.");
            }
        }else{
            await hutsAPI.saveScript(cPayload).then(()=>{return true});
        }
    
    }
    //We don't need a local storage token for this stuff
}