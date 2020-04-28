import React from 'react';

import Carousel from './components/Carousel';
import Options from './components/Options';

class App extends React.Component {
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
    defaultSelectOption: 3,
    defaultStep: 3,
    defaultInfinity: true,
  };

  changeFrameSize = (e) => {
    const newFrameSize = +e.target.value;

    this.setState(() => ({ defaultSelectOption: newFrameSize }));
  }

  changeStep = (e) => {
    const newStep = +e.target.value;

    this.setState(() => ({ defaultStep: newStep }));
  }

  changeInfinity = () => {
    this.setState(() => ({ defaultInfinity: !this.state.defaultInfinity }));
  }

  render() {
    /* eslint-disable-next-line max-len */
    const { images, defaultSelectOption, defaultStep, defaultInfinity } = this.state;
    /* eslint-disable-next-line max-len */
    const selectOption = new Array(defaultSelectOption).fill(0).map((el, i) => i + 1);
    const changeTo = new Array(images.length - 2).fill(0).map((el, i) => i + 2);
    const changeInf = [true, false];

    return (
      <div className="App">
        <Carousel
          images={images}
          step={defaultStep}
          frameSize={defaultSelectOption}
          itemWidth={130}
          animationDuration={1000}
          infinite={defaultInfinity}
        />
        <div className="wrap">
          <label htmlFor="changeStep">Choose to change step </label>
          <select
            value={defaultStep}
            onChange={this.changeStep}
            id="changeStep"
          >
            <Options selectOption={selectOption} />
          </select>
        </div>
        <div className="wrap">
          <label htmlFor="changeFrameSize">Choose to change frame size </label>
          <select
            value={defaultSelectOption}
            onChange={this.changeFrameSize}
            id="changeFrameSize"
          >
            <Options selectOption={changeTo} />
          </select>
        </div>
        <div className="wrap">
          <label htmlFor="infinity">Infinity</label>
          <select
            id="infinity"
            onChange={this.changeInfinity}
          >
            <Options selectOption={changeInf} />
          </select>
        </div>
      </div>
    );
  }
}

export default App;
