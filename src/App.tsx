import React from 'react';
import './App.scss';
import './Page/Page.scss';
import { Carousel } from './components/Carousel';
import { Carousel as State } from './types/Carousel';

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
    infinite: false,
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curentValue = Number(event.target.value);

    let newValue;

    switch (true) {
      case curentValue > 10:
        newValue = 10;
        break;
      case curentValue < 0:
        newValue = 0;
        break;

      default:
        newValue = curentValue;
        break;
    }

    this.setState({
      step: newValue,
    });
  };

  setItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curentValue = Number(event.target.value);

    let newValue;

    switch (true) {
      case curentValue > 1300:
        newValue = 1300;
        break;
      case curentValue < 130:
        newValue = 130;
        break;

      default:
        newValue = curentValue;
        break;
    }

    this.setState({
      itemWidth: newValue,
    });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curentValue = Number(event.target.value);

    let newValue;

    switch (true) {
      case curentValue > 10:
        newValue = 10;
        break;
      case curentValue < 1:
        newValue = 1;
        break;

      default:
        newValue = curentValue;
        break;
    }

    this.setState({
      frameSize: newValue,
    });
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curentValue = Number(event.target.value);

    let newValue;

    switch (true) {
      case curentValue > 10000:
        newValue = 10000;
        break;
      case curentValue < 500:
        newValue = 500;
        break;

      default:
        newValue = curentValue;
        break;
    }

    this.setState({
      animationDuration: newValue,
    });
  };

  setInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    this.setState({
      infinite: isChecked,
    });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App Page">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form
          action="#"
          method="post"
          className="Page__form"
        >
          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="stepId">
              {'Step '}
            </label>

            <input
              className="Page__input"
              id="stepId"
              type="number"
              defaultValue={step}
              onChange={(event) => this.setStep(event)}
              min="1"
              max="10"
            />
          </div>

          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="frameId">
              {'Frame Size '}
            </label>

            <input
              className="Page__input"
              id="frameId"
              type="number"
              defaultValue={frameSize}
              onChange={(event) => this.setFrameSize(event)}
              min="1"
              max="10"
            />
          </div>

          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="itemId">
              {'Item Width '}
            </label>

            <input
              className="Page__input"
              id="itemId"
              type="number"
              defaultValue={itemWidth}
              onChange={(event) => this.setItemWidth(event)}
              min="130"
              max="1300"
            />
          </div>

          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="Animation">
              {'Animation Duration '}
            </label>

            <input
              className="Page__input"
              id="Animation"
              type="number"
              defaultValue={animationDuration}
              onChange={(event) => this.setAnimationDuration(event)}
              min="500"
              max="10000"
            />
          </div>

          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="infinite">
              {'infinite '}
            </label>
            <input
              id="infinite"
              type="checkbox"
              onChange={(event) => this.setInfinite(event)}
            />
          </div>
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
