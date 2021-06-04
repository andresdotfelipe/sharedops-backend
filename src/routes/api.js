const { Router } = require('express');
const api = Router();

//  Middlewares
const auth = require('../middlewares/auth');

//  Controllers
const { signIn, signUp, getUser, getUserProfile, updateUser, updateUserFavoriteOpinions } = require('../controllers/users.controller');
const { getAllOpinions, getMyOpinions, getFavoriteOpinions, getUserOpinions, getOpinion, createOpinion } = require('../controllers/opinions.controller');
const { createComment } = require('../controllers/comments.controller');

//  Users routes
api.post('/signin', signIn);
api.post('/signup', signUp);
api.get('/user', auth.checkToken, getUser);
api.get('/user-profile/:id', getUserProfile);
api.put('/user', auth.checkToken, updateUser);
api.put('/user/favorite-opinions', auth.checkToken, updateUserFavoriteOpinions);

//  Opinions routes
api.get('/opinions/all', getAllOpinions);
api.get('/opinions/my-opinions', auth.checkToken, getMyOpinions);
api.get('/opinions/favorites', auth.checkToken, getFavoriteOpinions);
api.get('/opinions/user-opinions', getUserOpinions);
api.get('/opinions/:id', getOpinion);
api.post('/opinions', auth.checkToken, createOpinion);

//  Comments routes
api.post('/comments', auth.checkToken, createComment);

module.exports = api;