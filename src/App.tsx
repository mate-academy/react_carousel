import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
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
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <div className="content">
          <h1 className="content__title" data-cy="title">
            Carousel
          </h1>
          <form action="" className="settingsForm">
            <label htmlFor="itemId">Item Width</label>
            <input
              className="settingsForm__input"
              value={itemWidth}
              id="itemId"
              onChange={el =>
                this.setState({ itemWidth: Number(el.target.value) })
              }
              name="itemWidth"
              type="number"
            />
            <label htmlFor="frameId"> Frame Size</label>
            <input
              className="settingsForm__input"
              value={frameSize}
              id="frameId"
              onChange={el =>
                this.setState({ frameSize: Number(el.target.value) })
              }
              name="frameSize"
              type="number"
            />
            <label htmlFor="stepId">Step</label>
            <input
              className="settingsForm__input"
              value={step}
              id="stepId"
              onChange={el => this.setState({ step: Number(el.target.value) })}
              name="step"
              type="number"
            />
            <label htmlFor="animationId">Animation Duration</label>
            <input
              className="settingsForm__input"
              value={animationDuration}
              id="animationId"
              onChange={el =>
                this.setState({ animationDuration: Number(el.target.value) })
              }
              name="animationDuration"
              type="number"
            />
          </form>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
