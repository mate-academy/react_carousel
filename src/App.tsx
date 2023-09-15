import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  aimationDuration: number,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    aimationDuration: 1000,
    infinite: false,
  };

  submitHandler = (e: any) => {
    e.preventDefault();
    const inputsArr = e.target || null;
    const inputs = [...inputsArr];
    const ul = document.querySelector<HTMLElement>('.Carousel__list');
    const btnPrevQuery = document
      .querySelector('.Carousel__button-Prev');
    const btnNextQuery = document
      .querySelector('.Carousel__button-Next');

    const [itemWidth, frameSize, step, aimationDuration, infinite] = inputs;

    let correctCarouselWidth = 0;

    if (window.innerWidth - 80 < +itemWidth.value * +frameSize.value) {
      correctCarouselWidth = Math.floor(
        (window.innerWidth - 80) / +frameSize.value,
      );
      itemWidth.value = correctCarouselWidth;

      return;
    }

    if (!itemWidth.value.trim().length) {
      this.setState({ itemWidth: 130 });
      itemWidth.value = 130;
    } else {
      this.setState({ itemWidth: +(itemWidth.value) });
    }

    if (!frameSize.value.trim().length) {
      this.setState({ frameSize: 3 });
      frameSize.value = 3;
    } else {
      this.setState({ frameSize: +(frameSize.value) });
    }

    if (!step.value.trim().length) {
      this.setState({ step: 3 });
      step.value = 3;
    } else {
      this.setState({ step: +(step.value) });
    }

    if (!aimationDuration.value.trim().length) {
      this.setState({ aimationDuration: 1000 });
      aimationDuration.value = 1000;
    } else {
      this.setState({ aimationDuration: +(aimationDuration.value) });
    }

    this.setState({ infinite: infinite.checked });

    if (ul) {
      ul.style.transform = 'translateX(0)';
      (btnPrevQuery as HTMLInputElement).disabled = false;
      (btnNextQuery as HTMLInputElement).disabled = false;
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      aimationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          aimationDuration={aimationDuration}
          infinite={infinite}
        />
        <form
          action="submit"
          className="Inputs"
          onSubmit={this.submitHandler}
        >
          <label
            className="Inputs__input"
          >
            Enter image width
            <input
              defaultValue={130}
              type="number"
              min={50}
            />
          </label>
          <label
            className="Inputs__input"
          >
            Enter frame size
            <input
              defaultValue={3}
              type="number"
              min={1}
              max={images.length}
            />
          </label>
          <label
            className="Inputs__input"
          >
            Entre scroll steps
            <input
              defaultValue={3}
              type="number"
              min={1}
              max={images.length}
            />
          </label>
          <label
            className="Inputs__input"
          >
            Enter animation duration in ms
            <input
              defaultValue={1000}
              type="number"
              min={0}
            />
          </label>
          <label
            className="Inputs__input Inputs__input-checkbox"
          >
            Check for infinite loop
            <input
              type="checkbox"
            />
          </label>
          <input
            className="Inputs__button"
            type="submit"
            name="button"
            value="submit"
          />
        </form>
      </div>
    );
  }
}

export default App;
