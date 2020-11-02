const express = require('express')
const router  = express.Router()
const sequelize = require('sequelize')
const Op = sequelize.Op

const torosModel = require('../models/toros.model')
const torosImage = require('../models/torosimagenes.model') 


router.get('/:name', async (req, res)=>{
    let { name } = req.params
    try{
        await torosModel.findAll({
            where: {
                nombre:{ 
                    [Op.like]: '%'+name+'%'
                }
            },
            limit: 5
        }).then( response =>{
            res.status(200).json({response: response})
        }).catch( () => {
            res.status(200).json({response: []})
        })
    }catch(e){
        res.status(200).json({detail: 'problem db'})
    }
})

router.get('/page/:name', async (req, res)=>{
    let { name } = req.params
    
    let Item = await torosModel.findAll({
        where: {
            nombre:{ 
                [Op.like]: '%'+name+'%'
            }
        },
        include: [{model: torosImage}]
    })

    res.status(200).json({response: Item})
})

module.exports = router;