import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      key: keyof State,
    ) => {
      const value = Number(e.target.value);

      this.setState({ [key]: value } as unknown as Pick<State, keyof State>);
    };

    return (
      <>
        <div className="App">
          {/* eslint-disable-next-line */}
          <h1 className="title" data-cy="title">
            Carousel with {images.length} images
          </h1>

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
          />

          <form action="#" className="form">
            <label htmlFor="itemId" className="form__label">
              ItemWidth:
              <input
                id="itemId"
                type="number"
                name="itemWidth"
                value={itemWidth}
                onChange={e => handleInputChange(e, 'itemWidth')}
                className="form__input"
                min={130}
                max={300}
              />
            </label>

            <label htmlFor="frameId" className="form__label">
              FrameSize:
              <input
                id="frameId"
                type="number"
                name="frameSize"
                value={frameSize}
                onChange={e => handleInputChange(e, 'frameSize')}
                className="form__input"
                min={1}
                max={4}
              />
            </label>

            <label htmlFor="stepId" className="form__label">
              Step:
              <input
                id="stepId"
                type="number"
                name="step"
                value={step}
                onChange={e => handleInputChange(e, 'step')}
                className="form__input"
                min={1}
                max={10}
              />
            </label>

            <label htmlFor="animationDurationId" className="form__label">
              AnimationDuration:
              <input
                id="animationDurationId"
                type="number"
                name="animationDuration"
                value={animationDuration}
                onChange={e => handleInputChange(e, 'animationDuration')}
                className="form__input"
                min={0}
              />
            </label>
          </form>
        </div>
      </>
    );
  }
}
export default App;
