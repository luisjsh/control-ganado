import React from 'react';

import './dropdown-select.styles.scss'

function DropdownSelect({id, children , labelName, ...otherProps}) {
    return (
        <div className='dropdown-select'>
           <label htmlFor='select'>{labelName}</label>
                  <select
                    {...otherProps}
                  >
                      {children}
                </select>
        </div>
    )
}

export default DropdownSelect;
