import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  ItemWidth: number;
  FrameSize: number;
  Step: number;
  AnimationDuration: number;
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
    ItemWidth: 130,
    FrameSize: 3,
    Step: 3,
    AnimationDuration: 1000,
  };

  render() {
    const {
      images,
      AnimationDuration,
      Step,
      FrameSize,
      ItemWidth,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title'>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={Step}
          animationDuration={AnimationDuration}
          frameSize={FrameSize}
          itemWidth={ItemWidth}
        />

        <form action="#" className="App__form">
          <label htmlFor="itemId">
            {'ItemWidth: '}
            <input
              id="itemId"
              type="number"
              name="itemWidth"
              className="App__input"
              min="100"
              defaultValue={ItemWidth}
              onChange={(event) => {
                this.setState({ ItemWidth: +event.target.value });
              }}
            />
          </label>

          <label htmlFor="frameId">
            {'FrameSize: '}
            <input
              id="frameId"
              type="number"
              name="FrameSize"
              className="App__input"
              min="1"
              defaultValue={FrameSize}
              onChange={(event) => {
                this.setState({ FrameSize: +event.target.value });
              }}
            />
          </label>

          <label htmlFor="stepId">
            {'Step: '}
            <input
              id="stepId"
              type="number"
              name="Step"
              className="App__input"
              min="1"
              defaultValue={Step}
              onChange={(event) => {
                this.setState({ Step: +event.target.value });
              }}
            />
          </label>

          <label>
            {'AnimationDuration: '}
            <input
              type="number"
              name="AnimationDuration"
              className="App__input"
              min="1"
              defaultValue={AnimationDuration}
              onChange={(event) => {
                this.setState({ AnimationDuration: +event.target.value });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
