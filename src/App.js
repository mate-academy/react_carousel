import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const validFrameSizeAndStep = new Array(3)
  .fill(0).map((item, index) => index + 1);
const validWidth = new Array(3)
  .fill(0).map((item, index) => (index + 1) * 130);
const validAnimDuration = new Array(3)
  .fill(0).map((item, index) => (index + 8) * 100);

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
    step: 3,
    frameSize: 3,
    width: 130,
    animationDuration: 1000,
    infinite: true,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case 'frameSize':
        this.setState({
          frameSize: +value,
        });
        break;
      case 'step':
        this.setState({
          step: +value,
        });
        break;
      case 'width':
        this.setState({
          width: +value,
        });
        break;
      case 'duration':
        this.setState({
          animationDuration: +value,
        });
        break;
      default:
        break;
    }
  }

  isInfinite = () => {
    this.setState(state => ({
      infinite: !state.infinite,
    }));
  }

  render() {
    const { images,
      step,
      frameSize,
      width,
      animationDuration,
      infinite } = this.state;

    return (
      <div className="App">
        <h1 className="title">{`Carousel with ${images.length} images`}</h1>

        <form className="innerForm">
          <fieldset>
            <legend>Сhoose your options</legend>
            <select
              name="frameSize"
              id="frameSize"
              onChange={this.handleChange}
            >
              <option value="">Chose frame size</option>
              {validFrameSizeAndStep.map(element => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
            <select
              name="step"
              id="step"
              onChange={this.handleChange}
            >
              <option value="">Chose step</option>
              {validFrameSizeAndStep.map(element => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
            <select
              name="width"
              id="width"
              onChange={this.handleChange}
            >
              <option value="">Chose item width</option>
              {validWidth.map(element => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
            <select
              name="duration"
              id="duration"
              onChange={this.handleChange}
            >
              <option value="">Chose item animation duration</option>
              {validAnimDuration.map(element => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <legend>Do you want the infinite carousel of emojis?</legend>
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              id="yes"
              name="infinite"
              value="yes"
              checked={infinite === true}
              onChange={this.isInfinite}
            />
            <label htmlFor="no">No</label>
            <input
              type="radio"
              id="no"
              name="infinite"
              value="no"
              checked={infinite === false}
              onChange={this.isInfinite}
            />
          </fieldset>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={width}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
