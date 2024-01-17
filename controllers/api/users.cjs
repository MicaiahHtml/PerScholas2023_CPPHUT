const User = require('../../models/users.cjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken,
    searchForHuts,
    findUserByName
}

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }

async function create(req, res) {


    try {
        // Add the User to the database
        const user = await User.create(req.body);
        // token will be a string
        const token = createJWT(user);
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token);
    } catch (err) {
        // Client will check for non-2xx status code
        // 400 - bad request
        res.status(400).json(err);
    }
}

async function login(req, res) {
    console.log(req.body)
    try {
        // Query the database to find a user with the email provided
        // Using filer object to find User with the given email
        const user = await User.findOne({email: req.body.email});
        if (!user) throw new Error ('User Not Found');
        // if we found the email, compare the password
        // 1st argument is from the credentials that the user typed in
        // 2nd argument is what is stored in the database 
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        console.log(err);
        res.status(400).json('Bad Credentials');
    }
}

async function searchForHuts(req, res){
    try{
        const query = req.params.q;
        const results = await User.find({name: {$regex : query}});
        res.status(200).json(results);
        return results;
    }catch(e){
        console.log(e);
        res.status(400).json({msg: e.message})
    }
}

async function findUserByName(req, res){
    try{
        const query = req.params.q;
        const results = await User.findOne({name: query});
        //console.log(results.json());
        res.status(200).json(results);
        return results;
    }catch(e){
        console.log(e);
        res.status(400).json({msg: e.message});
    }
}

/* ======= Helper Function ======== */
function createJWT(user) {
    return jwt.sign(
        //data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}