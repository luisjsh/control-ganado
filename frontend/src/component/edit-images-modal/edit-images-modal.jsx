import React, { Component } from 'react'
import { connect } from 'react-redux'

import './edit-images-modal-styles.scss'

import Modal from '../modal/modalComponent'
import ImageThumbnail from '../image-thumbnail-edit/image-thumbnail-edit'
import ButtonConfirmation from '../button-confirmation/button-confirmation'

class EditImageModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: this.props.images[0] !== undefined ?  this.propsImageConditionHandler(this.props.images) : [] ,
            currentUrl: this.props.images[0] !== undefined ?  this.setImageonMount(this.props.images) : false ,
            focusedImage: 0
        }

        this.DeleteFromArray = this.DeleteFromArray.bind(this)
        this.setImageonMount = this.setImageonMount.bind(this)
        this.propsImageConditionHandler = this.propsImageConditionHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this);
        this.focusImage = this.focusImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)  
    }

    propsImageConditionHandler ( images ){
        return images.map( ({ id, path }) => {
            return {id, path: path , oldVersion: path }
        })
    }

    setImageonMount (image){
        return image[0].path
    }

    async inputHandler(event){
        if (event.target.files[0] !== undefined ){

            let addUrl = [...event.target.files].map( (item)  => {
                return {path: URL.createObjectURL(item) , file: item }
            })

            let Add2ArrTogether = [ ...this.state.image, ...addUrl ].map( ({path, file, oldVersion} , id) =>{
                return { id , path, file , oldVersion}
            })

            this.setState({currentUrl: Add2ArrTogether[0].path , image: Add2ArrTogether })
        } 

    }

    focusImage (id){
        this.setState({currentUrl: this.state.image[id].path  , focusedImage: id})
    }

    DeleteFromArray(id){
        let NewArray = this.state.image.filter( item => {
            return item.id !== id
        })

        this.setState({currentUrl: NewArray[0] ? NewArray[0].path : '' , image: NewArray  })
    }

    async handleSubmit(){
        
        let formData = new FormData()
        this.state.image.forEach( item => {
            if (item.oldVersion) {
                formData.append('tokeepimage' , item.oldVersion)
                
            }else if (item.file){
                formData.append('image' , item.file)
            }
        })
        formData.append('id' , this.props.id)

        switch(this.props.context){
            
            case 'item':
                await fetch('http://localhost:4000/item/updateimage', {
                    method: 'POST',
                    body: formData,
                    headers:{
                        "x-access-token" : this.props.currentToken
                    }
                    }).then( async (response) =>{
                        let {status} = await response.json()
                        switch(status){
                            case 'done':
                                this.props.DontShow()
                                this.props.setGoodNotification('Cambios realizados con éxito')
                                setTimeout(()=>{
                                    this.props.handleUpdate()
                                }, 1000)
                            break;

                            case 'ups':
                                this.props.DontShow()
                                this.props.handleUpdate()
                                this.props.setBadNotification('Error de servidor')
                            break;

                            default: 
                                return ''
                        }
                           
                    }).catch(e=>{
                        this.props.setBadNotification('Error de conexión')
                    })

                break;

            case 'user':

                 
                await fetch('http://localhost:4000/user/updateimage', {
                    method: 'POST',
                    body: formData,
                    headers:{
                        "x-access-token" : this.props.currentToken
                    }
                    }).then( async () =>{

                    setTimeout(async ()=>{
                       await fetch('http://localhost:4000/user/profile/', {
                        method: "GET",
                        headers: {
                          "Content-type": "application/json",
                          "x-access-token": this.props.currentToken,
                        }
                       })
                        .then( async responseArray => {
                            let { userInformation } = await responseArray.json()
                            this.props.DontShow()
                            this.props.setGoodNotification('Cambios realizados con éxito')
                                    this.props.updateItemInformation({ torosimagenes: userInformation.usuariosimagenes })
                                    this.props.setUserImagePath(userInformation.usuariosimagenes.length > 0 && userInformation.usuariosimagenes[0].path)
                                    this.props.DontShow()
                                })
                        }, 1000)
        
                }).catch(e=>this.props.setBadNotification('Error de conexión'))
                
                break;

                default: 
                    return ''
        }
    }

    render() {
        return (
            <Modal handleClick={this.props.DontShow} >
                <div className="container">
                    <button className='x-button' onClick={this.props.DontShow}>
                    </button>
                    <div className="img-displayed">
                        {
                        this.state.currentUrl ?
                            <img src={this.state.currentUrl} loading='lazy' alt='bigger one' /> 
                            : 
                            <div></div>
                        }
                        
                        <div className="background" style={{backgroundImage:' url('+this.state.currentUrl+')'}}></div>
                    </div>
                    <div className="image-controller-section">
                        <div className="input">
                            <label htmlFor='fileEdit'>Agregar Imagen</label>
                            <input type='file' id='fileEdit' onChange={this.inputHandler} multiple accept='image/png, image/jpeg'/>
                        </div>
                        <div className="images-thumbnails">
                            {
                                this.state.image === false ?

                                <div className="no-images">
                                </div>

                                :

                                    
                                this.state.image.map( ( item , id ) => (
                                    <ImageThumbnail url={item.path} key={id} handleClick={()=>this.focusImage(id)} handleClickButton={ ()=>this.DeleteFromArray(item.id) }  displayed={ this.state.focusedImage === id ? true : false} />
                                ))
                              
                            }
                        </div>
                            <div className="button-section">
                                <ButtonConfirmation handleClick={this.handleSubmit} handleClose={this.props.DontShow}/>
                            </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStatetoProps = ({item: {images} , user: {currentToken}})=>{
    return {
        images, currentToken
    }
}

const mapDispatchtoProps = ( dispatch )=>(
    {
        updateItemInformation: (item)=>{ dispatch({ type: 'SET_CURRENT_ITEM', payload: item})},
        setUserImagePath: (item)=>{ dispatch({type:'SET_IMAGE_PATH' , payload: item})},
        setGoodNotification: (message)=>{dispatch({type: 'SET_GOOD_NOTIFICATION', payload: message})},
        setBadNotification: (message)=>{dispatch({type: 'SET_BAD_NOTIFICATION', payload: message})}
    }
)

export default connect (mapStatetoProps, mapDispatchtoProps) (EditImageModal)
