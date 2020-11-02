import React from 'react';

import './button-confirmation-styles.scss'

function ButtonConfirmation({handleClick , handleClose}) {
    return (
        <div className="button-confirmation">
            <button id='save-changes'>Guardar Cambios</button>
            <button id='cancel' onClick={handleClose}>Cancelar</button>
            <button id='agree' onClick={handleClick}>Guardar Cambios</button>
        </div>
    )
}

export default ButtonConfirmation;
