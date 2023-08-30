import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
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
    animationDuration: 1000,
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      [event.target.name]: +event.target.value,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <>
        <div className="App">

          <form method="post" className="form">

            <div className="field">
              <label htmlFor="itemId" className="input is-naormal">
                <div className="control">
                  ITEM WIDTH:
                  <input
                    className="input is-medium"
                    id="itemId"
                    type="number"
                    name="input"
                    value={itemWidth}
                    min={130}
                    max={1300}
                    onChange={this.handleChange}
                  />
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="frameId" className="input is-normal">
                <div className="control">
                  FRAME SIZE:
                  <input
                    id="frameId"
                    type="number"
                    name="frameSize"
                    value={frameSize}
                    min={1}
                    max={10}
                    onChange={this.handleChange}
                  />
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="stepId" className="input is-normal">
                <div className="control">
                  STEP:
                  <input
                    id="stepId"
                    type="number"
                    name="step"
                    value={step}
                    min={1}
                    max={10}
                    onChange={this.handleChange}
                  />
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="durationId" className="input is-normal">
                <div className="control">
                  ANIMATION DURATION:
                  <input
                    id="durationId"
                    type="number"
                    name="animationDuration"
                    value={animationDuration}
                    min={100}
                    max={100000}
                    step={100}
                    onChange={this.handleChange}
                  />
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="infiniteId" className="checkbox">
                <div className="control">
                  INFINITE
                  <input
                    type="checkbox"
                    id="infiniteId"
                    name="infinite"
                    onClick={() => {
                      this.setState({
                        infinite: !infinite,
                      });
                    }}
                  />
                </div>
              </label>
            </div>

          </form>

          <h1
            data-cy="title"
            className="title"
          >
            Carousel with
            <strong>{images.length}</strong>
            images
          </h1>

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />
        </div>
      </>
    );
  }
}
export default App;
