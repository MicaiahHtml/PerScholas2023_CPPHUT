// routes/api/users.cjs

const express = require('express');
const router = express.Router();
const hutsCtrl = require('../../controllers/api/huts.cjs');

//The user needs to save their script to the hut
router.post('/saveScript', hutsCtrl.saveScript);
//The developer needs to check if a script exists
router.post('/checkScriptExistence', hutsCtrl.checkIfScriptExists);
//The developer needs to check if a requested script 
//AND its requested supposed owner exists, by name
router.post('/checkScriptUserPairExistence', hutsCtrl.checkIfUserScriptExists);
//The user needs to see their own hut

//The user needs to search for huts; where
router.get('/:userID', hutsCtrl.getScriptListFromUserHut);

//The user needs to see other huts


module.exports = router;