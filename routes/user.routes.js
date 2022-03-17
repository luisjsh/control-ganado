const express = require('express')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const imageMin = require('imagemin')
const imageMin_jpeg = require('imagemin-jpegtran')
const router = express.Router()


const passwordFunctions = require('../functions/password-functions');
const { tokenVerification , tokenVerificationNotLoged, adminVerification }= require('../functions/verification-functions');
const config = require('../config');


//models 
const user = require('../models/usuario')
const userimagens = require('../models/usuarioImagenes')

router.get('/find/:email', async (req,res)=>{
    let {email} = req.params
    try{
        await user.findOne({
            where: {email}
        }).then( response => {
            if(!response)res.status(200).json({message: 'user not db'})
            if(response)res.status(200).json({response})
        })
    }catch(e){
        console.log(e)
        res.status(200).json({message: 'something went wrong'})
    }
})


router.get('/profile/', tokenVerification, async (req,res)=>{
    let { userId } = req;
    let { status, message, userInformation } = '';
    await user.findOne({
        where: {id: userId},
        include: [{
            model: userimagens
        }]
    }).then( response => {
        status = 200;
        message = 'success';
        userInformation = response
    }).catch( e => {
        status = 401;
        message = 'The user isnt in the database'
    })

    res.json({ status , message , userInformation })
})


router.get('/admin/', tokenVerification, adminVerification, (req, res)=>{
    res.json({status: 200, detail: 'admin granted'})
})



//-------------------  Adding ----------------------

router.post('/add', tokenVerificationNotLoged, async (req, res)=>{
    let { 
        correo, 
        contrasena, 
        nombre,
        admin, 
        primerapregunta, 
        primerapreguntarespuesta, 
        segundapregunta, 
        segundapreguntarespuesta } = req.body
        
        
        let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*-]{8,}$/

    if(contrasena.length < 8 || !regularExpression.test(contrasena)) {

        if(contrasena.length < 8){
            res.status(200).json({message: 'at least 8 characters'})
        }
        
        if(!regularExpression.test(contrasena)){
            res.status(200).json({message: 'badFormating'})
        }

    }else {

        let creatorAdmin = false

        if(req.userId){
            await user.findOne({
                where: {
                    id: req.userId
                }
            }).then( response => {
                if(response.admin === true) creatorAdmin = true
            })
        }

        contrasena = await passwordFunctions.encrypt( contrasena );
        admin = (admin === 'true' && creatorAdmin) ? true : false;

        await user.create({
                email: correo , 
                clave: contrasena, 
                nombre: nombre, 
                admin, 
                primerapregunta, 
                primerapreguntarespuesta, 
                segundapregunta, 
                segundapreguntarespuesta
            },{
                fields: 
                [ 'email', 
                'clave', 
                'nombre', 
                'admin' ,
                'primerapregunta', 
                'primerapreguntarespuesta', 
                'segundapregunta', 
                'segundapreguntarespuesta' ]

            }).then( async response => {
                let i = 0
                for (i= 0; i<req.files.length; i++){
                    await imageMin(
                        [`public/img/uploads/${req.files[i].filename}`],
                        {
                            destination: 'public/img/compressed',
                            plugins: [imageMin_jpeg()]
                        }
                    )
                    await userimagens.create({ 
                        path: '/img/compressed/' + req.files[i].filename, usuarioid: response.id
                    },{
                        fields: [ 'path' , 'usuarioid']
                    })
                }
            }).catch(e =>{
                if(e.message === 'llave duplicada viola restricción de unicidad «usuarios_email_key»'){
                    res.status(200).json({message: 'same email'})
                }
                if(e.message === 'notNull Violation: usuario.email cannot be null'){
                    res.status(200).json({message: 'wrong db'})
                }
            })


        
        try{
            let searchUser = await user.findOne({
                where: {
                    email: correo, clave: contrasena
                },
                include: [{
                    model: userimagens
                }]
            })

            token = jwt.sign({id: searchUser.id}, config.secret, { expiresIn: 60 * 60 * 24  })

            res.status(200).json({message: 'succeed', user: searchUser, token})
            
        }catch(e){

            if(e.message === "Cannot read property 'id' of null"){
                res.status(200).json({message: 'not added'})
            }else{
                res.status(200).json({message: 'error db'})
            }
        }
    }
})

