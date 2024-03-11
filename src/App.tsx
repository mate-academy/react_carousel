import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  step: number;
  aDuration: number;
  frameSize: number;
  isChecked: boolean;
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
    isChecked: false,
  };

  render() {
    const { images, itemWidth, aDuration, step, frameSize, isChecked } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__container-configuration">
          Item width:
          <input
            className="App__input"
            defaultValue={130}
            min={0}
            max={500}
            step={10}
            type="number"
            onChange={(e: Element) =>
              this.setState({ itemWidth: +e.target.value })
            }
          />
          Animation Duration:
          <input
            className="App__input"
            type="number"
            min={0}
            step={100}
            defaultValue={1000}
            onChange={(e: Element) =>
              this.setState({ aDuration: +e.target.value })
            }
          />
          Frame size:
          <input
            className="App__input"
            defaultValue={3}
            min={0}
            max={images.length}
            step={1}
            type="number"
            onChange={(e: Element) =>
              this.setState({ frameSize: +e.target.value })
            }
          />
          Step:
          <input
            className="App__input"
            type="number"
            min={1}
            max={images.length - frameSize}
            step={1}
            defaultValue={3}
            onChange={(e: Element) => this.setState({ step: +e.target.value })}
          />
          <label className="Carousel_field">
            <input
              className="App__input"
              type="checkbox"
              checked={isChecked}
              onChange={(e: Element) =>
                this.setState({ isChecked: e.target.checked })
              }
            />
            Infinite
          </label>
        </div>

        <Carousel
          img={images}
          itemWidth={itemWidth}
          duration={aDuration}
          step={step}
          frameSize={frameSize}
          isChecked={isChecked}
        />
      </div>
    );
  }
}

export default App;
