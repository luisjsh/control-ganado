import React from 'react';

import './dropdown-with-input.scss'

import CustomInput from '../custom-input/custom-input'

function dropdownInput({children, labelName,  ...otherProps}) {
    return (
        <div className='dropdown'>
            <CustomInput label={labelName} {...otherProps}/>
            <div className="results">
             {children}     
            </div>
        </div>
    )
}

export default dropdownInput;
