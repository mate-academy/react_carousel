/* eslint-disable no-plusplus */
import React from 'react';
import './App.scss';

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

    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    currentPoint: 0,
  };

  changeArrayNext = (step) => {
    const { images } = this.state;

    this.setState({
      images: [...images.slice(step), ...images.slice(0, step)],
    });
  }

  changeArrayPrev = (step) => {
    const { images } = this.state;
    const a = images.length - step;

    this.setState({
      images: [...images.slice(a), ...images.slice(0, a)],
    });
  }

  setPointNext = () => {
    this.setState((state) => {
      const { currentPoint, step, frameSize, images } = state;
      let nextPoint = currentPoint + step;

      if (nextPoint + frameSize >= images.length) {
        nextPoint = images.length - frameSize;
      }

      return {
        currentPoint: nextPoint,
      };
    });
  }

  setPointPrev = () => {
    this.setState((state) => {
      const { currentPoint, step } = state;
      let nextPoint = currentPoint - step;

      if (currentPoint - step <= 0) {
        nextPoint = 0;
      }

      return {
        currentPoint: nextPoint,
      };
    });
  }

  setStateOnChange = (key, value) => {
    this.setState({
      currentPoint: 0,
      [key]: value,
    });
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      currentPoint,
    } = this.state;

    const inputKeys = Object.keys(this.state).slice(1, -1);

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          currentPoint={currentPoint}
          changeArrayNext={this.changeArrayNext}
          changeArrayPrev={this.changeArrayPrev}
          setPointNext={this.setPointNext}
          setPointPrev={this.setPointPrev}
        />
        <form className="form-fields">
          {inputKeys.map(key => (
            <>
              <span>
                {key}
                :
              </span>
              <input
                type={key === 'infinite' ? 'checkbox' : 'text'}
                name={`${key}`}
                value={this.state[key]}
                onChange={(e) => {
                  this.setStateOnChange(
                    e.target.name,
                    key !== 'infinite' ? +(e.target.value) : e.target.checked,
                  );
                }}
              />
            </>
          ))}
        </form>
      </div>
    );
  }
}

export default App;
