import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      currentIndex: 0,
      step: this.props.step,
      fade: false,
      infinite: this.props.infinite,
      animationDuration: this.props.animationDuration,
    };
  }

  componentDidMount() {
    const { animationDuration } = this.state;

    if (this.state.infinite) {
      setInterval(() => this.handleNext(), animationDuration);
    }
  }

  handleNext = () => {
    const { currentIndex, step } = this.state;
    const lastIndex = this.state.images.length - 4;
    const shellResetIndex = currentIndex === lastIndex;
    const index = shellResetIndex ? 0 : (currentIndex + step);

    this.setState(prevState => ({
      currentIndex: index,
      fade: !prevState.fade,
    }));
  }

  handlePrev = () => {
    const { currentIndex, step } = this.state;
    const lastIndex = this.state.images.length - 4;
    const shellResetIndex = currentIndex === 0;
    const index = shellResetIndex ? lastIndex : (currentIndex - step);

    this.setState(prevState => ({
      currentIndex: index,
      fade: !prevState.fade,
    }));
  }

  render() {
    const { itemWidth, frameSize } = this.props;
    const { currentIndex, images, fade } = this.state;
    const currentClass = fade ? 'Carousel__li--animation' : 'Carousel__li--animation2';

    return (
      <>
        <h1 style={{ textAlign: 'center' }}>
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>
        <div className="Carousel">
          <ul className="Carousel__list">
            {frameSize >= 3
              && (
                <>
                  <li className={currentClass}>
                    <img
                      classNmae="Carousel__img"
                      style={{ width: itemWidth, height: itemWidth }}
                      src={images[currentIndex]}
                      alt="funny smile char"
                    />
                  </li>
                  <li className={currentClass}>
                    <img
                      classNmae="Carousel__img"
                      style={{ width: itemWidth, height: itemWidth }}
                      src={images[currentIndex + 1]}
                      alt="funny smile char"
                    />
                  </li>
                  <li className={currentClass}>
                    <img
                      classNmae="Carousel__img"
                      style={{ width: itemWidth, height: itemWidth }}
                      src={images[currentIndex + 2]}
                      alt="funny smile char"
                    />
                  </li>
                </>
              )
            }
            {frameSize === 2
              && (
                <>
                  <li className={currentClass}>
                    <img
                      style={{ width: itemWidth, height: itemWidth }}
                      src={images[currentIndex]}
                      alt="funny smile char"
                    />
                  </li>
                  <li className={currentClass}>
                    <img
                      style={{ width: itemWidth, height: itemWidth }}
                      src={images[currentIndex + 1]}
                      alt="funny smile char"
                    />
                  </li>
                </>
              )
            }
            {frameSize <= 1
              && (
                <li className={currentClass}>
                  <img
                    style={{ width: itemWidth, height: itemWidth }}
                    src={images[currentIndex]}
                    alt="funny smile char"
                  />
                </li>
              )
            }
          </ul>

          <button
            className="button"
            onClick={this.handlePrev}
            type="button"
          >
            Prev
          </button>
          <button
            className="button"
            onClick={this.handleNext}
            type="button"
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

export default Carousel;
