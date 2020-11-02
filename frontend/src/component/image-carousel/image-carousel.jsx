import React, { Component } from 'react'
import { connect } from 'react-redux' 

import './image-carousel-style.scss'

import Image from './image'

import EditImage from '../edit-images-modal/edit-images-modal'

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
             choosedImage: null,
             x: 0,
             imageId: 0,
             show: false
        }
        this.goRight = this.goRight.bind(this);
        this.goLeft = this.goLeft.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.DontShow = this.DontShow.bind(this);
    }

//------------- go to right image ---------------

    goRight(){
       if ( this.state.imageId < this.props.images.length - 1 ){
        let right = this.state.imageId + 1;
        let rightImage = this.state.x - 100;
        this.setState({imageId: right, x: rightImage})
       }
    }

//------------- go to left image --------------

    goLeft(){
        if ( this.state.imageId > 0 ){
            let left = this.state.imageId - 1;
            let leftImage = this.state.x + 100;
            this.setState({imageId: left, x: leftImage})
           }
    }

//------------- select image ------------------


    selectImage (event){
        let x = - (event.target.attributes.value.value * 100)
        this.setState({imageId: parseInt(event.target.attributes.value.value) , x})
    }

    DontShow(){
        this.setState({show: false})
    }


    componentWillUnmount(){
        this.props.setItem({torosimagenes: []})
    }

    render() {
        return (
            <div className='carousel'>

                { this.state.show ? <EditImage DontShow={this.DontShow} id={this.props.id} context={this.props.context} /> : ''}

                { this.props.currentUserAdmin ? <button className='edit' onClick={()=>this.setState({show: !this.state.show})}></button> : ''} 
                
                <div className="container">

                {this.props.images && this.props.images.length > 1  ? <button id='right' onClick={this.goRight}></button>  : ''}

                
                {this.props.images  && this.state.x !== 0 ? <button id='left'  onClick={this.goLeft} ></button> : ''}
                    <div className="images">
                    {
                         this.props.images.length > 0 ? 
                        
                        this.props.images.map( ({ id , path })  => (
                            <Image key={id} path={path} reference={this.state.x}/>
                        ))

                        :

                        <div className='slides'></div>
                    }
                    </div>
                </div>
                {
                    
                     this.props.images ? 
                    
                    this.props.images.map( ({ id, path }, idValue)=>(
                        <img key={id} src={'http://localhost:4000'+ path} alt='Img' value={idValue}  className={ this.state.imageId === idValue ? 'selected-image' : 'tiny-slides' } onClick={this.selectImage} />
                    ))
                
                     :
                     
                     ''
                
                }
            </div>
        )
    }
}

const mapStatetoProps = ({ item: { images } , user: {currentUserAdmin}})=>{
    return{
        images , currentUserAdmin
    }
}

const mapDispatchtoProps = (dispatch) =>(
    {
        setItem: (item)=>{ dispatch({ type:'SET_CURRENT_ITEM' , payload:item })}
    }
)

export default connect (mapStatetoProps, mapDispatchtoProps) (ImageCarousel)
