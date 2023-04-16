import './Carousel.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Component } from 'react';

interface Props {
  images: string[];
}

interface State {
  smileWidth: number;
  amountOfSmiles: number;
  step: number;
  speedOfAnimation: number;
  infinite: boolean;
}

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    smileWidth: 130,
    amountOfSmiles: 2,
    step: 3,
    speedOfAnimation: 1000,
    infinite: false,
  };

  updateState = <K extends keyof State>(key: K, value: number | boolean) => {
    this.setState({ [key]: value } as Pick<State, K>);
  };

  renderInputField = (
    label: string,
    name: string,
    value: number | boolean,
    min?: number,
    max?: number,
  ) => {
    const determineInputType = (choice: string) => {
      return typeof value === 'number' ? choice : 'checkbox';
    };

    return (
      <label htmlFor={name} className="control-panel__label">
        {label}
        <input
          type={determineInputType('number')}
          name={name}
          value={value.toString()}
          min={min}
          max={max}
          onChange={(e) => {
            const parsedValue = typeof value === 'number'
              ? +e.target.value
              : e.target.checked;

            this.updateState(name as keyof State, parsedValue);
          }}
          className={`control-panel__${determineInputType('input')}`}
        />
      </label>
    );
  };

  render() {
    const {
      smileWidth, amountOfSmiles, step, speedOfAnimation, infinite,
    } = this.state;
    const { images } = this.props;

    const settings = {
      infinite,
      speed: speedOfAnimation,
      slidesToShow: amountOfSmiles,
      slidesToScroll: step,
    };

    return (
      <div className="carousel">
        <ul
          className="carousel__frame"
          style={{
            width: amountOfSmiles * smileWidth,
          }}
        >
          <Slider {...settings}>
            {images.map(image => {
              return (
                <li key={image} className="img">
                  <img
                    src={image}
                    style={{ width: `${smileWidth}px` }}
                    alt="smile"
                  />
                </li>
              );
            })}
          </Slider>
        </ul>

        <div className="control-panel">
          {this.renderInputField(
            'Item width',
            'smileWidth',
            smileWidth,
            130,
          )}

          {this.renderInputField(
            'Frame size',
            'amountOfSmiles',
            amountOfSmiles,
            1,
            10,
          )}

          {this.renderInputField(
            'Step',
            'step',
            step,
            1,
            10,
          )}

          {this.renderInputField(
            'Speed of an animation',
            'speedOfAnimation',
            speedOfAnimation,
            1,
          )}

          {this.renderInputField(
            'Infinite',
            'infinite',
            infinite,
          )}
        </div>
      </div>
    );
  }
}

export default Carousel;
