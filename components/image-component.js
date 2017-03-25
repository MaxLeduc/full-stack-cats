import React from 'react'

const ImageComponent = ({ imageUrl, id, deleteImage }) => (
  <div className='col-md-3'>
    <a href='#' className='thumbnail'>
      <img src={ imageUrl } />
      <button onClick={ (evt) => deleteImage(id) }>Delete</button>
    </a>
  </div>
)

export default ImageComponent