import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  step: number;
  aDuration: number;
  frameSize: number;
}

type Element = React.ChangeEvent<HTMLInputElement>;

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
    aDuration: 1000,
    step: 3,
    frameSize: 3,
  };

  render() {
    const { images, itemWidth, aDuration, step, frameSize } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__container-configuration">
          Item width
          <input
            className="App__input"
            defaultValue={130}
            onChange={(e: Element) =>
              this.setState({ itemWidth: +e.target.value })
            }
          />
          Animation Duration
          <input
            className="App__input"
            defaultValue={1000}
            onChange={(e: Element) =>
              this.setState({ aDuration: +e.target.value })
            }
          />
          Frame size
          <input
            className="App__input"
            defaultValue={3}
            onChange={(e: Element) =>
              this.setState({ frameSize: +e.target.value })
            }
          />
          Step
          <input
            className="App__input"
            defaultValue={3}
            onChange={(e: Element) => this.setState({ step: +e.target.value })}
          />
        </div>

        <Carousel
          img={images}
          itemWidth={itemWidth}
          duration={aDuration}
          step={step}
          frameSize={frameSize}
        />
      </div>
    );
  }
}

export default App;
