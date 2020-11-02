import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'

import './change-password-style.scss'
import CustomButton from '../custom-button/custom-button'

class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 validation: false,
                 primeraPregunta: '',
                 segundaPregunta: '',
                 password: '',
                 passwordConfirmation: '',
                 buttonText: 'Siguiente'
        }
        this.formHandler = this.formHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    componentDidMount(){
        console.log(this.props.currentUserArray)
    }

//---------------- input-form ----------------------

    formHandler( event ){
        let { name, value } = event.target
        this.setState({[name]: value})
    }

//-------------------- on submit -------------------

    onSubmit(){
        if ( this.props.currentUserArray.primerapreguntarespuesta === this.state.primeraPregunta && this.props.currentUserArray.segundapreguntarespuesta === this.state.segundaPregunta ){
            this.setState({ validation: true})
        }
    }

//------------------ change password ----------------

    async changePassword(){
        if( this.state.password === this.state.passwordConfirmation){
            let formData = new FormData()
            formData.append('clave', this.state.password)
            formData.append('id', this.props.currentUserArray.id)
            await fetch('http://localhost:4000/user/changepassword', {
                method: 'POST',
                body: formData
            }).then( e =>
                alert('Guardado con exito')
                ).catch( e =>
                     alert('Error de conexion')
                    )
        }
    }


    render() {
        return (
            <div className='change-password-page'>

                {

                    this.props.currentUserArray ?
                    
                    this.state.validation ?

                    <div className='security-password-section'>
                         <span>Introduzca la nueva contraseña</span>
                         <input type='text' name='password' value={this.state.password} onChange={this.formHandler} />
                         <span>Confirme la contraseña</span>
                         <input type='text' name='passwordConfirmation' value={this.state.passwordConfirmation} onChange={this.formHandler}/>
                         <CustomButton color='primary-blue' onClick={this.changePassword} ></CustomButton> 
                    </div>

                    :

                    <div className="security-password-section">
                    <span> {this.props.currentUserArray.primerapregunta} </span>
                    <input type='text' name='primeraPregunta' value={this.state.primeraPregunta} onChange={this.formHandler} />
                    <span> {this.props.currentUserArray.segundapregunta} </span>
                    <input type='text' name='segundaPregunta' value={this.state.segundaPregunta} onChange={this.formHandler} />
                    <CustomButton color='primary-blue' onClick={this.onSubmit}>{this.state.buttonText}</CustomButton>
                    </div>

                    :

                    this.props.history.push('/')

                }

            </div>
        )
    }
}

const mapStatetoProps = ({ user: { currentUserArray }}) =>{
    return ({
        currentUserArray
    })
}

export default connect (mapStatetoProps) ( withRouter(ChangePassword) )
