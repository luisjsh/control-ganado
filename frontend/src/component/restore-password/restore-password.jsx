import React, {useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import styled, {keyframes} from 'styled-components'

import CustomInput from '../custom-input/custom-input'
import CustomButton from '../custom-button/custom-button'
import RoundButton from '../round-button/round-button'

const Page = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    align-content: space-around;
    grid-template-columns: 25% 50% 25%;    
    grid-template-areas: "left-area content right-area";
    transform: 3s;

    @media (max-width: 639px){
        grid-template-columns: 10% 80% 10%;
    }
`
//padding: 2em;

const Wrapper = styled.div`
    grid-area: content;
`

const Header = styled.header`
`

const appearSection = keyframes`
    0%{
        opacity: 0;
        transform: translateY(10px);
    }

    100%{
        opacity: 1;
        transform: translateY(0);
    }
`

const Section = styled.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    animation: ${appearSection} .3s ease; 
    transform: .3s;
`

const P = styled.p`
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    text-transform: capitalize;
`

const QuestionTitle = styled.h3`
    margin: 0;
    font-weight: 500;
    padding: 1em 0;
`

function RestorePassword({history, setBadNotification, setGoodNotification}) {
    const [user, setUser] = useState(false)

    const [inputData, setInputData] = useState({
        email: '',
        firstQuestionAnswer: '',
        secondQuestionAnswer: '',
        confirmNewPassword: '',
        newPassword: ''
    })

    const [changePasswordStep, setChangePasswordStep] = useState(false)

    const formHandler = (event) =>{
        let {name, value} = event.target
        setInputData({...inputData, [name]:value})
    }

    const getUser = async (event) =>{
        event.preventDefault()
        try {
            await fetch(`/user/find/${inputData.email}`).then( async userJson => {
                let {message, response} = await userJson.json()
                if(message){
                    if(message === 'user not db') setBadNotification('El correo no se encuentra registrado')
                    if(message === 'something went wrong') setBadNotification('Error de base de datos')
                }
                if(response){
                    setUser(response)
                    setGoodNotification('El usuario se encuentra registrado')
                }
            })
        } catch (e) {
            setBadNotification('Error')
        }
    }

    const checkAnswers = (event)=>{
        event.preventDefault()
        let {
            primerapreguntarespuesta, 
            segundapreguntarespuesta
            } = user

        let {
            firstQuestionAnswer,
            secondQuestionAnswer} = inputData
        
        if( (primerapreguntarespuesta !== firstQuestionAnswer) || 
            (segundapreguntarespuesta !== secondQuestionAnswer) ){

            if(primerapreguntarespuesta !== firstQuestionAnswer) setBadNotification('La primera respuesta no coincide')
            if(segundapreguntarespuesta !== secondQuestionAnswer) setBadNotification('La segunda respuesta no coincide')
        
        } 

        if( (primerapreguntarespuesta === firstQuestionAnswer) &&
            (segundapreguntarespuesta === secondQuestionAnswer) ){
            setChangePasswordStep(true)
        }
    }

    const setNewPassword = async (event)=>{
        event.preventDefault()
        
        let {id} = user
        let {newPassword, confirmNewPassword} = inputData

        if(newPassword === confirmNewPassword ) {
            let formData = new FormData()
            formData.append('id', id)
            formData.append('clave', newPassword)

            await fetch('/user/changepassword',{
                method: 'POST',
                body: formData
            }).then( async response =>{
                let {message} = await response.json()
                
                if(message){
                    if(message === 'user not db') setBadNotification('El correo no se encuentra registrado')
                    if(message === 'updated'){
                        setGoodNotification('Contraseña cambiada exitosamente')
                        history.push('/login')
                    }

                    if(message === 'badFormating'){
                        this.props.setBadNotification('Recuerde que la contraseña debe llevar al menos 1 caracter especial, una letra mayuscula y una minuscula')
                    }
                    
                    if(message === 'at least 8 characters'){
                        this.props.setBadNotification('Recuerde que la contraseña debe ser de al menos 8 caracteres')
                    }
                }
            }).catch( () =>{
                setBadNotification('Error de conexión')
            })
        } else {
            setBadNotification('Las contraseñas introducidas no coinciden')
        }
    }

    return (
        <Page>
            <Wrapper>
                
                <RoundButton handleClick={ ()=>history.push('/login')}/>
                
                <Header>
                    <P>Cambiar contraseña</P>
                </Header>

                <Section>
                    <form onSubmit={getUser}>
                        <CustomInput 
                            name='email' 
                            handleChange={formHandler} 
                            value={inputData.email} 
                            label='correo' 
                            type='email' 
                            required/>
                    {
                        !user && <CustomButton color='primary-blue'>Siguiente</CustomButton>
                    }    
                    </form>
                </Section>

                {
                   ( user && !changePasswordStep ) && 
                    <Section>
                        <P>Preguntas de seguridad</P>
                        <form onSubmit={checkAnswers}>
                            <QuestionTitle>{user.primerapregunta}</QuestionTitle>
                            <CustomInput 
                                type='text' 
                                name='firstQuestionAnswer' 
                                label='Respuesta' 
                                value={inputData.firstQuestionAnswer} 
                                handleChange={formHandler} 
                                required/>

                            <QuestionTitle>{user.segundapregunta}</QuestionTitle>
                            <CustomInput 
                                type='text' 
                                name='secondQuestionAnswer' 
                                label='Respuesta' 
                                value={inputData.secondQuestionAnswer} 
                                handleChange={formHandler} 
                                required/>

                        {!changePasswordStep && <CustomButton color='primary-blue'>Siguiente</CustomButton>}
                        </form>    
                    </Section>
                }

                { changePasswordStep && <Section>
                    <P>Cambio de contraseña</P>
                    <form onSubmit={setNewPassword}>
                        <P>Pregunta Nro 1</P>
                        <QuestionTitle>Por favor introduzca su nueva contraseña</QuestionTitle>
                        <CustomInput 
                            name='newPassword'
                            value={inputData.newPassword}
                            handleChange={formHandler}
                            type='password'
                            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" 
                            comment='La contraseña debe contener como minimo 8 caracteres, 1 mayuscula, 1 minuscula, 1 caracter especial'
                            />    
                        
                        <P>Pregunta Nro 2</P>
                        <QuestionTitle>Por favor introduzca confirme su nueva contraseña</QuestionTitle>
                        <CustomInput 
                            name='confirmNewPassword'
                            value={inputData.confirmNewPassword}
                            handleChange={formHandler}
                            type='password'
                            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" 
                            comment='La contraseña debe contener como minimo 8 caracteres, 1 mayuscula, 1 minuscula, 1 caracter especial'
                            />    
                        
                        <CustomButton color='primary-blue'>Guardar</CustomButton>
                    </form>
                </Section>}
            </Wrapper>
        </Page>
    )
}

const mapDispatchToProps = (dispatch)=>(
    {
        setGoodNotification: (message)=>{dispatch({type:'SET_GOOD_NOTIFICATION', payload:message})},
        setBadNotification: (message)=>{dispatch({type:'SET_BAD_NOTIFICATION', payload:message})}
    }
)

export default connect (null, mapDispatchToProps)(withRouter(RestorePassword))
