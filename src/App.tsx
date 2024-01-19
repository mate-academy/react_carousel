import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
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

    const onChangeImages = (
      prevState: State,
      ev: React.ChangeEvent<HTMLInputElement>,
    ) => {
      this.setState({
        ...prevState,
        [ev.target.name]: +ev.target.value,
      });
    };

    return (
      <div className="App">

        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form action="" className="App__form">
          <fieldset className="App__fieldset">
            <legend>Settings:</legend>
            <label htmlFor="itemWidth" className="App__form-item">
              Image size
              <input
                type="number"
                name="itemWidth"
                id="itemWidth"
                value={itemWidth}
                min={50}
                max={250}
                step={5}
                onChange={(ev) => onChangeImages(this.state, ev)}
              />
            </label>
            <label htmlFor="frameSize" className="App__form-item">
              Frame size
              <input
                type="number"
                name="frameSize"
                id="frameSize"
                value={frameSize}
                min={1}
                max={10}
                onChange={(ev) => onChangeImages(this.state, ev)}
              />
            </label>
            <label htmlFor="step" className="App__form-item">
              Step
              <input
                type="number"
                name="step"
                id="step"
                value={step}
                min={1}
                max={7}
                onChange={(ev) => onChangeImages(this.state, ev)}
              />
            </label>
            <label htmlFor="animationDuration" className="App__form-item">
              Animation duration
              <input
                type="number"
                name="animationDuration"
                id="animationDuration"
                value={animationDuration}
                min={700}
                max={3000}
                step={10}
                onChange={(ev) => onChangeImages(this.state, ev)}
              />
            </label>
            <label htmlFor="infinite" className="App__form-item">
              Infinite
              <input
                type="checkbox"
                name="infinite"
                id="infinite"
                onChange={
                  () => this.setState({ infinite: !infinite })
                }
              />
            </label>
          </fieldset>
        </form>

      </div>
    );
  }
}

export default App;
