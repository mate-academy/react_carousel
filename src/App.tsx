import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(event.currentTarget.value) });
  };

  changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(event.currentTarget.value) });
  };

  changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(event.currentTarget.value) });
  };

  changeAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: Number(event.currentTarget.value) });
  };

  changeInfinite = () => {
    this.setState(prevState => (
      { infinite: !prevState.infinite }
    ));
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
      <div className="App">
        <h1 className="title" data-cy="title">
          Carousel with
          {' '}
          <span className="title__num">{images.length}</span>
          {' '}
          images
        </h1>
        <div className="form">
          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />
          <div className="form__field">
            <div className="form__content">
              <label className="form__content--name" htmlFor="step">
                Step :
                {' '}
              </label>
              <input
                className="form__content--input"
                type="number"
                id="step"
                name="step"
                defaultValue={step}
                min={1}
                max={5}
                onChange={this.changeStep}
              />

            </div>

            <div className="form__content">
              <label className="form__content--name" htmlFor="frameSize">
                Frame size :
                {' '}
              </label>
              <input
                className="form__content--input"
                type="number"
                name="frameSize"
                id="frameSize"
                defaultValue={frameSize}
                min={1}
                max={10}
                onChange={this.changeFrameSize}
              />
            </div>

            <div className="form__content">
              <label className="form__content--name" htmlFor="itemWidth">
                Item width :
                {' '}
              </label>
              <input
                className="form__content--input"
                type="number"
                name="itemWidth"
                id="itemWidth"
                defaultValue={itemWidth}
                min={50}
                max={300}
                onChange={this.changeItemWidth}
              />
            </div>

            <div className="form__content">
              <label
                className="form__content--name"
                htmlFor="animationDuration"
              >
                Animtion duration :
                {' '}
              </label>
              <input
                className="form__content--input"
                type="number"
                name="animationDuration"
                id="animationDuration"
                defaultValue={animationDuration}
                min={0}
                max={5000}
                step={100}
                onChange={this.changeAnimationDuration}
              />
            </div>

            <div className="form__content">
              <label
                className="form__content--name"
                htmlFor="infinite"
              >
                Infinite :
                {' '}
              </label>
              <input
                className="form__content--checkbox"
                type="checkbox"
                name="infinite"
                id="infinite"
                onChange={this.changeInfinite}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
