import React from 'react';

import './text-area-component.styles.scss'

function TextAreaComponent({labelName, children, ...otherProps}) {
    return (
        <div className="text-area">
            <label htmlFor="textarea">{labelName}</label>
            <textarea
                id='textarea'
                {...otherProps}
            >
                {children}
            </textarea>
        </div>
    )
}

export default TextAreaComponent;
