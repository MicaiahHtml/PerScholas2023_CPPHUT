//props.problem: string:
    //a) "hut"
    //b) "user"
import { useEffect, useState } from "react";

export default function NotFoundComponent(props){
    const [problemStatement, setProblemStatement] = useState('');
    useEffect(()=>{
        if(props.problem == 'hut'){
            setProblemStatement('With this URL, no huts could be found in the 404 desert...')
        }else if(props.problem == 'user'){
            setProblemStatement('We knocked at every hut, but this user couldn\'t be found...');
        }else if(props.problem =='script'){
            setProblemStatement('We think you\'re trying to edit a script without actually having a script to edit. \n Try finding some huts or making a new script.');
        }else{
            setProblemStatement('There\'s nothing officially at this URL except for this error message.');
        }
    },[])
   
    return(
        (props.problem!=='loading') ?
        <div className="not-found-component-container">
            <h1>Nothing Here?</h1>
            <h2>{problemStatement}</h2>
        </div>
        :
        <>loading...</>  
    );
}