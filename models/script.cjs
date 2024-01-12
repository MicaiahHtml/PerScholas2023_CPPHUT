const mongoose = require('mongoose');
//const Schema = mongoose.Schema;


const scriptSchema = require('./scriptSchema.cjs');

// const scriptSchema = new Schema({
//     user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//     title: {type: String, required: true},
//     code: {type: String, required: true}
// },{
//     timestamps: true
// });

scriptSchema.virtual('scriptId').get(function() {
    return this.id.slice(-6).toUpperCase();
});

// scriptSchema.statics.getHut = function(userId){
//     //To get the hut, access the user and access the list, then add self to list
//     // return this.updateMany(
//     //     // query
//     //     { user: userId},
//     //     // update
//     //     { user: userId },
//     //     // upsert option will create the doc if
//     //     // it doesn't exist
//     //     { upsert: true, new: true }
//     // );
// }



// scriptSchema.methods.addScriptToHut = async function(scriptId, userId){
//     const hut = getHut(userId);
//     hut.push(scriptId);
// }

module.exports = mongoose.model('Script', scriptSchema);
