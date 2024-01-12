const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const scriptSchema = require('./scriptSchema.cjs');

const SALT_ROUNDS = 6;

//While the email has to be unique, many things in the app depend on a unique username. 
//Searching only by the email causes a security risk in which users are suceptible to 
//email phishing, scams, or data vulnerability.

const userSchema = new Schema({
    name: {type: String, unique: true, required: true},
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    },
    scriptHut: [scriptSchema]
},{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function (next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

module.exports = mongoose.model('User', userSchema);