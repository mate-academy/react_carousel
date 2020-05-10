import React from 'react';
import './Carousel.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.animation = null;
  }

  state = {
    images: this.props.images,
    imageSize: 100,
    imageQty: 3,
    imagesToSlide: 1,
    moveSteps: 0,
    move: 0,
    infinite: false,
    animationInterval: 1000,
  }

  handleImageSize = (event) => {
    const newSize = +event.target.value;

    this.setState(state => ({
      imageSize: newSize,
      move: 0,
    }));
  }

  handleImageQty = (event) => {
    this.setState({ imageQty: +event.target.value });
  }

  defineCarouselWidth = () => (
    this.state.imageQty * this.state.imageSize
  )

  handleImagesToSlide = (event) => {
    this.setState({ imagesToSlide: +event.target.value });
  }

  defineFwdMoveStep = () => {
    (this.state.move + this.state.imageSize * this.state.imagesToSlide)
    > (this.props.images.length * this.state.imageSize
      - this.state.imageSize * this.state.imageQty)
      ? this.setState(state => ({
        move: state.move
          + ((state.images.length * state.imageSize) - state.move
            - (state.imageSize * state.imageQty)),
        moveSteps: state.moveSteps + 1,
      }))
      : this.setState(state => ({
        move: state.move + state.imageSize * state.imagesToSlide,
        moveSteps: state.moveSteps + 1,
      }));
  }

  defineRevMoveStep = () => {
    this.state.move - this.state.imageSize * this.state.imagesToSlide < 0
      ? this.setState(state => ({
        move: 0,
      }))
      : this.setState(state => ({
        move: state.move - state.imageSize * state.imagesToSlide,
      }));
  }

  handleNextClick = () => {
    this.state.move === this.props.images.length * this.state.imageSize
    - this.state.imageSize * this.state.imageQty
      ? this.setState({ move: 0 })
      : this.defineFwdMoveStep();
  }

  handlePrevClick = () => {
    this.state.move === 0 ? this.setState(state => ({
      move: this.props.images.length * state.imageSize
          - state.imageSize * state.imageQty,
    }))
      : this.defineRevMoveStep();
  }

  setAnimationInterval = (event) => {
    this.setState({ animationInterval: (+event.target.value) * 1000 });
  }

  defineAnimation = () => {
    !this.state.infinite
      ? this.animation = setInterval(() => {
        this.handleNextClick();
      }, this.state.animationInterval)
      : clearInterval(this.animation);
  }

  infiniteRotate = () => {
    this.setState(state => ({
      infinite: !state.infinite,
    }));
    this.defineAnimation();
  }

  render() {
    const { images,
      imageSize,
      imageQty,
      imagesToSlide,
      move,
      infinite,
      animationInterval } = this.state;

    return (
      <div className="carousel">
        <h1
          className="header"
        >
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>
        <div className="control">

          <button
            disabled={infinite}
            className="control__button"
            type="button"
            onClick={this.handlePrevClick}
          >
            &larr;
          </button>

          <div className="control__settings">
            <div className="control__settings_toggle">
              <span>Auto Mode</span>
              <span>   </span>
              <label className="switch">
                <input type="checkbox" onChange={this.infiniteRotate} />
                <span className="slider round" />
              </label>
            </div>

            <div
              className={cn(infinite
                ? 'control__settings_disabled'
                : 'control__settings_active')}
            >
              <div className="control__settings_element">
                <label htmlFor="animation__speed">Animation Speed</label>
                <select
                  id="animation__speed"
                  disabled={infinite}
                  onChange={this.setAnimationInterval}
                  value={animationInterval / 1000}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>

              </div>
              <div className="control__settings_element">
                <span>Adjust icons size</span>
                <input
                  className="element__slider"
                  disabled={infinite}
                  onChange={this.handleImageSize}
                  type="range"
                  defaultValue="100"
                  min="50"
                  max="200"
                />
              </div>
              <div className="control__settings_element">

                <label htmlFor="images_to_show">Images on slider</label>
                <select
                  disabled={infinite}
                  value={imageQty}
                  onChange={this.handleImageQty}
                  id="images_to_show"
                >

                  {images.map((el, index) => (
                    <option key={el}>{index + 1}</option>
                  ))}
                </select>
              </div>
              <div className="control__settings_element">

                <label htmlFor="images_to_move">Images to scroll</label>
                <select
                  disabled={infinite}
                  value={imagesToSlide}
                  id="images_to_move"
                  onChange={this.handleImagesToSlide}
                >
                  {(images.filter((el, index) => (
                    index <= (images.length - imageQty - 1)
                  ))).map((el, index) => (
                    <option key={el}>{index + 1}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>
          <button
            disabled={infinite}
            className="control__button"
            type="button"
            onClick={this.handleNextClick}
          >
            &rarr;
          </button>
        </div>

        <ul
          style={{ width: this.defineCarouselWidth() }}
          className="carousel__list"
        >
          {images.map((img, index) => (
            <li
              key={+index}
              className="carousel__list_item"
              style={{ right: `${move}px` }}
            >
              <img
                style={{ width: imageSize }}
                className="carousel__list_image"
                src={img}
                alt={index + 1}
              />
            </li>
          ))}
        </ul>
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
