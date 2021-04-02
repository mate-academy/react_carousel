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
      disabledPrev: !value.infinite,
    });
  }

  goNext = () => {
    const { offset, frameSize, step, itemWidth, infinite }
    = this.state;
    const maxOffset = -1 * (10 - frameSize) * itemWidth;

    if (infinite) {
      this.setState({ disabledPrev: false });
      if (offset === maxOffset) {
        this.setState({ offset: 0 });
      } else if (offset + -1 * itemWidth * step < maxOffset) {
        this.setState({ offset: maxOffset });
      } else {
        this.setState(state => (
          { offset: state.offset - state.itemWidth * state.step }
        ));
      }
    } else {
      this.setState({ disabledPrev: false });
      if (offset + -1 * itemWidth * step <= maxOffset) {
        this.setState({ offset: maxOffset });
        this.setState({ disabledNext: true });
      } else {
        this.setState(state => (
          { offset: state.offset - state.itemWidth * state.step }
        ));
      }
    }
  }

  goPrev = () => {
    const { offset, frameSize, step, itemWidth, infinite }
    = this.state;
    const maxOffset = -1 * (10 - frameSize) * itemWidth;

    if (infinite) {
      this.setState({ disabledNext: false });
      if (offset === 0) {
        this.setState({ offset: maxOffset });
      } else if (offset + itemWidth * step > 0) {
        this.setState({ offset: 0 });
      } else {
        this.setState(state => (
          { offset: state.offset + state.itemWidth * state.step }
        ));
      }
    } else {
      this.setState({ disabledNext: false });
      if (offset >= -1 * (itemWidth * step)) {
        this.setState({ offset: 0 });
        this.setState({ disabledPrev: true });
      } else {
        this.setState(state => (
          { offset: state.offset + state.itemWidth * state.step }
        ));
      }
    }
  }

  render() {
    const { offset, frameSize, itemWidth, animationDuration,
      allImages, disabledPrev, disabledNext }
      = this.state;

    return (
      <div className="Carousel">
        <Form
          {...this.props}
          updateData={this.updateData}
        />
        <div
          className="Page"
          style={{ width: itemWidth * frameSize }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${offset}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {allImages.map(item => (
              <li key={allImages.indexOf(item)}>
                <img
                  style={{ width: `${itemWidth}px` }}
                  src={item}
                  alt={allImages.indexOf(item)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          <button
            className="button is-success is-rounded"
            disabled={disabledPrev}
            type="button"
            onClick={() => this.goPrev()}
          >
            Prev
          </button>
          <button
            className="button is-success is-rounded"
            disabled={disabledNext}
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
