const { ObjectId } = require('mongodb');

const userControllerRef = require('./users.cjs');
const User = require('../../models/users.cjs');
const Script = require('../../models/script.cjs'); //maybe: script return cur logged in user

module.exports = {
    saveScript,
    checkIfScriptExists,
    checkIfUserScriptExists,
    getScriptListFromUserHut
}
async function checkIfScriptExists(req, res){
    try{
        //console.log(JSON.stringify(req.body));
        const data = req.body[0];    //data.code, data.userID, data.title
        const comparedID = new ObjectId(data.userID);
        const isScriptFound = await Script.findOne(
            {user: comparedID,
            title: data.title}
        );
        if (isScriptFound){
            res.status(200).json(isScriptFound);
        }else{
            res.status(200).json(null);
        }
    }catch(e){
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
}

async function checkIfUserScriptExists(req, res){
    try{
        let requestedScript;
        const data = req.body[0];    //data.userName, data.scriptName
        //console.log("HUTSCTRL DATA: ", data);

        const requestedUser = await User.findOne({name: data.userName});
        if(!requestedUser) throw new Error('Validating script address failed: User Doesn\'t Exist!');
        
        const comparedID = new ObjectId(requestedUser.userID);

        for await(const ele of requestedUser.scriptHut){
            requestedScript = await Script.findOne({title: data.scriptName, _id: ele});
            if(requestedScript) break;
        }
        console.log("requestedScript: ", requestedScript)
        if(!requestedScript) throw new Error('Validating script address failed: Requested User Doesn\'t Have Requested Script');
        res.status(200).json(requestedScript);
    }catch(e){
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
}
async function saveScript(req, res){
    /*
    data{
        code: String, 
        userID: String, 
        title: String,
        force: bool
    }
    */
    try{
        const data = req.body[0];    //data.code, data.userID, data.title, data.force
        const comparedID = new ObjectId(data.userID);
        //console.log(data);
        if(data.force){
            
            const updatedScript = await Script.findOneAndUpdate(
                {title: data.title},
                {code: data.code}
            );
            return updatedScript;
        }else{
            const newScript = await Script.create(
                {
                user: data.userID,
                title: data.title, //change this
                code: data.code
                }
            );
        
        const finalChange = await User.findOneAndUpdate(
            {_id: comparedID},
            {$push: {scriptHut: newScript._id}},
            {upsert: true, new: true}
        )

        return finalChange;
        }
    } catch(e){
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
}
async function getScriptListFromUserHut(req, res){ //req is just userID
    try{
        let userScripts;
        const comparedID = req.params.userID;
        const user = await User.findById(comparedID);
        //console.log(user.scriptHut);
        userScripts = await Script.find({user: comparedID});
        //console.log(userScripts);
        res.status(200).json(userScripts);
    }catch(e){
        console.log(e);
        res.status(400).json({msg: e.message});
    }
}