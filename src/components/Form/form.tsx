import { Component } from 'react';
import { Carousel } from '../Carousel';
import './Form.scss';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

export class Form extends Component<{}, State> {
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.currentTarget;
    const correctValue = name === 'infinite' ? checked : value;

    return this.setState((prevState) => ({
      ...prevState,
      [name]: +correctValue,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize, step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <form className="form" id="formId">
          <div className="form__container">
            <label htmlFor="itemId">
              <strong>Item width: </strong>
              <input
                type="number"
                name="itemWidth"
                defaultValue="130"
                id="itemId"
                step="10"
                onChange={this.handleChange}
                className="form__input"
              />
            </label>

            <label htmlFor="frameId">
              <strong>Frame size </strong>
              <input
                type="number"
                name="frameSize"
                defaultValue="3"
                min="1"
                max={images.length}
                onChange={this.handleChange}
                id="frameId"
                className="form__input"
              />
            </label>

            <label htmlFor="stepId">
              <strong>Step: </strong>
              <input
                type="number"
                name="step"
                defaultValue="3"
                min="1"
                onChange={this.handleChange}
                id="stepId"
                className="form__input"
              />
            </label>

            <label>
              <strong>Animation duration: </strong>
              <input
                type="number"
                name="animationDuration"
                defaultValue="1000"
                min={1000}
                max={10000}
                step={500}
                onChange={this.handleChange}
                className="form__input"
              />
            </label>

            <div className="form__radio-input">
              <strong>Infinite: </strong>
              <label>
                True
                <input
                  type="checkbox"
                  value="true"
                  name="infinite"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
        </form>
      </>
    );
  }
}
