import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import './profile-page-style.scss'
import ImageCarousel from '../image-carousel/image-carousel';
import CustomButton from '../custom-button/custom-button';

class ProfilePage extends React.Component {
 
 constructor(){
     super();
     this.Redirect = this.Redirect.bind(this);
     this.handleDelete = this.handleDelete.bind(this);
 }

    componentDidMount(){
        if (this.props.currentUserArray){
             this.props.setItem({ torosimagenes: this.props.currentUserArray.usuariosimagenes })
        }
    }

     //------------- Redirect ---------

     Redirect (event){
        let value = event.target.attributes.value.value;
        this.props.history.push('/'+value)
    }

    //--------------------------------

    async handleDelete(){
        await fetch('http://localhost:4000/user/delete/'+ this.props.currentUserArray.id , {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "x-access-token": this.props.currentToken,
            }
        } ).then( e => { 
        
        alert('Eliminado con exito'); 
        this.props.logOut()
     })
     
    }

 render(){
 return(
 
 <div className='profile-page'>
{
    this.props.currentUser && this.props.currentUserArray !== null ? 

<div className="page">

    <div className="image-section">
    <ImageCarousel id={this.props.currentUserArray.id} context='user' />
    </div>

    <div className="information-side">

    <span>Correo: { this.props.currentUserArray.email }</span>
    <span>Nombre: { this.props.currentUserArray.nombre }</span>

    <div className="edit-section">
        <CustomButton color='secundary-blue' onClick={()=>{this.props.history.push('/changepassword')}}>Cambiar contraseña</CustomButton>
        <CustomButton color='secundary-red' onClick={this.handleDelete} >Eliminar cuenta</CustomButton>
    </div>

    </div> 

</div>

:

this.props.history.push('/login')

}
</div>


)}}

const mapStatetoProps = ({user: { currentUser , currentUserArray, currentToken}}) =>{
    return ({
        currentUser , currentUserArray, currentToken
    })
}

const mapDispatchtoProps = ( dispatch )=> (
    {
        setItem: ( itemData )=>{ dispatch({ type: "SET_CURRENT_ITEM", payload: itemData }) },
        logOut: ()=>{dispatch({type:'LOG_OUT'})}
    }
)

export default  connect (mapStatetoProps, mapDispatchtoProps) (withRouter(ProfilePage))