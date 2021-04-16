const { Schema, model } = require('mongoose');

const OpinionSchema = new Schema({
    title: { type: String, trim: true, required: true },
    body: { type: String, required: true },
    opinionImageUrl: { type: String },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
{
    timestamps: true
});

module.exports = model('Opinion', OpinionSchema);