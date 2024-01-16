import {saveScript} from "../utilities/hut-services";
//props.code
//props.currentUser
export default function SaveButton(props){
    const handleSave = async () => {
        console.log(props.title);
        await saveScript(props.code, props.currentUser, props.title);
    }
    return(
        <button onClick={handleSave}>Save();</button>
    );
};