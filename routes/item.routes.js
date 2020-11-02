const express = require('express')
const router  = express.Router()
const sequelize = require('sequelize')
const Op = sequelize.Op

const toros = require('../models/toros.model')
const torosImage = require('../models/torosimagenes.model')
const logrosModel = require('../models/usefull-model/logros.model')
const pelajeModel = require('../models/usefull-model/pelaje.model')

const {tokenVerification, adminVerification} = require('../functions/verification-functions')

router.post('/add', tokenVerification, adminVerification , async (req, res)=>{
    let { 
        nombre , 
        hierro , 
        hierrocodigo, 
        tatuaje, 
        pelaje, 
        sexo, 
        encaste, 
        fechaNac , 
        //logros, 
        notas , 
        madreId , 
        padreId ,
        tientaDia,
        tientaResultado,
        tientaTentadoPor,
        tientaLugar,
        tientaCapa,
        tientaCaballo,
        tientaMuleta
        } = req.body;

    let ChoosedPelaje

    try{
        ChoosedPelaje = await pelajeModel.findOne({
            where: {
                nombre: pelaje
            }
        }).catch( e => res.status(200).json({message: 'problem pelaje'}))
    } catch(e){
        res.status(200).json({message: 'problem pelaje'})
    }

    if(!ChoosedPelaje) return res.status(200).json({message: 'problem pelaje'})

    try{
        await toros.create({
            nombre , 
            hierro,
            hierrocodigo,
            tatuaje, 
            pelaje: ChoosedPelaje.id ? ChoosedPelaje.id : 0, 
            encaste, 
            sexo, 
            fechanac: fechaNac, 
            //logros, 
            notas, 
            madreid: madreId, 
            padreid: padreId,
            tientadia: tientaDia,
            tientaresultado: tientaResultado,
            tientatentadopor: tientaTentadoPor,
            tientalugar: tientaLugar,
            tientacapa: tientaCapa,
            tientacaballo: tientaCaballo,
            tientamuleta: tientaMuleta
        
        },{
        
            fields: [
                'nombre',
                'hierro',
                'hierrocodigo', 
                'pelaje', 
                'tatuaje',
                'sexo' ,
                'fechanac', 
                //'logros', 
                'notas', 
                'madreid', 
                'padreid',
                'tientadia',
                'tientaresultado',
                'tientatentadopor',
                'tientalugar',
                'tientacapa',
                'tientacaballo',
                'tientamuleta'
            ]
        
        }).then( async response =>{
            if(req.files){
                let i = 0;
                for ( i=0 ; i<req.files.length; i++){
                    await torosImage.create({ 
                        path: '/img/uploads/' + req.files[i].filename, torosid: response.id
                    },{
                        fields: [ 'path' , 'torosid']
                    })
                }
                res.status(200).json({message: 'succeeded'})
            }
            else {
                res.status(200).json({message: 'succeeded'});
            }    
        }).catch( () =>{
        res.status(200).json({message: 'problem db'})
        })

    } catch(e){
        res.status(200).json({message: 'problem db'})
    } 
    
});


router.get('/:pageNumber', async (req, res)=>{
    let {pageNumber} = req.params
    let limit = 10;

    try{
        await toros.count().then( async count =>{
            let pages = Math.ceil(count / limit)
            let offset = limit * (pageNumber - 1)
            await toros.findAll({
                include: [{model: torosImage}],
                limit,
                offset
            }).then( response =>  res.status(200).json({fetchedData: response, pages}))
        })

    } catch(e){
        res.status(200).json({message: 'problem db'})
    }
})


router.get('/search/profile/:id', async (req, res)=>{
    let { id } = req.params;
    try{
    await toros.findOne({
        where: {
            id 
        },
        include: [{model: torosImage}, {model: pelajeModel, as: 'pelajes'}]
    }).then( response => {
            if(!response) res.status(200).json({detail: 'isnt on db'})
            if(response) res.status(200).json({response})
        })
    } catch(e){
        res.status(200).json({detail: 'problem db'})
    }
})


router.post('/searchforParent', tokenVerification, adminVerification , async (req, res)=>{
    let { sex , name } = req.body
    await toros.findAndCountAll({
        where: {
            sexo: sex ,
            nombre: {
                [Op.like]: '%'+ name +'%'
            }
        },
        limit: 15,
        include: [{
            model: torosImage
        }] 
    }).then( response => res.status(200).json({ status: 200, parentsArray: response.rows }))
})



