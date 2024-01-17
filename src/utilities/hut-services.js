import * as hutsAPI from './huts-api';

export async function checkIfUserScriptExists(userName, scriptName){
    const cPayload = {
        userName: userName,
        scriptName: scriptName
    }
    const res = await hutsAPI.checkIfUserScriptExists(cPayload);
    return res;
}

export async function getScriptListFromUserHut(user){
    //console.log(user._id)
    //console.log(hutsAPI.getScriptListFromUserHut(user._id));
    //console.log(user);
    const scriptArr = await hutsAPI.getScriptListFromUserHut(user._id);
    //console.log(scriptArr);
    return scriptArr;
}

export async function saveScript(code, currentUser, title){
    //const cPayload = JSON.parse({code: JSON.stringify(code)});
    const cPayload = {
        user: currentUser,
        code: code,
        title: title
    };
    if(title == ''){alert("Please name your script so it can be saved in your hut.")}
    else{
        //console.log(`huts-services code: ${JSON.stringify(cPayload)}`);
        const doesScriptAlreadyExist = await hutsAPI.checkIfScriptExists(cPayload);
        //console.log(doesScriptAlreadyExist);
        if(doesScriptAlreadyExist){
            if(confirm("You already have a script with that title! Are you sure you want to save over it? This action cannot be undone." )){
                await hutsAPI.saveScript(cPayload, true).then(()=>{return true}) //overwrite/force = true;
                //return true;
            }else{
                console.log("Save aborted.");
                //return false;
            }
        }else{
            //saveState.setIsSaved(true);
            await hutsAPI.saveScript(cPayload).then(()=>{return true});
            //return true;
        }
    
    }
    //We don't need a local storage token for this stuff
}