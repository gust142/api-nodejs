const express  = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const JWT = require('jsonwebtoken');
const authConfig = require('../config/auth')
const router = express.Router();

function generateToken(params={}){
    return JWT.sign(params, authConfig.secret,{
        expiresIn:86400
    });
}

router.post('/register', async (req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email})
    if(user){
        return res.status(400).send({error:'Este email já está cadastrado'})
    }
    try{
        const userr = await User.create(req.body);
        userr.password = undefined;
        return res.send({userr})
    }catch(err){
        return res.status(400).send({error:'Ocorreu um erro no cadastro, tente novamente mais tarde.'})
    }

})

router.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(400).send({error:'Usuário não encontrado!'})
    }
    if(!await bcrypt.compare(password,user.password)){
        return res.status(401).send({error:'Senha invalida!'})
    }
    user.password = undefined;

    
    res.send({user,token:generateToken({id:user.id})});
})

module.exports = app => app.use('/auth',router);