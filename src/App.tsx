import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './App.scss';
import { Carousel } from './components/Carousel';

export const App = () => {
  return (
    <div className="App">
      <Carousel />
    </div>
  );
};
