const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    password: { type: String, select: false, required: true },
    profilePicUrl: { type: String, default: 'https://res.cloudinary.com/dxjc7e5te/image/upload/v1595711364/sharedops/profile-pics/default-user-pic_grjmh5.png' },
    favoriteOpinions: [{}]
},    
{
    timestamps: true
});

module.exports = model('User', UserSchema);