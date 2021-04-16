const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    author: {
        name: { type: String, required: true },
        profilePicUrl: { type: String, required: true }
    },    
    body: { type: String, required: true },    
},
{
    timestamps: true,            
});

module.exports = model('Comment', CommentSchema);