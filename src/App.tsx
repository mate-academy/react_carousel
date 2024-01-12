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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    const changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);

      this.setState({ itemWidth: newValue });
    };

    const changeFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);

      this.setState({ frameSize: newValue });
    };

    const changeStep = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStep = Number(e.target.value);

      this.setState({ step: newStep });
    };

    const changeAnimation = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAnime = Number(e.target.value);

      this.setState({ animationDuration: newAnime });
    };

    return (
      <div className="App">
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="App__labels">
          <label className="App__input">
            Item Width:
            <input
              type="number"
              value={itemWidth}
              onChange={changeWidth}
              style={{
                marginTop: '10px',
              }}
            />
          </label>

          <label className="App__input">
            Frame Size:
            <input
              type="number"
              value={frameSize}
              onChange={changeFrameSize}
              style={{
                marginTop: '10px',
              }}
            />
          </label>

          <label className="App__input">
            Step:
            <input
              type="number"
              value={step}
              onChange={changeStep}
              style={{
                marginTop: '10px',
              }}
            />
          </label>

          <label className="App__input">
            Animation Duration:
            <input
              type="number"
              value={animationDuration}
              onChange={changeAnimation}
              style={{
                marginTop: '10px',
              }}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
