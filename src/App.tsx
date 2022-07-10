import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  userNumInputs: {
    step: number,
    frameSize: number,
    itemWidth: number,
    animationDuration: number,
  },
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
    userNumInputs: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
    },
    infinite: false,
  };

  numInputHandler(value: string, key: string) {
    return this.setState((prev) => ({
      userNumInputs: {
        ...prev.userNumInputs,
        [key]: +value,
      },
    }));
  }

  checkboxHandler() {
    return this.setState(prev => ({ infinite: !prev.infinite }));
  }

  render() {
    const {
      images,
      userNumInputs,
      infinite,
    } = this.state;

    function chooseStep(key: string): number {
      switch (key) {
        case 'itemWidth':
          return 10;
        case 'animationDuration':
          return 100;
        default:
          return 1;
      }
    }

    return (
      <div className="app">
        {/* eslint-disable-next-line */}
        <h1 className="app__title" data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={userNumInputs.step}
          frameSize={userNumInputs.frameSize}
          itemWidth={userNumInputs.itemWidth}
          animationDuration={userNumInputs.animationDuration}
          infinite={infinite}
        />

        <form className="app__form">
          {(Object.keys(userNumInputs) as (keyof typeof userNumInputs)[])
            .map(key => (
              <label key={key}>
                {`${key.split(/(?=[A-Z])/).join(' ').toUpperCase()}: `}
                <input
                  name="key"
                  type="number"
                  defaultValue={userNumInputs[key]}
                  onChange={
                    event => this.numInputHandler(event.target.value, key)
                  }
                  min={0}
                  step={chooseStep(key)}
                />
              </label>
            ))}

          <label>
            Infinite
            <input
              name="Infinite"
              type="checkbox"
              onChange={() => (this.checkboxHandler())}
            />
          </label>
        </form>

      </div>
    );
  }
}

export default App;
