import React from 'react';

import './Carousel.scss';

class Carousel extends React.Component {
    state = {
      scrollLength: 0,
      isStart: true,
      isEnd: false,
      validNextScroll: true,
    }

    // componentDidUpdate({ itemWidth, frameSize, }) {
    //   if (this.props.itemWidth !== itemWidth
    //     || this.props.frameSize !== frameSize) {
    //     this.setState({
    //       scrollLength: 0,
    //       isStart: true,
    //       isEnd: false,
    //     });
    //   }
    // }

    oneScroll(scroll, newScrollLength,
      isStartValue = false, isEndValue = false) {
      const { animationDuration } = { ...this.props };

      this.setState((state) => {
        let currentScroll;

        if (scroll) {
          currentScroll = state.scrollLength + scroll;
        } else {
          currentScroll = newScrollLength;
        }

        return {
          scrollLength: currentScroll,
          isStart: isStartValue,
          isEnd: isEndValue,
          validNextScroll: false,
        };
      });

      setTimeout(() => (
        this.setState({ validNextScroll: true })
      ), animationDuration);
    }

    render() {
      const {
        images,
        steep,
        frameSize,
        itemWidth,
        animationDuration,
        infinite,
      } = { ...this.props };

      const {
        scrollLength,
        isStart,
        isEnd,
        validNextScroll,
      } = { ...this.state };

      const widthListCarousel = itemWidth * images.length;
      const widthOneScroll = steep * itemWidth;
      const endList = widthListCarousel - frameSize * itemWidth;

      const currentTransform = {
        transitionDuration: `${animationDuration}ms`,
        transform: `translateX(-${scrollLength}px)`,
      };

      const prevScroll = () => {
        if (!validNextScroll) {
          return;
        }

        const currentScrollLength = (
          scrollLength - widthOneScroll);

        if (currentScrollLength <= 0) {
          if (infinite && isStart) {
            this.oneScroll(null, endList, false, true);
          } else {
            this.oneScroll(null, 0, true, false);
          }

          return;
        }

        this.oneScroll(-widthOneScroll);
      };

      const nextScroll = () => {
        if (!validNextScroll) {
          return;
        }

        const currentScrollLength = (
          this.state.scrollLength + (
            widthOneScroll + frameSize * itemWidth));

        if (currentScrollLength >= widthListCarousel) {
          if (infinite && isEnd) {
            this.oneScroll(null, 0, true, false);
          } else {
            this.oneScroll(null, endList, false, true);
          }

          return;
        }

        this.oneScroll(widthOneScroll);
      };

      return (
        <div className="Carousel">

          <button
            type="button"
            className={`
            Carousel__navButton
            Carousel__navButton--prev
            ${
              this.state.isStart
              && !infinite
              && 'Carousel__navButton--noScroll'}`
            }
            onClick={prevScroll}
          />

          <ul
            className="Carousel__list"
            style={{
              width: frameSize * itemWidth,
            }}
          >
            <div
              className="Carousel__list-scroll"
              style={currentTransform}
            >
              {images.map((img, index) => (
                <li key={img}>
                  <img
                    src={img}
                    alt={index + 1}
                    width={`${itemWidth}px`}
                    height={`${itemWidth}px`}
                  />
                </li>
              ))}
            </div>
          </ul>

          <button
            type="button"
            className={`
            Carousel__navButton
            Carousel__navButton--prev
            ${
              this.state.isEnd
              && !infinite
              && 'Carousel__navButton--noScroll'}`
            }
            onClick={nextScroll}
          />

        </div>
      );
    }
}

export default Carousel;
