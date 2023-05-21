import React from 'react';
// import './Carousel.scss';

interface State {
  gallery: string[],
}

interface Props {
  animationName: string,
  infiniteAuto: boolean,
  frameSize: number,
  itemWidth: number,
  duration: number,
  images: string[],
}

class Gallery extends React.Component<Props, State> {
  state = {
    gallery: [
      ...this.props.images,
      ...this.props.images,
      ...this.props.images,
    ],
  };

  render() {
    const {
      itemWidth,
      frameSize,
      animationName,
      infiniteAuto,
      duration,
    } = this.props;
    const { gallery } = this.state;

    return (
      <div className="Carousel__container">
        <div
          className="Carousel__frame"
          style={{
            width: frameSize * itemWidth,
          }}
        >
          <ul
            className="Carousel__list"
            style={{ padding: 0 }}
          >
            {gallery.map((item) => (
              <li
                className="Carousel__list--item"
                style={{
                  animation: `
                    ${animationName}
                    ${duration}ms
                    linear
                    ${infiniteAuto ? 'infinite' : 'forwards'}
                  `,
                }}
              >
                <img
                  src={item}
                  className="wrapper"
                  key={item.toString()}
                  alt={item.slice(6, 7)}
                  style={{ width: itemWidth }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Gallery;
