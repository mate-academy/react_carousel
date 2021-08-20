import React from 'react';
import Carousel from './Carousel';

import './CarouselBlock.scss';

class CarouselBlock extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.state = {
      images: this.props.images,
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      infinite: false,
    };
  }

  onChangeInput(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

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
      <>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="controlUnit">
          <h2 className="title">Сarousel settings</h2>
          <div className="inputBox">
            <p className="inputText">Step:</p>
            <input
              className="input"
              type="number"
              name="step"
              value={step}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="inputBox">
            <p className="inputText">Frame size:</p>
            <input
              className="input"
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="inputBox">
            <p className="inputText">Image width:</p>
            <input
              className="input"
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="inputBox">
            <p className="inputText">Animation duration:</p>
            <input
              className="input"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="inputBox">
            <p className="inputText">Infinite calousel:</p>
            <input
              className="input"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.onChangeInput}
            />
          </div>
        </div>
      </>
    );
  }
}

export default CarouselBlock;
