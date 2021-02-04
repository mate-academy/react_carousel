import React, { Component } from 'react';

import './Carousel.scss';

class CarouselSettings extends Component {
    state = {
      img: 130,
      step: 3,
      animation: 1000,
      frame: 3,
    };

    changeStep = (event) => {
      this.setState({ step: event.target.value });
      this.props.changeStep(event.target.value);
    };

    changeFrame = (event) => {
      this.setState({ frame: event.target.value });
      this.props.changeFrame(event.target.value);
    };

    changeImage = (event) => {
      this.setState({ img: event.target.value });
      this.props.changeImage(event.target.value);
    };

    changeAnimation = (event) => {
      this.setState({ animation: event.target.value });
      this.props.changeAnimation(event.target.value);
    };

    render() {
      const { img, step, animation, frame } = this.state;

      return (
        <div>
          <form className="form">
            <label className="form__lable">
              Step:
              <input
                name="step"
                className="form__input"
                type="number"
                value={step}
                min="1"
                max="10"
                onChange={this.changeStep}
              />
            </label>

            <lable className="form__lable">
              Frame size:
              <input
                name="frame"
                className="form__input"
                type="number"
                value={frame}
                max="8"
                min="1"
                onChange={this.changeFrame}
              />
            </lable>

            <lable className="form__lable">
              Image size:
              <input
                name="img"
                className="form__input"
                type="number"
                value={img}
                step="5"
                min="50"
                max="150"
                onChange={this.changeImage}
              />
            </lable>

            <lable className="form__lable">
              Animation duration:
              <input
                name="animation"
                className="form__input"
                type="number"
                value={animation}
                step="100"
                min="0"
                onChange={this.changeAnimation}
              />
            </lable>
          </form>
        </div>
      );
    }
}

export default CarouselSettings;
