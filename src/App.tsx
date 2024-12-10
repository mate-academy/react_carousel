import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) : value;

    if (name === 'infinite') {
      this.setState({ infinite: (e.target as HTMLInputElement).checked });
    } else if (
      name === 'itemWidth' ||
      name === 'frameSize' ||
      name === 'step' ||
      name === 'animationDuration'
    ) {
      if (!isNaN(parsedValue as number)) {
        this.setState({
          [name]: parsedValue,
        } as Pick<State, 'itemWidth' | 'frameSize' | 'step' | 'animationDuration'>);
      }
    }
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="inputs">
          <label htmlFor="itemWidthId">
            Enter width
            <input
              id="itemWidthId"
              className="itemWidth"
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="frameSizeId">
            Enter size of frame
            <input
              id="frameSizeId"
              className="frameSize"
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="stepId">
            Enter step
            <input
              id="stepId"
              className="step"
              type="number"
              name="step"
              value={step}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="animationDurationId">
            Enter duration of animation
            <input
              id="animationDurationId"
              className="animationDuration"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
