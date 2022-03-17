import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

import './login-style.scss'

import Logo from '../Navbar/IMG/logo.svg'
import CustomInput from '../custom-input/custom-input';
import CustomButton from '../custom-button/custom-button';

class LogIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailLabel: 'Correo',
            emailBorderColor: '#dedede',

            password: '',
            passwordLabel: 'Contraseña',
            passwordBorderColor: '#dedede',

            catchap: '',
            catchapLabel: 'Por favor introduzca el texto',
            catchapBorderColor: '#dedede',
        }
        this.Redirect = this.Redirect.bind(this);
        this.submit = this.submit.bind(this);
        this.formHandler = this.formHandler.bind(this)
    }


    Redirect(event){
        let value = event.target.attributes.value.value;
        this.props.history.push('/'+value)
    }



    formHandler ( event ){
        let { name, value } = event.target
        this.setState({[name]:value})
    }

    componentDidMount(){
        loadCaptchaEnginge(6)
    }

    async submit (event){
        if(validateCaptcha(this.state.catchap) === false) return alert('Por favor introduzca el texto del catchap correctamente')

        if(validateCaptcha(this.state.catchap)  === true){

            event.preventDefault()
            let formData = new FormData()
            formData.append('correo', this.state.email)
            formData.append('clave', this.state.password)
            try{
                await fetch('http://localhost:4000/user/login', {
                    method: 'POST',
                    body: formData
                }).then( async response =>{
                    let responsejson = await response.json()
                    switch(responsejson.status){
                        
                        case 'password approved':
                            let userInformation = {
                                id: responsejson.userInformation.id,
                                name: responsejson.userInformation.nombre,
                                token: responsejson.token,
                                path: responsejson.userInformation.usuariosimagenes[0] !== undefined ? responsejson.userInformation.usuariosimagenes[0].path : false
                            }
                            this.props.setGoodNotification('Sesión iniciada de manera exitosa')
                            this.props.login(userInformation);
                            this.props.history.push('/')
                        break;

                        case 'password wrong':
                            this.props.setBadNotification('Correo y contraseña invalidos')    
                            break;

                            case 'email wrong':
                                this.props.setBadNotification('El correo introducido no se encuentra registrado')
                            break;
                        
                        case 'bad db':
                            this.props.setBadNotification('Error de servidor');
                            break;

                        case 'badFormating':
                            this.props.setBadNotification('Correo y contraseñas invalidos');
                            break;

                            case 'at least 8 characters':
                            this.props.setBadNotification('Correo y contraseñas invalidos')
                            break;

                            default: 
                    }
                }).catch( () => {
                    this.props.setBadNotification('Error de conexión')
                })
            } catch(e){
                this.props.setBadNotification('Error de conexión')
            }
        }
    }

    render(){
        return(
            <form onSubmit={this.submit}>
            <div className='login'>
                
                <div className="login-section" onKeyDown={ (event)=>{if(event.keyCode === '13'){this.submit(event)}}}>
                    <img className='logo' alt='Logo of the system' src={Logo} />
                    
                    <div className="login-card">
                        <span className='iniciar-sesion'>Iniciar Sesión</span>
                        
                        <div className="try" style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <CustomInput name='email' type='email' label={this.state.emailLabel} value={this.state.email} onChange={this.formHandler}></CustomInput>
                            <CustomInput name='password' type='password' label={this.state.passwordLabel} value={this.state.password} onChange={this.formHandler}></CustomInput>
                        </div>

                        <div className="captchap">

                        </div>

                        <LoadCanvasTemplate />
                        <CustomInput name='catchap' value={this.state.catchap} onChange={this.formHandler} label={this.state.catchapLabel}/>

                        <CustomButton value='login' color='primary-blue'>Iniciar Sesión</CustomButton>
                    </div>
                    
                    <span value='restorepassword' onClick={this.Redirect}> Recuperar contraseña </span>
                    <span value='signup' onClick={this.Redirect}> Registrarse </span>
                </div>

            </div>
            </form>
        )
    }
}

const mapDispatchtoProps = ( dispatch )=>(
    {
        login: (token)=>{ dispatch({ type: 'LOG_IN', payload: token})},
        setBadNotification: (message)=>{ dispatch({ type: 'SET_BAD_NOTIFICATION', payload: message})},
        setGoodNotification: (message)=>{ dispatch({ type: 'SET_GOOD_NOTIFICATION', payload: message})}
    }
)

export default connect (null, mapDispatchtoProps) (withRouter(LogIn))