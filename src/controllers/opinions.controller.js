const Opinion = require('../models/Opinion');

const opinionsController = {};

opinionsController.getOpinions = async (req, res) => {
    let { page, own, title } = req.query;
    let query = {};    
    const limit = 10;
    if (own) query.author = req.userId;    
    if (title) query.title = { '$regex': title, '$options': 'i' };
    try {
        let opinions = await Opinion.find(query)
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)
        .populate('author')
        .exec();
        const opinionsCount = await Opinion.countDocuments();
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
            opinion = await Opinion.findOne().skip(randomNumber).populate('author').exec();
            // opinion = await Opinion.aggregate([{ $sample: { size: 1 } }]);            
        } else {
            opinion = await Opinion.findById(id).populate('author').exec();
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
    console.log(req.body);
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