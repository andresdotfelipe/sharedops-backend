const Comment = require('../models/Comment');
const Opinion = require('../models/Opinion');

const commentsController = {};

commentsController.createComment = async (req, res) => {
    const { body, opinionId } = req.body;
    const newComment = new Comment({ author: req.userId, body });
    try {        
        const comment = await newComment.save();
        const updatedOpinion = await Opinion.findByIdAndUpdate(opinionId, 
        { $push: { 'comments': { $each: [comment], $position: 0 } } }, { upsert: true, new: true })
        .populate([
            'author', 
            { 
                path: 'comments', 
                populate: { 
                    path: 'author', 
                    select: 'name profilePicUrl', 
                    model: 'User' 
                } 
            }
        ])
        .exec();                
        res.status(200).send({
            message: 'Comment created',
            comment,            
            updatedOpinion
        });        
    } catch (error) {
        res.status(500).send({
            message: 'Error while creating comment'            
        });
    }
};

module.exports = commentsController;