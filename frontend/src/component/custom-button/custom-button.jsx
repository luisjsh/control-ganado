import React from 'react'

import './custom-button-style.scss'

const CustomButton = ({color, gridArea, children, ...otherProps}) =>(
    <div className={color ? 'button-section': 'form-button'} style={{gridArea: gridArea ? gridArea : ''}}>
        <button className={color ? color : 'button'}  {...otherProps}>{children}</button>
    </div>
)

export default CustomButton