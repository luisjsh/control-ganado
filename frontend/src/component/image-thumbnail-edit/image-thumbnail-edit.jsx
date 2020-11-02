import React from 'react';

import './image-thumbnail-styles.scss'

function ImageThumbnail({url , handleClick , handleClickButton , displayed}) {
    return (
        <div className="image-thumbnail" >
        <img className={displayed ? 'image-thumbnail-displayed' : ""} alt='Thumbnail images' onClick={handleClick} src={url}></img>
        <button className='minus-button' onClick={handleClickButton}></button>
    </div>
    )
}

export default ImageThumbnail;
