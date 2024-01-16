const { ObjectId } = require('mongodb');

const userControllerRef = require('./users.cjs');
const User = require('../../models/users.cjs');
const Script = require('../../models/script.cjs'); //maybe: script return cur logged in user

module.exports = {
    saveScript,
    checkIfScriptExists
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
async function saveScript(req, res){
    try{
        const data = req.body[0];    //data.code, data.userID, data.title
        const comparedID = new ObjectId(data.userID);
        console.log(data);
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
