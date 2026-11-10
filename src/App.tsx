import './App.scss';
import Carousel from './components/Carousel';
import React from 'react';

interface State {
  images: string[];
  inpStep: string;
  inpFrameSize: string;
  inpItemWidth: string;
  inpAnimDur: string;
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
    inpStep: '3',
    inpFrameSize: '3',
    inpItemWidth: '130',
    inpAnimDur: '1000',
  };

  render() {
    const { images, inpStep, inpFrameSize, inpItemWidth, inpAnimDur } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="stepId">Change number of steps</label>
        <input
          id="stepId"
          value={inpStep}
          type="number"
          min="1"
          onChange={event => this.setState({ inpStep: event.target.value })}
        />

        <label htmlFor="frameId">Change frame size</label>
        <input
          id="frameId"
          value={inpFrameSize}
          type="number"
          min="1"
          onChange={event =>
            this.setState({ inpFrameSize: event.target.value })
          }
        />

        <label htmlFor="itemId">Change item width</label>
        <input
          id="itemId"
          value={inpItemWidth}
          type="number"
          min="1"
          onChange={event =>
            this.setState({ inpItemWidth: event.target.value })
          }
        />

        <label htmlFor="animationId">Change animation duration</label>
        <input
          id="animationId"
          value={inpAnimDur}
          type="number"
          min="1"
          onChange={event => this.setState({ inpAnimDur: event.target.value })}
        />

        <Carousel
          images={images}
          step={+inpStep}
          frameSize={+inpFrameSize}
          itemWidth={+inpItemWidth}
          animationDuration={+inpAnimDur}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
