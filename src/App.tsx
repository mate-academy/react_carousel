import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  isInfinite: boolean;
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
    isInfinite: false,
  };

  componentDidMount() {
    const buttons: NodeListOf<HTMLButtonElement> | []
      = document.querySelectorAll('.Carousel__button');

    if (!buttons) {
      return;
    }

    buttons.forEach(button => button.addEventListener('click', () => {
      this.setState({ isInfinite: true });
    }));
  }

  setStep = () => {
    const stepValue: HTMLInputElement | null
      = document.querySelector('#stepId');

    if (!stepValue) {
      return;
    }

    this.setState({ step: Number(stepValue.value) });
  };

  setFrameSize = () => {
    const frameSizeValue: HTMLInputElement | null
      = document.querySelector('#frameId');

    if (!frameSizeValue) {
      return;
    }

    this.setState({ frameSize: Number(frameSizeValue.value) });
  };

  setItemWidth = () => {
    const itemWidthValue: HTMLInputElement | null
      = document.querySelector('#itemId');

    if (!itemWidthValue) {
      return;
    }

    this.setState({ itemWidth: Number(itemWidthValue.value) });
  };

  setAnimationDuration = () => {
    const animationDurationValue: HTMLInputElement | null
      = document.querySelector('#AnimationDuration');

    if (!animationDurationValue) {
      return;
    }

    this.setState({ animationDuration: Number(animationDurationValue.value) });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      isInfinite,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title" data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="App__inputs">
          <div className="App__inputs-wrap">
            <label
              className="App__inputs-label"
              htmlFor="itemId"
            >
              ItemWidth:
            </label>

            <input
              className="App__inputs-input"
              type="number"
              name="ItemWidth"
              id="itemId"
              defaultValue={130}
              min="1"
              onChange={this.setItemWidth}
            />

            <label
              className="App__inputs-label"
              htmlFor="frameId"
            >
              FrameSize:
            </label>

            <input
              className="App__inputs-input"
              type="number"
              name="FrameSize"
              id="frameId"
              min="1"
              defaultValue={3}
              onChange={this.setFrameSize}
            />
          </div>

          <div className="App__inputs-wrap">
            <label className="App__inputs-label" htmlFor="stepId">Step: </label>
            <input
              className="App__inputs-input"
              type="number"
              name="Step"
              id="stepId"
              min="1"
              defaultValue={3}
              onChange={this.setStep}
            />
            <label
              className="App__inputs-label"
              htmlFor="AnimationDuration"
            >
              AnimationDuration:
            </label>
            <input
              className="App__inputs-input"
              type="number"
              name="AnimationDuration"
              id="AnimationDuration"
              defaultValue={1000}
              onChange={this.setAnimationDuration}
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          isInfinite={isInfinite}
        />
      </div>
    );
  }
}

export default App;
