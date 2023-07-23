import React from 'react';
import './App.scss';
import images from './api/images';
import { Carousel } from './components/Carousel';

class App extends React.PureComponent<{}> {
  render() {
    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className='title' data-cy='title'>
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel images={images} />
      </div>
    );
  }
}

export default App;
