import { Wrapper } from './components/Wrapper';
import { Carousel } from './components/Carousel';

import './App.scss';

const images = [
  './img/cats/cat-1.svg',
  './img/cats/cat-2.svg',
  './img/cats/cat-3.svg',
  './img/cats/cat-4.svg',
  './img/cats/cat-5.svg',
  './img/cats/cat-6.svg',
  './img/cats/cat-7.svg',
  './img/cats/cat-8.svg',
  './img/cats/cat-9.svg',
];

const App = () => {
  return (
    <div className="App">
      <Wrapper>
        <Carousel images={images} />
      </Wrapper>
    </div>
  );
};

export default App;
