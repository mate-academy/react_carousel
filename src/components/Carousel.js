import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.css';
import { Form } from './Form';

export class Carousel extends React.Component {
  state = {
    offset: 0,
    disabledNext: false,
    disabledPrev: !this.props.infinite,
    allImages: this.props.allImages,
    step: this.props.step,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    frameSize: this.props.frameSize,
  }

  updateData = ({ ...value }) => {
    this.setState({ offset: 0 });
    this.setState({ disabledNext: false });
    this.setState({
      frameSize: value.frameSize,
      step: value.step,
      itemWidth: value.itemWidth,
      animationDuration: value.animationDuration,
      infinite: value.infinite,
      disabledPrev: this.offset === 0 ? !value.infinite : false,
    });
  }

  goNext = () => {
    const maxOffset = -1 * (10 - this.state.frameSize) * this.state.itemWidth;
    const refOffset = this.state.offset;
    const refItemWidth = this.state.itemWidth;
    const refStep = this.state.step;

    if (this.state.infinite) {
      this.setState({ disabledPrev: false });
      if (this.state.offset === maxOffset) {
        this.setState({ offset: 0 });
      } else if (this.state.offset + -1 * refItemWidth * refStep < maxOffset) {
        this.setState({ offset: maxOffset });
      } else {
        this.setState({ offset: refOffset - refItemWidth * refStep });
      }
    } else {
      this.setState({ disabledPrev: false });
      if (this.state.offset + -1 * this.state.itemWidth * this.state.step
        <= maxOffset) {
        this.setState({ offset: maxOffset });
        this.setState({ disabledNext: true });
      } else {
        this.setState({ offset: refOffset - refItemWidth * refStep });
      }
    }
  }

  goPrev = () => {
    const maxOffset = -1 * (10 - this.state.frameSize) * this.state.itemWidth;
    const refOffset = this.state.offset;
    const refItemWidth = this.state.itemWidth;
    const refStep = this.state.step;

    if (this.state.infinite) {
      this.setState({ disabledNext: false });
      if (refOffset === 0) {
        this.setState({ offset: maxOffset });
      } else if (refOffset + refItemWidth * refStep > 0) {
        this.setState({ offset: 0 });
      } else {
        this.setState({ offset: refOffset + refItemWidth * refStep });
      }
    } else {
      this.setState({ disabledNext: false });
      if (refOffset >= -1 * (refItemWidth * refStep)) {
        this.setState({ offset: 0 });
        this.setState({ disabledPrev: true });
      } else {
        this.setState({ offset: refOffset + refItemWidth * refStep });
      }
    }
  }

  render() {
    return (
      <div className="Carousel">
        <Form
          {...this.props}
          updateData={this.updateData}
        />
        <div
          className="Page"
          style={{ width: this.state.itemWidth * this.state.frameSize }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${this.state.offset}px)`,
              transition: `${this.state.animationDuration}ms`,
            }}
          >
            {this.state.allImages.map(item => (
              <li key={this.state.allImages.indexOf(item)}>
                <img
                  style={{ width: `${this.state.itemWidth}px` }}
                  src={item}
                  alt={this.state.allImages.indexOf(item)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          <button
            className="button is-success is-rounded"
            disabled={this.state.disabledPrev}
            type="button"
            onClick={() => this.goPrev()}
          >
            Prev
          </button>
          <button
            className="button is-success is-rounded"
            disabled={this.state.disabledNext}
            type="button"
            onClick={() => this.goNext()}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  allImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  frameSize: PropTypes.number.isRequired,
};