router.get('/search/family/parents/:id', async (req, res)=>{
   let { id } = req.params

   await toros.findOne({
        where: { id }
    }).then( async response => {
        let {madreid , padreid} = response;
        let grandPaWrapper = [ ]
        
        if ( madreid > 0 || padreid > 0){
            
            await toros.findAll({
                where: {
                    [Op.or]: [ {id: parseInt(padreid)},{ id: parseInt(madreid)} ]
                },
                include:
                [{ model: torosImage}]

            }).then(async parentsArray =>{

                for(let i = 0; i<parentsArray.length; i++){ 
                    let {madreid, padreid} = parentsArray[i]
                    if ( madreid > 0 || padreid > 0){
                        let grandpa = await toros.findAll({
                            where: {
                                [Op.or]: [ {id: parseInt(padreid)},{ id: parseInt(madreid)} ]
                            },
                            include:
                            [{ model: torosImage}]
                        }) 
                        grandPaWrapper = [...grandPaWrapper, ...grandpa]
                    }
                }  
                res.status(200).json({parents: parentsArray, grandParents: grandPaWrapper})
            })
        }
        res.status(200).json({parents: [], grandParents: []})
        
    }).catch((e)=>{
        res.status(200).json({detail: 'isnt on db'})})
})


router.get('/search/family/child/:id', async (req, res)=>{
    let { id } = req.params 

    await toros.findAll({
        where: {
            [Op.or] : [{padreid: parseInt(id) }, { madreid: parseInt(id) }]
        } , 
        include: [{
            model: torosImage
        }]

    }).then( async answer => {
        answer.length > 0 ?
            res.status(200).json({ status: 200, detail: 'has childs', responseArray: answer})
        :
            res.status(200).json({status: 200, detail:'nochilds'})
        
    })
})

router.post('/update', /*tokenVerification, adminVerification , */async (req, res)=>{

    let { 
        id , 
        nombre, 
        pelaje, 
        fechaNac, 
        //logros, 
        //notas, 
        encaste,
        tatuaje,   
        tientaDia,
        tientaResultado,
        tientaTentadoPor,
        tientaLugar,
        tientaCapa,
        tientaCaballo,
        tientaMuleta} = req.body
 
        let ChoosedPelaje
        try {
            ChoosedPelaje = await pelajeModel.findOne({
                where: {
                    nombre: pelaje
                }
            })
        } catch(e){
            res.status(200).json({detail: 'problem db'})
        }

        await toros.findOne({ 
            where: { id }
        }).then( async response => {

            response.nombre = nombre;
            response.pelaje = ChoosedPelaje.id;
            response.fechanac = fechaNac;
        //  response.logros = parseInt(logro);
        //  response.notas = notas;
            response.encaste = encaste
            response.tatuaje = tatuaje
            response.tientadia = tientaDia
            response.tientaresultado = tientaResultado
            response.tientatentadopor = tientaTentadoPor
            response.tientalugar = tientaLugar
            response.tientacapa = tientaCapa
            response.tientacaballo = tientaCaballo
            response.tientamuleta = tientaMuleta
            response.save()
        })

            
    await toros.findOne({
        where: {id},
        include: [{model: logrosModel}, {model: pelajeModel, as: 'pelajes'}]
    }).then( response =>{
        res.status(200).json({status: 200, detail:'updated' , response: response})
    })
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
    
    let oldImages = await torosImage.findAll({
        where: {
            torosid: id
        }
    })
     

    let ItemsToDelete = []
    
    if (tokeepimage == undefined){
        
        oldImages.map( oldItem =>{
            ItemsToDelete.push(oldItem)
        })
    
    } else if (oldImages.length != tokeepimage.length){
        oldImages.map( oldItem =>{
            tokeepimage.map( newItem  => {
                if (newItem.path != oldItem.path){
                    ItemsToDelete.push(oldItem)
                }
            })
        })
    }
    
    
    ItemsToDelete.map( async item =>{
        await item.destroy()
    })
    
    req.files.map( async item =>{
        await torosImage.create({
            path: '/img/uploads/' + item.filename , torosid: id 
        },{
            fields: ['path', 'torosid']
        })
    })

    res.status(200).json({status: 'done'})
    
})

router.get('/destroy/:id', tokenVerification, adminVerification , async (req, res)=>{
    let {id} = req.params

    try{
        await toros.destroy({
            where: {
                id
            }
        }).then( async (response)=>{
            if(response === 1 ) res.status(200).json({message: 'succesfully'})
            if(response === 0 ) res.status(200).json({message: 'no entry'})
        })
    }catch(e){
        res.status(200).json({message: 'error db'})
    }
})

module.exports = router;