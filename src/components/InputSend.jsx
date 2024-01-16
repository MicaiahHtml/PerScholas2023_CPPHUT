//useful for search bar and input bar, where a function is ran from the input box
//props.name
//props.submitFunction
export default function InputSend(props){
    return(
        <input type = "text" name = {props.name} onChange = {props.submitFunction} required/>
    );
};