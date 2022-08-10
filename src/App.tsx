import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

  componentDidMount() {
    document.querySelectorAll('.form__input')
      .forEach(inputElement => inputElement
        .addEventListener('input', this.input));
  }

  componentWillUnmount() {
    document.querySelectorAll('.form__input')
      .forEach(inputElement => inputElement
        .removeEventListener('input', this.input));
  }

  input = (inputEvent: Event) => {
    const { target } = inputEvent;
    const imagesLength = this.state.images.length;

    if (!target || !(target instanceof HTMLInputElement)) {
      return;
    }

    switch (true) {
      case target.classList.contains('form__itemWidth'):
        this.setState({
          itemWidth: Math.min(Math.max(+target.value, 80), 200),
        });

        target.value = this.state.itemWidth.toString();

        break;
      case target.classList.contains('form__frameSize'):
        this.setState({
          frameSize: Math.min(Math.max(+target.value, 1), imagesLength),
        });

        target.value = this.state.frameSize.toString();

        break;
      case target.classList.contains('form__step'):
        this.setState({ step: Math.max(+target.value, 1) });

        target.value = this.state.step.toString();

        break;
      case target.classList.contains('form__animationDuration'):
        this.setState({ animationDuration: Math.max(+target.value, 0) });

        target.value = this.state.animationDuration.toString();

        break;
      case target.classList.contains('form__infinite'):
        this.setState({ infinite: target.checked });

        break;
      default:
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
      <div className="App level">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="title level-item">Carousel with {images.length} images</h1>

        <form
          action="/"
          method="post"
          className="form level-item"
        >
          <div className="form__columns">
            <div className="form__column">
              <label className="form__label">
                Item width

                <input
                  type="number"
                  className="form__itemWidth input form__input"
                  defaultValue={itemWidth}
                  min={80}
                  max={200}
                />
              </label>

              <label className="form__label">
                Frame size

                <input
                  type="number"
                  className="form__frameSize input form__input"
                  defaultValue={frameSize}
                  min={1}
                  max={images.length}
                />
              </label>
            </div>
            <div className="form__column">
              <label className="form__label">
                Step

                <input
                  type="number"
                  className="form__step input form__input"
                  defaultValue={step}
                  min={1}
                />
              </label>

              <label className="form__label">
                Animation duration

                <input
                  type="number"
                  className="form__animationDuration input form__input"
                  defaultValue={animationDuration}
                  min={0}
                />
              </label>
            </div>
          </div>

          <label className="form__label">
            Infinite

            <input
              type="checkbox"
              className="form__infinite checkbox form__input"
              defaultChecked={infinite}
            />
          </label>
        </form>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
