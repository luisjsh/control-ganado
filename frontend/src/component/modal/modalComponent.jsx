import React from 'react'
import reactDOM from 'react-dom'

import './styles.scss';

const Modal  = ({children, handleClick}) =>(
    
    reactDOM.createPortal(
        <div className='modal'>
            <div className='close'  onClick={handleClick}></div>
            {children}
        </div>,
        document.querySelector('#modal')
    )
)



export default Modal