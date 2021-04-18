const Opinion = require('../models/Opinion');
const User = require('../models/User');

const opinionsController = {};

opinionsController.getAllOpinions = async (req, res) => {
    let { page, title } = req.query;
    let query = {};    
    const limit = 10;        
    if (title) query.title = { '$regex': title, '$options': 'i' };
    try {
        let opinions = await Opinion.find(query)
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)
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
        const opinionsCount = await Opinion.countDocuments(query);        
        res.status(200).send({
            opinions,
            opinionsCount
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while retrieving opinions'            
        });
    }    
};

opinionsController.getMyOpinions = async (req, res) => {
    let { page, title } = req.query;
    let query = {};    
    const limit = 10;
    query.author = req.userId;
    if (title) query.title = { '$regex': title, '$options': 'i' };
    try {
        let opinions = await Opinion.find(query)
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)
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
        const opinionsCount = await Opinion.countDocuments(query);
        res.status(200).send({
            opinions,
            opinionsCount
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while retrieving opinions'            
        });
    }    
};

opinionsController.getFavoriteOpinions = async (req, res) => {
    let { page, title } = req.query;      
    let query = {}, opinions = [], opinion = null, i=0;
    const limit = 10;
    const user = await User.findById(req.userId);     
    if (title) query.title = { '$regex': title, '$options': 'i' };    
    try {                               
        do {
            query._id = user.favoriteOpinions[i+(page*limit)];
            opinion = await Opinion.findOne(query).populate([
                'author', 
                { 
                    path: 'comments', 
                    populate: { 
                        path: 'author', 
                        select: 'name profilePicUrl', 
                        model: 'User' 
                    } 
                }
            ]).exec();            
            if (opinion) opinions.push(opinion);
            i++;
        } while (opinion | i !== limit);
        let opinionsCount;
        if (title) {
            query._id = user.favoriteOpinions;
            opinionsCount = await Opinion.countDocuments(query);
        } else {
            opinionsCount = user.favoriteOpinions.length;
        }
        res.status(200).send({
            opinions,
            opinionsCount
        });    
    } catch (error) {
        res.status(500).send({
            message: 'Error while retrieving opinions'            
        });
    }    
};

opinionsController.getOpinion = async (req, res) => {
    const { id } = req.params;    
    let opinion = null;
    try {
        if (id === 'random') {
            const opinionsCount = await Opinion.countDocuments();                        
            const randomNumber = Math.floor(Math.random() * (opinionsCount - 0)) + 0;
            opinion = await Opinion.findOne().skip(randomNumber).populate([
                'author', 
                { 
                    path: 'comments', 
                    populate: { 
                        path: 'author', 
                        select: 'name profilePicUrl', 
                        model: 'User' 
                    } 
                }
            ]).exec();                        
        } else {
            opinion = await Opinion.findById(id).populate([
                'author', 
                { 
                    path: 'comments', 
                    populate: { 
                        path: 'author', 
                        select: 'name profilePicUrl', 
                        model: 'User' 
                    } 
                }
            ]).exec();
        } 
        res.status(200).send(opinion);
    } catch (error) {                
        res.status(500).send({
            message: 'Error while retrieving opinion'      
        });        
    }
};

opinionsController.createOpinion = async (req, res) => {
    let { title, body, opinionImageUrl } = req.body;    
    title = title.trim();    
    const newOpinion = new Opinion({ title, body, opinionImageUrl });
    newOpinion.author =  req.userId;
    try {
        const opinion = await newOpinion.save();
        res.status(200).send({            
            message: 'Opinion created',
            opinion
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while creating opinion'            
        });
    }
};

module.exports = opinionsController;