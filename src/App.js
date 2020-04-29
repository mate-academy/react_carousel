import React from 'react';
import './App.scss';
import { emoji } from './api/emoji';

import Carousel from './components/Carousel';

class App extends React.Component {
  state = {
    images: emoji,
    frameSize: 1,
    step: 1,
    option: ['One', 'Two', 'Three', 'Four', 'Five'],
    infinite: true,
  };

  handleChangeSetting = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      this.setState({ [name]: checked });
    } else if (name === 'frameSize') {
      this.setState({
        [name]: value,
        step: value,
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  render = () => {
    const { images, option, frameSize, step } = this.state;

    return (
      <div className="App">
        <div className="ui inverted blue segment setting">
          <div className="ui inverted equal width form mini">
            <div className="fields">
              <div className="field setting__frame">
                Number of emojis in the frame
                <select
                  name="frameSize"
                  value={frameSize}
                  onChange={this.handleChangeSetting}
                >
                  {option.map((num, idx) => (
                    <option key={num} value={idx + 1}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="field setting__step">
                Slide step
                <select
                  name="step"
                  value={step}
                  onChange={this.handleChangeSetting}
                >
                  {option.slice(0, frameSize).map((num, idx) => (
                    <option key={num} value={idx + 1}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <div className="ui checkbox">
                  <input
                    onChange={this.handleChangeSetting}
                    checked={this.state.infinite}
                    id="infinite"
                    name="infinite"
                    type="checkbox"
                    className="hidden"
                  />
                  <label htmlFor="infinite">Infinite</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Carousel
          images={images}
          step={+step}
          frmSize={+frameSize}
          itemWidth={130}
          duration={1000}
          arrowSize={35}
        />
      </div>
    );
  }
}

export default App;
