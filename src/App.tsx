import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Sizes } from './types/Sizes';

type State = Sizes & {
  images: string[];
};

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
    step: 4,
    animationDuration: 1000,
    infinite: false,
  };

  submitChanges = (event: {
    preventDefault: () => void;
    target: { name: string; value: string; };
  }) => {
    event.preventDefault();
    const { value } = event.target;
    const targetName = event.target.name;
    let flag = false;

    switch (targetName) {
      case 'itemWidth':
        this.setState({ itemWidth: +value });
        break;

      case 'frameSize':
        this.setState({ frameSize: +value });
        break;

      case 'step':
        this.setState({ step: +value });
        break;

      case 'animationDuration':
        this.setState({ animationDuration: +value });
        break;

      case 'infinite':

        if (value === 'true') {
          flag = true;
        }

        this.setState({ infinite: flag });
        break;

      default:
        break;
    }
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

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          method="get"
          className="controlls"
        >
          Change properties:
          <label>
            <input
              name="itemWidth"
              type="number"
              min="20"
              placeholder="Images Width (px)"
              defaultValue={itemWidth}
              required
              className="controlls__input"
              onChange={this.submitChanges}
            />
          </label>

          <label>
            <input
              name="frameSize"
              type="number"
              min="1"
              max={images.length}
              placeholder="Frame Size"
              defaultValue={frameSize}
              required
              className="controlls__input"
              onChange={this.submitChanges}
            />
          </label>

          <label>
            <input
              name="step"
              type="number"
              min="1"
              max={images.length}
              placeholder="Scroll Step"
              defaultValue={step}
              required
              className="controlls__input"
              onChange={this.submitChanges}
            />
          </label>

          <label>
            <input
              name="animationDuration"
              type="number"
              placeholder="Animation Duration (ms)"
              defaultValue={animationDuration}
              required
              className="controlls__input"
              onChange={this.submitChanges}
            />
          </label>

          <label>
            <select
              name="infinite"
              defaultValue="Choose option"
              required
              className="controlls__input"
              onChange={this.submitChanges}
            >
              <option disabled>Choose option</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default App;
