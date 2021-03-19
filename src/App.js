import React from 'react';
import './App.scss';

import { Carousel } from './components/Carousel';

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
   };

   render() {
     const { images } = this.state;

     return (
       <div className="App">
         <h1>
           Carousel with
           {images.length}
           {' '}
           images
         </h1>
         {/* eslint-disable-next-line */}

         <Carousel
           images={images}
           step={3}
           frameSize={3}
           itemWidth={130}
           animationDuration={1000}
           infinite={false}
         />
       </div>
     );
   }
}

export default App;
