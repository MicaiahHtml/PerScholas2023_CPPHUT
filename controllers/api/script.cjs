const Script = require('../../models/script.cjs');

module.exports = {
    hut,
    addSelfToHut
}


async function hut(req, res){
    try{
        const hut = await Script.getHut(req.user._id);
        res.status(200).json(hut);
    }catch(e){
        res.status(400).json({ msg: e.message });
    }
}

async function addSelfToHut(req, res){
    try{
        const hut = await Script.getHut(req.user._id);
        await hut.addScriptToHut(req.params.id, req.user._id);
        res.status(200).json(hut);
    }catch(e){
        res.status(400).json({msg: e.message});
    }
}