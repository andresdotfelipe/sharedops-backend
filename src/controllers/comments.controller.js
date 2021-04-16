const Comment = require('../models/Comment');
const User = require('../models/User');
const Opinion = require('../models/Opinion');

const commentsController = {};

commentsController.createComment = async (req, res) => {
    const { body, opinionId } = req.body;
    const author = await User.findById(req.userId).select(['+password', '+favoriteOpinions', '+createdAt', '+updatedAt']);
    const newComment = new Comment({ author, body });
    try {        
        const comment = await newComment.save();
        const opinion = await Opinion.findById(opinionId).populate(['author', 'comments']);
        opinion.comments.unshift(comment);
        await opinion.save();
        res.status(200).send({
            message: 'Comment created',
            commentId: comment._id,
            updatedOpinion: opinion
        });        
    } catch (error) {
        res.status(500).send({
            message: 'Error while creating comment'            
        });
    }
};

module.exports = commentsController;