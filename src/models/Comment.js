const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    opinion: {
        type: Schema.Types.ObjectId,
        ref: 'Opinion'
    },
    body: { type: String, required: true },    
},
{
    timestamps: true
});

module.exports = model('Comment', CommentSchema);