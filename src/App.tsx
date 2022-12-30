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
    const curentValue = Number(event.currentTarget.value);

    switch (true) {
      case curentValue > 10:
        this.setState({ step: 10 });
        break;
      case curentValue < 0:
        this.setState({ step: 0 });
        break;

      default:
        this.setState({ step: curentValue });
        break;
    }
  };

  setItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curentValue = Number(event.currentTarget.value);

    switch (true) {
      case curentValue > 1300:
        this.setState({ itemWidth: 1300 });
        break;
      case curentValue < 0:
        this.setState({ itemWidth: 0 });
        break;

      default:
        this.setState({ itemWidth: curentValue });
        break;
    }
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curentValue = Number(event.currentTarget.value);

    switch (true) {
      case curentValue > 10:
        this.setState({ frameSize: 10 });
        break;
      case curentValue < 0:
        this.setState({ frameSize: 0 });
        break;

      default:
        this.setState({ frameSize: curentValue });
        break;
    }
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curentValue = Number(event.currentTarget.value);

    switch (true) {
      case curentValue > 10000:
        this.setState({ animationDuration: 10000 });
        break;
      case curentValue < 0:
        this.setState({ animationDuration: 0 });
        break;

      default:
        this.setState({ animationDuration: curentValue });
        break;
    }
  };

  setInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;

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
        <h1 className="Page__title" data-cy="title">Carousel with {images.length} images</h1>

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
              value={step}
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
              value={frameSize}
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
              value={itemWidth}
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
              value={animationDuration}
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
