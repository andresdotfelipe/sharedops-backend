const Comment = require('../models/Comment');

const commentsController = {};

commentsController.getComments = async (req, res) => {    
    const { opinionId } = req.query;
    try {
        const comments = await Comment.find({ author: req.userId, opinion: opinionId })
        .sort({ createdAt: -1 })
        .populate('author');
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send({
            message: 'Error while retrieving comments'            
        });
    }
};

commentsController.createComment = async (req, res) => {
    const { body, opinionId } = req.body;
    const newComment = new Comment({ author: req.userId, opinion: opinionId, body });
    try {        
        const comment = await newComment.save();
        res.status(200).send({
            message: 'Comment created',
            commentId: comment._id
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while creating comment'            
        });
    }
};

module.exports = commentsController;