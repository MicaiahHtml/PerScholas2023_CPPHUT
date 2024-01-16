// routes/api/users.cjs

const express = require('express');
const router = express.Router();
const hutsCtrl = require('../../controllers/api/huts.cjs');

//The user needs to save their script to the hut
router.post('/saveScript', hutsCtrl.saveScript);
//The developer needs to check if a script exists
router.post('/checkScriptExistence', hutsCtrl.checkIfScriptExists);
//The user needs to see their own hut

//The user needs to search for huts; where
//router.get('/huts/:q', )

//The user needs to see other huts


module.exports = router;