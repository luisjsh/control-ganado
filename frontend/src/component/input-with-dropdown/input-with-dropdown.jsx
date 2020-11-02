import React from 'react'

import './input-with-dropdown-styles.scss'

function InputWithDropdown({label}) {
    return (
        <div className='wrapper'>
            {label && <label>{label}</label>}
            <div className='dropdown'>
        
            </div>
            <input type='text'>
            </input>
        </div>
    )
}

export default InputWithDropdown
