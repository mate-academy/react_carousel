import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      [event.target.name]: +event.target.value,
    }));
  };

  render() {
    const {
      images,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>
        <form method="post" className="App__form">

          <label htmlFor="itemWidth" className="itemWidth">
            ITEM WIDTH:
            <input
              id="itemID"
              type="number"
              name="itemWidth"
              value={itemWidth}
              min={130}
              max={1300}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label htmlFor="framId" className="framSize">
            FRAME SIZE
            <input
              id="frameID"
              type="number"
              name="frameSize"
              value={frameSize}
              min={1}
              max={10}
              onChange={this.handleChange}
            />

          </label>

          <br />
          <label htmlFor="stepID" className="itemWidth">
            STEP:
            <input
              id="stepId"
              type="number"
              name="step"
              value={step}
              min={1}
              max={10}
              onChange={this.handleChange}
            />
          </label>

          <br />
          <label htmlFor="durationID" className="itemWidth">
            ANIMATION DURATION:
            <input
              id="durationID"
              type="number"
              name="animationDuration"
              value={animationDuration}
              min={100}
              max={1000000}
              step={100}
              onChange={this.handleChange}
            />
          </label>

          <br />
          <label htmlFor="infinitID" className="itemWidth">
            INFINITE
            <input
              type="checkbox"
              id="infineteID"
              name="infinite"
              onClick={() => {
                this.setState({
                  infinite: !infinite,
                });
              }}
            />
          </label>

        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
