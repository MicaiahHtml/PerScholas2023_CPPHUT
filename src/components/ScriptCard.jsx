/*
props.user: object
props.script: object
props.key (index): int
props.isParamUserCurUser: bool
*/
//title={ele.title} code={ele.code} lastUpdated={ele.updatedAt}
export default function ScriptCard(props){
    const hutUserUrlParam = (props.isParamUserCurUser) ? 'my' : props.user.name;
    return(
        <div className="script-card-container">
            <a href={`/huts/${hutUserUrlParam}/${props.script.title}`}>Title: {props.script.title}</a>
            <p>Username: {props.user.name}</p>
            <p>Last Updated: {props.script.updatedAt}</p>
        </div>
    );
};