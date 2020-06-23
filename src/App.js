/* eslint-disable no-console */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import './App.css';
import Carousel from './components/Carousel';

class App extends React.Component {
  state = {
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],

    marginLeft: 0,
    marginItem: 0,
  };

  moveImages = (ev) => {
    const direction = ev.target.className;

    return (
      this.setState((prevState) => {
        let movedImages;
        let imagesList;
        let marginNew;
        let marginItemNew;

        if (direction === 'left') {
          movedImages = prevState.images.splice(-2, 2);
          imagesList = movedImages.concat(prevState.images);
          marginNew = prevState.marginLeft + 260;
          marginItemNew = -marginNew;
        } else {
          movedImages = prevState.images.splice(0, 2);
          imagesList = prevState.images.concat(movedImages);
          marginNew = prevState.marginLeft - 260;
          marginItemNew = -marginNew;
        }

        return {
          images: imagesList,
          marginLeft: marginNew,
          marginItem: marginItemNew,
        };
      })
    );
  }

  render() {
    const { images, marginItem, marginLeft } = this.state;

    return (
      <div className="App">
        <h1>
          Carousel with
          &nbsp;
          {images.length}
          &nbsp;
          images
        </h1>
        <div className="container">

          <Carousel
            marginItem={marginItem}
            images={images}
            margin={marginLeft}
            slide={this.moveImages}
          />
        </div>
      </div>
    );
  }
}

export default App;
