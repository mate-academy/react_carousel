/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollWidth: -props.itemWidth * Math.floor(props.images.length / 4),
      imagesState: props.images,
      animationDuration: props.animationDuration / 1000,
      containerSize: props.itemWidth * props.images.length,
    };
  }

  componentWillReceiveProps(props) {
    const newProps = props;

    document.querySelector('.Carousel').style.transition = `${0}s`;
    this.setState(state => ({
      scrollWidth: -props.itemWidth * Math.floor(props.images.length / 4),
      containerSize: props.itemWidth * props.images.length,
    }));
    setTimeout(() => {
      document.querySelector('.Carousel').style.transition = `${newProps.animationDuration / 1000}s`;
    }, 50);
  }

  setContainerSize = (imgWidth, arrayImages) => imgWidth * arrayImages.length;

  scrollLeft = (e) => {
    const buttonNext = e.target;
    let deletedArrayItems;
    const { scrollWidth, containerSize, animationDuration } = this.state;
    const { itemWidth } = this.props;
    const boundValue = (containerSize - (5 * itemWidth));

    const container = document.querySelector('.Carousel');

    this.setState((state, props) => {
      buttonNext.disabled = 'true';

      return {
        scrollWidth: state.scrollWidth - props.itemWidth * props.step,
      };
    });

    setTimeout(() => {
      buttonNext.disabled = !buttonNext.disabled;
    }, 20);

    if (scrollWidth <= -boundValue) {
      container.style.transition = '0s';
      buttonNext.disabled = 'true';

      this.setState((state, props) => {
        deletedArrayItems = state.imagesState.splice(0, 10);

        return {
          imagesState: state.imagesState.concat(deletedArrayItems),
          scrollWidth: -props.itemWidth * 5,
        };
      });

      setTimeout(() => {
        container.style.transition = `${animationDuration}s`;
        buttonNext.disabled = !buttonNext.disabled;
      }, 20);
      setTimeout(() => {
        buttonNext.disabled = !buttonNext.disabled;
      }, 10);
    }
  };

  render() {
    const {
      frameSize,
      itemWidth,
    } = this.props;

    const
      { scrollWidth,
        imagesState,
        animationDuration } = this.state;

    return (
      <>
        <div
          className="Carousel_container"
          style={{
            width: `${frameSize * itemWidth}px`,
            height: `${itemWidth}px`,
          }}
        >
          <div
            className="Carousel"
            style={{
              transform: `translate(${scrollWidth}px)`,
              transition: ` ${animationDuration}s`,
            }}
          >
            {imagesState.map((image, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${image} - ${index}`}
              >
                <img
                  src={image}
                  alt={index + 1}
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="Carousel_buttons">
          <button
            type="button"
            onClick={(e) => {
              this.scrollLeft(e);
            }}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,

};

export default Carousel;
