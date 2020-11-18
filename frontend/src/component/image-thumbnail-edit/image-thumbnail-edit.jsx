import React from 'react';

import './image-thumbnail-styles.scss'

function ImageThumbnail({url, id, handleClick , handleClickButton , displayed}) {
    return (
        <div className="image-thumbnail" >
        <img className={displayed ? 'image-thumbnail-displayed' : ""} alt='Thumbnail images' loading='lazy' onClick={handleClick} src={url}></img>
        <button name={id} className='minus-button' onClick={handleClickButton}></button>
    </div>
    )
}

export default ImageThumbnail;
