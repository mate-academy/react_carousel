import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  // handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     name, value, checked, type,
  //   } = event.target;

  //   this.setState({ [name]: type === 'checkbox' ? checked : value });
  // };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, checked, type,
    } = event.target;

    const partialState = {
      [name]: type === 'checkbox' ? checked : value,
    };

    this.setState(prevState => ({
      ...prevState,
      ...partialState,
    }));
  };

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration, infinite,
    } = this.state;

    // const handleStep
    //   = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
    //     step: +event.target.value,
    //   });
    // const handleFrameSize
    //   = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
    //     frameSize: +event.target.value,
    //   });
    // const handleItemWidth
    //   = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
    //     itemWidth: +event.target.value,
    //   });
    // const handleAnimationDuration
    //   = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
    //     animationDuration: +event.target.value,
    //   });
    // const handleInfinite
    //   = () => {
    //     if (this.state.infinite === false) {
    //       this.setState({
    //         infinite: true,
    //       });
    //     } else {
    //       this.setState({
    //         infinite: false,
    //       });
    //     }
    //   };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <div className="input-container">
          <div className="input-container__item">
            <label htmlFor="itemId">item - width </label>
            <input
              name={`${itemWidth}`}
              id="itemId"
              type="number"
              min="100"
              max="200"
              onChange={this.handleChange}
              value={itemWidth}
            />
          </div>
          <div className="input-container__item">
            <label htmlFor="frameSizeId">frame-size</label>
            <input
              name={`${frameSize}`}
              id="frameSizeId"
              type="number"
              min="1"
              max="10"
              onChange={this.handleChange}
              value={frameSize}
            />
          </div>
          <div className="input-container__item">
            <label htmlFor="stepId">step</label>
            <input
              name={`${step}`}
              id="stepId"
              type="number"
              min="1"
              max="5"
              onChange={this.handleChange}
              value={step}
            />
          </div>
          <div className="input-container__item">
            <label htmlFor="animationDurationId">animation-duration</label>
            <input
              name={`${animationDuration}`}
              id="animationDurationId"
              type="number"
              min="100"
              max="5000"
              step="100"
              onChange={this.handleChange}
              value={animationDuration}
            />
          </div>
          <div className="input-container__item">
            <label htmlFor="infiniteId">Infinite</label>
            <input
              name={`${infinite}`}
              id="infiniteId"
              type="checkbox"
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
