import React from 'react';
import './App.scss';
import { emoji } from './api/emoji';
import Carousel from './components/Carousel';
import Settings from './components/Settings';

class App extends React.Component {
  state = {
    images: emoji,
    frameSize: '1',
    step: '1',
    option: ['One', 'Two', 'Three', 'Four', 'Five'],
    infinite: false,
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
    const { images, frameSize, step } = this.state;

    return (
      <div className="App">
        <Settings
          {...this.state}
          onChangeSetting={this.handleChangeSetting}
        />
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
