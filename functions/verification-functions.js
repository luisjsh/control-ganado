const jwt = require('jsonwebtoken')
const config = require('../config')

const user = require('../models/usuario')

function tokenVerification (req, res, next){
    const token = req.headers['x-access-token'];
    if(token === 'null' || token === ''){
        return res.status(200).json({
            status: 401,
            detail: 'token invalid'
        })
    }
    
    let decodedToken
    try {
    decodedToken = jwt.verify(token, config.secret);
    }catch(err){
        return res.status(200).json({
            detail: "token invalid"
        })
    }
    req.userId = decodedToken.id;
    next()
}


async function adminVerification ( req, res, next ){
    req.user = await user.findOne({
        where: {id:req.userId}
    }).then( async response => {
        if ( response.admin === true ){
            next()
        } else {
             res.status(200).json({ status: 401, detail: 'not allowed'}) 
            }
    }).catch(e =>{
        res.status(200).json({ detail: "user not registered"})
    })
}

module.exports = {
    tokenVerification , adminVerification
};