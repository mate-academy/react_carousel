import { Component } from 'react';
import './Carousel.scss';

type State = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration:number;
  infinite: boolean;
};

type Props = {
  images: string[];
};

class Carousel extends Component<Props, State> {
  state = {
    item: 130,
    frame: 3,
    step: 3,
    animationDuration: 1000,
    infinite: true,
  };

  render() {
    const { images } = this.props;
    const {
      item,
      step,
      frame,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${step} images`}
        </h1>

        <div className="Carousel__Form">
          <form>
            {Object.keys(this.state)
              .filter(key => key !== 'infinite').map(key => (
                <label htmlFor={`${key}Id`}>
                  {key}
                  :
                  <input
                    type="number"
                    id={`${key}Id`}
                    min="1"
                    name={key}
                    required
                    onChange={(event) => {
                      const { name, value } = event.target;

                      this.setState((prevState) => ({
                        ...prevState,
                        [name]: (+value),
                      }));
                    }}
                  />
                </label>
              ))}
          </form>
        </div>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              width: `${item * frame}px`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map(img => (

              <li
                key={img.slice(6, 7)}
                style={{ width: `${item}px` }}
              >
                <img
                  src={img}
                  alt={img.slice(6, 7)}
                  width={`${item}`}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            disabled={!infinite}
            onClick={() => {
              const list = document.querySelector('.Carousel__list');

              if (list) {
                list.scrollBy({
                  top: 0,
                  left: -item * step,
                  behavior: 'smooth',
                });
              }
            }}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            disabled={!infinite}
            onClick={() => {
              const list = document.querySelector('.Carousel__list');

              if (list) {
                list.scrollBy({
                  top: 0,
                  left: item * step,
                  behavior: 'smooth',
                });
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
