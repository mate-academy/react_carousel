import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
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
  };

  render() {
    const { images } = this.state;

    const AppInternal: React.FC = () => {
      const [currentItemWidth, setCurrentItemWidth] = useState(130);
      const [currentFrameSize, setCurrentFrameSize] = useState(3);
      const [currentStep, setCurrentStep] = useState(3);
      const [currentAnimationDuration, setCurrentAnimationDuration] =
        useState(1000);
      const [isInfinite, setIsInfinite] = useState(false);

      return (
        <div className="App">
          {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

          <Carousel
            images={images}
            itemWidth={currentItemWidth}
            frameSize={currentFrameSize}
            step={currentStep}
            animationDuration={currentAnimationDuration}
            infinite={isInfinite}
          />

          <div className="inputs">
            <label htmlFor="itemId" className="label">
              Enter image width:
            </label>
            <input
              id="itemId"
              className="input"
              name="number"
              type="number"
              value={currentItemWidth}
              onChange={e => setCurrentItemWidth(Number(e.target.value))}
            ></input>

            <label htmlFor="frameId" className="label">
              Enter frame size:
            </label>
            <input
              id="frameId"
              className="input"
              name="number"
              type="number"
              value={currentFrameSize}
              onChange={e => setCurrentFrameSize(Number(e.target.value))}
            ></input>

            <label htmlFor="stepId" className="label">
              Enter step:
            </label>
            <input
              id="stepId"
              className="input"
              name="number"
              type="number"
              value={currentStep}
              onChange={e => setCurrentStep(Number(e.target.value))}
            ></input>

            <label htmlFor="animationDuration" className="label">
              Enter animation duration:
            </label>
            <input
              id="animationDuration"
              className="input"
              name="number"
              type="number"
              value={currentAnimationDuration}
              onChange={e =>
                setCurrentAnimationDuration(Number(e.target.value))
              }
            ></input>

            <div className="radio-buttons">
              <p>Should the carousel be infinite?</p>
              <input
                type="radio"
                name="beInfinite"
                value="yes"
                id="yes"
                onChange={() => setIsInfinite(true)}
              ></input>
              <label htmlFor="yes">Yes </label>
              <input
                type="radio"
                name="beInfinite"
                value="no"
                id="no"
                onChange={() => setIsInfinite(false)}
              ></input>
              <label htmlFor="no">No </label>
            </div>
          </div>
        </div>
      );
    };

    return <AppInternal />;
  }
}

export default App;
