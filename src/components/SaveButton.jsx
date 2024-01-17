import { useState, useEffect } from "react";
import {saveScript} from "../utilities/hut-services";
//props.code
//props.currentUser
export default function SaveButton(props){
    
    const handleSave = async () => {
        saveScript(props.code, props.currentUser, props.title);
        //console.log(shouldSave);
        props.saveState.setIsSaved(true);
        console.log("SaveButton: ", props.saveState);
    }
    return(
        <button onClick={handleSave}>Save();</button>
    );
};