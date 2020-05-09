import React from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';

class Carousel extends React.PureComponent {
  state = {
    tempImageSize: '',
    tempImageQty: '',
    defaultSize: 130,
    defaultQty: 3,
    size: 0,
    qty: 0,
    move: 0,
  }

  handleInputSize = (event) => {
    this.setState({ tempImageSize: +event.target.value });
  }

  handleInputQty = (event) => {
    this.setState({ tempImageQty: +event.target.value });
  }

  resetState = () => {
    this.setState(() => ({
      tempImageSize: '',
      tempImageQty: '',
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.tempImageSize > 0
    && this.state.tempImageQty > 0
    && this.state.tempImageQty <= this.props.images.length
      ? this.setState(state => ({
        size: state.tempImageSize,
        qty: state.tempImageQty,
      })) : this.setState(state => ({
        size: state.defaultSize,
        qty: state.defaultQty,
      }));
    this.resetState();
  }

  checkSize = () => (
    this.state.size === 0
      ? `${this.state.defaultSize}px`
      : `${this.state.size}px`
  )

  checkWidth = () => (
    this.state.qty === 0
      ? `${this.state.defaultSize * this.state.defaultQty}px`
      : `${this.state.qty * this.state.size}px`
  )

  moveFwdCustom = () => {
    (this.state.size
    * this.props.images.length
    - this.state.move
    - this.state.size
    * this.state.qty < this.state.size * this.state.qty
      ? this.setState(state => ({
        move: state.move + state.size
          * this.props.images.length
          - state.move
          - state.size
          * state.qty,
      }))
      : this.setState(state => ({
        move: state.move + (state.size * state.qty),
      })));
  }

  moveFwdDefault = () => {
    (this.state.defaultSize
    * this.props.images.length
    - this.state.move
    - this.state.defaultSize
    * this.state.defaultQty < this.state.defaultSize * this.state.defaultQty
      ? this.setState(state => ({
        move: state.move + state.defaultSize
          * this.props.images.length
          - state.move
          - state.defaultSize
          * state.defaultQty,
      }))
      : this.setState(state => ({
        move: state.move + (state.defaultSize * state.defaultQty),
      })));
  }

  moveRevCustom = () => {
    (this.state.move < this.state.size * this.state.qty
      ? this.setState(state => ({
        move: 0,
      }))
      : this.setState(state => ({
        move: state.move - (state.size * state.qty),
      })));
  }

  moveRevDefault = () => {
    (this.state.move < this.state.defaultSize * this.state.defaultQty
      ? this.setState(state => ({
        move: 0,
      }))
      : this.setState(state => ({
        move: state.move - (state.defaultSize * state.defaultQty),
      })));
  }

  defineMoveControl = () => (
    this.state.size * this.state.qty < 286
      ? 0
      : `${(this.state.size * this.state.qty - 286) / 2}px`
  )

  handleNextButton = () => {
    this.state.size > 0 && this.state.qty > 0
      ? this.moveFwdCustom()
      : this.moveFwdDefault();
  }

  handlePrevButton = () => {
    this.state.size > 0 && this.state.qty > 0
      ? this.moveRevCustom()
      : this.moveRevDefault();
  }

  moveControl = () => (
    this.state.size === 0
      ? '52px'
      : this.defineMoveControl()
  )

  render() {
    return (
      <div className="carousel">
        <h1
          style={{ left: this.moveControl() }}
          className="header"
        >
          Carousel with
          {' '}
          {this.props.images.length}
          {' '}
          images
        </h1>
        <ul
          style={{ width: this.checkWidth() }}
          className="carousel__list"
        >
          {this.props.images.map((img, index) => (
            <li
              key={+index}
              className="carousel__list_item"
              style={{ right: `${this.state.move}px` }}
            >
              <img
                style={{ width: this.checkSize() }}
                className="carousel__list_image"
                src={img}
                alt={index + 1}
              />
            </li>
          ))}
        </ul>
        <div
          className="control"
          style={{ left: this.moveControl() }}
        >
          <button
            className="control__button"
            type="button"
            onClick={this.handlePrevButton}
          >
            &larr;
          </button>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                className="control__input"
                value={this.state.tempImageSize}
                onChange={this.handleInputSize}
                placeholder="Enter icon size in 'px'"
              />
            </form>
            <form onSubmit={this.handleSubmit}>
              <input
                className="control__input"
                value={this.state.tempImageQty}
                onChange={this.handleInputQty}
                placeholder="Enter q-ty of icons shown"
              />
            </form>
          </div>
          <button
            className="control__button"
            type="button"
            onClick={this.handleNextButton}
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};
