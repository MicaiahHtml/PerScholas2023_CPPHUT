//const script = require('./script.cjs');
const Schema = require('mongoose').Schema;


const scriptSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    code: {type: String, required: true}
},{
    timestamps: true
});

module.exports = scriptSchema;