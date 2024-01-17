import { useParams } from "react-router-dom";
import NotFoundComponent from "../../components/NotFoundComponent";

//props.problem
export default function Generic404(props){
    const problem = (!props.problem) ? useParams().problem : props.problem;
    return(
        <NotFoundComponent problem={problem}/>
    )
}