require('dotenv').config();
require('./database.cjs');

const User = require('../models/users.cjs');
const Script = require('../models/script.cjs');

(async function(){
    await User.deleteMany({name: {$not: "sad debugger"}});
    // const users = await User.create([
    //     {name: "bobbyHack", email: "bobbyHack@b.c", password: "bobby", scriptHut}
    // ])

    await Script.deleteMany({title: {$not: "a"}});
    /*
    data{
        code: String, 
        userID: String, 
        title: String,
        force: bool
    }
    */
    process.exit();
})();