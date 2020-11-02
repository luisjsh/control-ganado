import React from 'react'

import Modal from '../modal/modalComponent'
import './confirmation-card-styles.scss'
import CustomButton from '../custom-button/custom-button'

const uSureCard = ({handleClick, handleSubmit})=>(
    <Modal handleClick={handleClick}>
        <div className='background'>    
            <div className="card">
                <h3>Estas seguro?</h3>
                <div className="button-area">

                <CustomButton color='secundary-red' onClick={handleClick}>cancelar</CustomButton>

                <CustomButton color='primary-blue' onClick={handleSubmit} style={{width: '100%'}}>Guardar</CustomButton>

                </div>
            </div>
        </div>
    </Modal>
)


export default uSureCard