import * as hutsAPI from './huts-api';

export async function saveScript(code, currentUser, title){
    //const cPayload = JSON.parse({code: JSON.stringify(code)});
    const cPayload = {
        user: currentUser,
        code: code,
        title: title
    };
    //console.log(`huts-services code: ${JSON.stringify(cPayload)}`);
    const doesScriptAlreadyExist = await hutsAPI.checkIfScriptExists(cPayload);
    //console.log(doesScriptAlreadyExist);
    if(doesScriptAlreadyExist){
        if(confirm("You already have a script with that title! Are you sure you want to save over it? This action cannot be undone." )){
            await hutsAPI.saveScript(cPayload, true);
        }else{
            console.log("Save aborted.");
        }
    }else{
        await hutsAPI.saveScript(cPayload);
    }
    
    
    //We don't need a local storage token for this stuff
}