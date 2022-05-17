import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  itemWidth: number
  step: number,
  frameSize: number,
  delay: number
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
    itemWidth: 160,
    step: 3,
    frameSize: 3,
    delay: 1000,
  };

  maxValueOfTrans = () => {
    const { images, frameSize } = this.state;

    return -(images.length - frameSize) * 100;
  };

  render() {
    const {
      images, itemWidth, frameSize, step, delay,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>
        W/H:
        {'  '}
        <input
          type="number"
          defaultValue={130}
          onChange={({ target }) => (
              this.setState({ itemWidth: +(target.value) })
            )
          }
        />
        <br />
        Framesize:
        {'  '}
        <input
          type="number"
          defaultValue={3}
          onChange={({ target }) => (
              this.setState({ frameSize: +(target.value) })
            )
          }
        />
        <br />
        Step:
        {'  '}
        <input
          type="number"
          defaultValue={3}
          onChange={({ target }) => (
              this.setState({ step: +(target.value) })
            )
          }
        />
        <br />
        Delay:
        {'  '}
        <input
          type="number"
          defaultValue={1000}
          onChange={({ target }) => (
              this.setState({ delay: +(target.value) })
            )
          }
        />

        <Carousel
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          images={images}
          delay={delay}
          maxValue={this.maxValueOfTrans()}
        />
      </div>
    );
  }
}

export default App;
