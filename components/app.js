import React from 'react'
import $ from 'jquery'

import ImageComponent from './image-component'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      images: [],
      newImage: '',
      error: null
    },
    this.updateNewImage = this.updateNewImage.bind(this),
    this.addNewImage = this.addNewImage.bind(this),
    this.refresh = this.refresh.bind(this),
    this.deleteImage = this.deleteImage.bind(this)
  }

  render () {
    return <div>
      { this.state.error ? this.state.error : null }
      <div className='container'>
        <div className='thumbnails'>
          { this.state.images.map( (image, index) => {
            return <ImageComponent  imageUrl={ image.url } 
                                    id={ image._id }
                                    key={ index }
                                    deleteImage={ (id) => this.deleteImage(id) }
                                    />
          }) }
        </div>
      </div>
      <div className='container'>
        <form>
          <input type="text" placeholder="add a cat" className="form-control" value={ this.state.newImage } onChange={ (evt) => this.updateNewImage(evt.target.value)}/>
          <button type="submit" className="btn btn-primary" onClick={ (evt) => this.addNewImage(evt) }>Add this cat!</button>
        </form>
      </div>
    </div>
  }

  updateNewImage (value) {
    this.setState({ newImage: value })
  }

  addNewImage (evt) {
    evt.preventDefault
    $.ajax({
      method: "POST",
      url: "/api/images",
      data: JSON.stringify({ url: this.state.newImage }),
      contentType: "application/json"
      })
    .then(() => {
      this.setState({newImage: ''})
      this.refresh()
    })
  }

  componentDidMount () {
    this.refresh()
  }

  refresh () {
    $.get('/api/images')
    .then((images) => {
      this.setState({images: images})
    })
    .catch((error) => {
      this.setState({error: error.message})
    })
  }

  deleteImage (id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/images/' + id
    })
    .then(() => {
      this.refresh()
    })
  }
} 

export default App