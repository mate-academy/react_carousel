import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

export class App extends React.Component<{}, State> {
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

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
      <div className="App">
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          action="#"
          method="post"
          className="form"
        >
          <div className="form__container">
            <label htmlFor="stepId">
              {'Step: '}
            </label>
            <label htmlFor="frameSizeId">
              {'Frame size: '}
            </label>
            <label htmlFor="itemWidthId">
              {'Item width: '}
            </label>
            <label htmlFor="animationDurationId">
              {'Animation duration: '}
            </label>
            <label htmlFor="infiniteId">
              {'Infinite: '}
            </label>
          </div>
          <div className="form__container">
            <input
              type="number"
              name="step"
              id="stepId"
              defaultValue={3}
              step={1}
              min={1}
              max={images.length}
              onChange={(e) => (
                this.setState({ step: Number(e.currentTarget.value) })
              )}
            />
            <input
              type="number"
              name="frameSize"
              id="frameSizeId"
              defaultValue={3}
              step={1}
              max={images.length}
              min={1}
              onChange={(e) => (
                this.setState({ frameSize: Number(e.currentTarget.value) })
              )}
            />
            <input
              type="number"
              name="itemWidth"
              id="itemWidthId"
              defaultValue={130}
              min={100}
              max={200}
              step={10}
              onChange={(e) => (
                this.setState({ itemWidth: Number(e.currentTarget.value) })
              )}
            />
            <input
              type="number"
              name="animationDuration"
              id="animationDurationId"
              defaultValue={1000}
              step={500}
              min={500}
              onChange={(e) => (
                this.setState(
                  { animationDuration: Number(e.currentTarget.value) },
                )
              )}
            />
            <input
              type="checkbox"
              name="infinite"
              id="infiniteId"
              onChange={(e) => (
                this.setState({ infinite: e.currentTarget.checked })
              )}
            />
          </div>
        </form>
      </div>
    );
  }
}
