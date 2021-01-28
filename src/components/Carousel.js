/* eslint-disable react/no-did-update-set-state */
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
      animation: props.animationDuration,
      imagesState: props.images,
    };
  }

  componentDidUpdate(prevProps) {
    const { images, itemWidth, animationDuration } = this.props;

    if (prevProps.itemWidth !== this.props.itemWidth) {
      this.setState({
        animation: 0,
        scrollWidth: -itemWidth * Math.floor(images.length / 4),
      });
      setTimeout(() => {
        this.setState({ animation: animationDuration });
      }, 50);
    }

    if (prevProps.animationDuration !== this.props.animationDuration) {
      this.setState({ animation: animationDuration });
    }
  }

  scrollLeft = (e) => {
    const buttonNext = e.target;
    let deletedArrayItems;
    const { scrollWidth, imagesState } = this.state;
    const { itemWidth, animationDuration } = this.props;
    const containerSize = (itemWidth * imagesState.length);
    const boundValue = (containerSize - (5 * itemWidth));

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
      this.setState({ animation: 0 });
      buttonNext.disabled = 'true';

      this.setState((state, props) => {
        deletedArrayItems = state.imagesState.splice(0, 10);

        return {
          imagesState: state.imagesState.concat(deletedArrayItems),
          scrollWidth: -props.itemWidth * 5,
        };
      });

      setTimeout(() => {
        this.setState({ animation: animationDuration });
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
      images,
    } = this.props;

    const
      { scrollWidth, animation } = this.state;

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
              transition: ` ${animation / 1000}s`,
            }}
          >
            {images.map((image, index) => (
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
