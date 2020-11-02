import React from 'react'

import './errorpage-styles.scss'
import ErrorImg from './img/error.svg'
import CustomButton from '../../component/custom-button/custom-button'

function ErrorPage (){

    const handleClick = (event) =>{
        event.preventDefault()
        window.location.reload();
    }   

    return(
        <div className='error'>
            <div>
            <p>Error de Conexión!</p>
            <img loading='lazy' src={ErrorImg}></img>
            <CustomButton color='primary-blue' onClick={handleClick}>Intentar de nuevo</CustomButton>
            </div>
        </div>
    )
}

export default ErrorPage