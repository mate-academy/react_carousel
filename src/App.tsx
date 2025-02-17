import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  inputs: {
    size: number;
    imagesDisplayed: number;
    step: number;
    animationDuration: number;
    infinite: boolean;
  };
}

class App extends React.Component<{}, State> {
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
    inputs: {
      itemWidth: 130,
      frameSize: 3,
      step: 3,
      animationDuration: 1000,
      infinite: false,
    },
  };

  updateValue = (number: number, key: string) => {
    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [key]: number,
      },
    }));
  };

  render() {
    const { images, inputs } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form className="inputForm" action="">
          <div className="inputWrapper">
            <label htmlFor="itemId">Enter a desired image size (px)</label>
            <input
              type="number"
              id="itemId"
              name="itemWidth"
              onChange={e => {
                this.updateValue(+e.target.value, 'itemWidth');
              }}
              value={inputs.itemWidth}
            />
          </div>

          <div className="inputWrapper">
            <label htmlFor="frameId">
              Enter the number of displayed images
            </label>
            <input
              type="number"
              id="frameId"
              name="imagesNumber"
              onChange={e => {
                this.updateValue(+e.target.value, 'frameSize');
              }}
              value={inputs.frameSize}
            />
          </div>

          <div className="inputWrapper">
            <label htmlFor="stepId">
              Enter the number of scrolled images at a time
            </label>
            <input
              type="number"
              id="stepId"
              name="imagesScrolled"
              value={inputs.step}
              onChange={e => {
                this.updateValue(+e.target.value, 'step');
              }}
            />
          </div>

          <div className="inputWrapper">
            <label htmlFor="animationDurationId">
              Enter animation durations (ds)
            </label>
            <input
              type="number"
              id="animationDurationId"
              name="animationDuration"
              value={inputs.animationDuration}
              onChange={e => {
                this.updateValue(+e.target.value, 'animationDuration');
              }}
            />
          </div>
        </form>

        <Carousel
          images={images}
          size={inputs.itemWidth}
          step={inputs.step}
          duration={inputs.animationDuration}
          displayed={inputs.frameSize}
        />
      </div>
    );
  }
}

export default App;
