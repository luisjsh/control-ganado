import React from 'react';

import './image-styles.scss'

function Image({ path , reference }) {
    return (
        <div className='slide' style={{ transform:'translateY('+reference+'%)', zIndex: '-1'}} >
            <img alt={reference} src={path}/>
            <div className='background' style={{background:'url('+path+')'}}></div>                  
        </div>
    )
}

export default Image;
