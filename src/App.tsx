import React from 'react';
import './App.scss';
import './Page/Page.scss';
import { Carousel } from './components/Carousel';
// import { Carousel as State } from './types/Carousel';

interface State {
  [key: string]: number | string | boolean | string[],
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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

  setNewParams = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      value,
      name,
      max,
      min,
      checked,
    } = event.currentTarget;

    if (name === 'infinite') {
      this.setState({
        infinite: checked,
      });

      return;
    }

    switch (true) {
      case +value > +max:
        this.setState({ [name]: 10 });
        break;
      case +value < +min:
        this.setState({ [name]: 0 });
        break;

      default:
        this.setState({ [name]: +value });
        break;
    }
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

    const imagesArr = images as string[];

    return (
      <div className="App Page">
        {/* eslint-disable-next-line */}
        <h1 className="Page__title" data-cy="title">Carousel with {imagesArr.length} images</h1>

        <form
          action="#"
          method="post"
          className="Page__form"
        >
          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="stepId">
              {'Step '}
            </label>

            <input
              className="Page__input"
              id="stepId"
              type="number"
              value={Number(step)}
              onChange={this.setNewParams}
              name="step"
              min="0"
              max="10"
            />
          </div>

          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="frameId">
              {'Frame Size '}
            </label>

            <input
              className="Page__input"
              id="frameId"
              type="number"
              name="frameSize"
              onChange={this.setNewParams}
              min="0"
              max="10"
              value={Number(frameSize)}
            />
          </div>

          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="itemId">
              {'Item Width '}
            </label>

            <input
              className="Page__input"
              id="itemId"
              type="number"
              value={Number(itemWidth)}
              onChange={this.setNewParams}
              name="itemWidth"
              min="0"
              max="1300"
            />
          </div>

          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="Animation">
              {'Animation Duration '}
            </label>

            <input
              className="Page__input"
              id="Animation"
              type="number"
              value={Number(animationDuration)}
              name="animationDuration"
              onChange={this.setNewParams}
              min="0"
              max="10000"
            />
          </div>

          <div className="Page__Input-block">
            <label className="Page__input-lable" htmlFor="infinite">
              {'infinite '}
            </label>
            <input
              id="infinite"
              type="checkbox"
              onChange={this.setNewParams}
              name="infinite"
            />
          </div>
        </form>

        <Carousel
          images={imagesArr}
          step={Number(step)}
          frameSize={Number(frameSize)}
          itemWidth={Number(itemWidth)}
          animationDuration={Number(animationDuration)}
          infinite={Boolean(infinite)}
        />
      </div>
    );
  }
}

export default App;
