import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import Form from './components/Form';

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  scrollPosition: number,
  animationDuration: number,
}

class App extends React.Component<{}, State> {
  state = {
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    scrollPosition: 0,
    animationDuration: 1000,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      scrollPosition,
      animationDuration,
    } = this.state;

    const moveRight = () => {
      if ((frameSize * itemWidth) - scrollPosition
        < (itemWidth * images.length)) {
        this.setState(() => {
          const currentPosition = scrollPosition - (itemWidth * step);

          if (currentPosition - (itemWidth * step)
            <= -(images.length * itemWidth)) {
            return {
              scrollPosition: -(images.length * itemWidth)
              + (frameSize * itemWidth),
            };
          }

          return { scrollPosition: currentPosition };
        });
      }
    };

    const moveLeft = () => {
      if (scrollPosition < 0) {
        this.setState(() => {
          if (scrollPosition + (itemWidth * step) > 0) {
            return { scrollPosition: 0 };
          }

          return { scrollPosition: scrollPosition + (itemWidth * step) };
        });
      }
    };

    const changeItemWidth = (number: string) => {
      this.setState((prevState) => ({
        itemWidth: +number,
        scrollPosition: (prevState.scrollPosition
          / prevState.itemWidth) * +number,
      }));
    };

    const changeFrameSize = (number: string) => {
      this.setState((prevState) => {
        if (scrollPosition - (itemWidth * +number)
          <= -(images.length * itemWidth)) {
          return {
            scrollPosition: -(images.length * itemWidth)
            + (+number * itemWidth),
            frameSize: +number,
          };
        }

        return {
          scrollPosition: prevState.scrollPosition,
          frameSize: +number,
        };
      });
    };

    const changeStep = (number: string) => {
      this.setState({ step: +number });
    };

    const changeAnimationDuration = (number: string) => {
      this.setState({ animationDuration: +number });
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          scrollPosition={scrollPosition}
          animationDuration={animationDuration}
          moveLeft={moveLeft}
          moveRight={moveRight}
        />

        <Form
          changeNumber={changeItemWidth}
          range={(number: number) => {
            return number >= 50 && number <= 500;
          }}
          text="Enter item width 50 - 500"
          value={String(itemWidth)}
        />

        <Form
          changeNumber={changeFrameSize}
          range={(number: number) => {
            return number >= 1 && number <= images.length;
          }}
          text={`Enter frame size 1 - ${images.length}`}
          value={String(frameSize)}
        />

        <Form
          changeNumber={changeStep}
          range={(number: number) => {
            return number >= 1 && number <= images.length;
          }}
          text={`Enter step 1 - ${images.length}`}
          value={String(step)}
        />

        <Form
          changeNumber={changeAnimationDuration}
          range={(number: number) => {
            return number >= 1000 && number <= 3000;
          }}
          text="Enter duaration 1000 - 3000"
          value={String(animationDuration)}
        />
      </div>
    );
  }
}

export default App;