router.post('/login', async (req, res)=>{
    let { correo , clave } = req.body

    let today = moment()

    let { token , status, userInformation } = ''
    try{
    await user.findOne({
        where: {email: correo },
        include: [{
            model: userimagens
        }]
    }).then( async response => {
        
        if ( await passwordFunctions.compare(clave , response.clave) ){
        token = jwt.sign({id: response.id}, config.secret, { expiresIn: 60 * 60 * 48 })
        status = 'password approved'
        
        response.last_connection = today
        response.save()

        userInformation = response 
    } else {
        status = 'password wrong'
    }
            
    }).catch( e => {
        status = 'email wrong'
    })
    } catch (e){
        status = 'bad db'
    }
    res.json({ token , status, userInformation })
})



router.post('/changepassword',  async (req,res)=>{
    let { clave , id } = req.body

    let regularExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(clave.length < 8 || regularExpression.test(clave)) {
        console.log(clave)
        if(clave.length < 8) return res.status(200).json({message: 'at least 8 characters'})
        if(regularExpression.test(clave)) return res.status(200).json({message: 'badFormating'})

    } else {
        clave = await passwordFunctions.encrypt( clave )
        
        try{
            await user.findOne({
                where: { id }
            }).then( response =>{
                if(!response) res.status(200).json({message: 'user not db'})
                
                if(response){
                    response.clave = clave;
                    response.save()
                    res.status(200).json({message: 'updated'})
                }
            })
    
        }catch(e){
            res.status(200).json({message: 'server error'})
        }
    }
})


router.get('/delete/:id', tokenVerification, async (req,res)=>{
    let { id } = req.params

    await userimagens.destroy({
        where: {usuarioid: id}
    })

    await user.destroy({
        where: {id}
    }).then(async (response)=>{
        if(response === 1 )res.status(200).json({message: 'succesfull'})  
        if(response === 0 ) res.status(200).json({message: 'user not db'})
    }).catch(() =>{
        res.status(200).json({message: 'something went wrong'})
    })
})

router.get('/getLastConnections', tokenVerification, async (req,res)=>{
    try{

        const response = await user.findAll({
            order: [
                ['last_connection', 'DESC']
            ]
        })

        res.status(200).json({response})
    } catch (e){
        res.json(e)
    }
    
})

router.post('/updateimage', async (req, res)=>{
    let { tokeepimage , id } = req.body;
   
    if(typeof tokeepimage == 'string'){
        tokeepimage = [{id: 0 , path: tokeepimage}]
    } else if (typeof tokeepimage == 'object'){
        tokeepimage = tokeepimage.map( (item, id) =>{
            return {id , path: item}
        })
    }
    
    let oldImages = await userimagens.findAll({
        where: {
            usuarioid: id
        }
    })
     

    let ItemsToDelete = [...oldImages]

    if(tokeepimage){
        if(oldImages.length !== tokeepimage.length){
            oldImages.map( oldItem =>{
                tokeepimage.map( newItem  => {
                    if (newItem.path === oldItem.path){
                        ItemsToDelete = ItemsToDelete.filter(({path})=>path !== oldItem.path)
                    }
                })
            })
            ItemsToDelete.map( async item =>{
                await item.destroy()
            })    
        }
    } else {
        ItemsToDelete.map( async item =>{
            await item.destroy()
        })   
    }

    
    req.files.map( async ({filename}) =>{
        await imageMin(
            [`public/img/uploads/${filename}`],
            {
                destination: 'public/img/compressed',
                plugins: [imageMin_jpeg()]
            }
        )

        await userimagens.create({
            path: '/img/compressed/' + filename , usuarioid: id
        },{
            fields: ['path', 'usuarioid']
        })
    })

    await user.findOne({
        where: {id},
        include: [{
            model: userimagens
        }]
    }).then( response =>{
        res.status(200).json({status: 'done', data: response})
    })
    
    
})

module.exports = router;