import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAutoplayChange: (autoplay: boolean) => any;
};

type State = {
  images: string[];
};

export class Carousel extends React.Component<Props, State> {
  state = {
    images: this.props.images,
  };

  autoplayId = 0;

  componentDidMount(): void {
    if (this.props.infinite && this.autoplayId === 0) {
      this.autoplayId = this.autoplay();
    }
  }

  componentDidUpdate(): void {
    if (this.props.infinite && this.autoplayId === 0) {
      this.autoplayId = this.autoplay();
    }

    if (!this.props.infinite) {
      clearInterval(this.autoplayId);
      this.autoplayId = 0;
    }
  }

  componentWillUnmount(): void {
    const buttonPrev = document.querySelector(
      '.buttonPrev',
    ) as HTMLButtonElement;
    const buttonNext = document.querySelector(
      '.buttonNext',
    ) as HTMLButtonElement;

    buttonNext.removeEventListener('click', this.slideNext);
    buttonPrev.removeEventListener('click', this.slidePrev);
  }

  autoplay = (): number => {
    const timerId = window.setInterval(() => {
      this.slideNext();
    }, this.props.animationDuration + 1000);

    return timerId;
  };

  clickNextHandler = () => {
    clearInterval(this.autoplayId);
    this.autoplayId = 0;
    this.slideNext();

    if (this.props.onAutoplayChange) {
      this.props.onAutoplayChange(false);
    }
  };

  clickPrevHandler = () => {
    clearInterval(this.autoplayId);
    this.autoplayId = 0;
    this.slidePrev();

    if (this.props.onAutoplayChange) {
      this.props.onAutoplayChange(false);
    }
  };

  slidePrev = () => {
    clearInterval(this.autoplayId);
    const buttons = Array.from(
      document.querySelectorAll('.button'),
    ) as HTMLButtonElement[];
    const images = document.querySelectorAll('.image');
    const slides = Array.from(
      document.querySelectorAll('.Carousel__slide'),
    ) as HTMLLIElement[];
    const urls: string[] = [];

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = true;
    }

    for (let i = 0; i < images.length; i += 1) {
      urls.push(images[i].getAttribute('src') as string);
    }

    const lastUrls: string[] = urls.splice(
      slides.length - this.props.step,
      this.props.step,
    );
    const LastSlides: HTMLLIElement[] = slides.splice(
      slides.length - this.props.step,
      this.props.step,
    );

    LastSlides[0].style.marginLeft = `
    ${
  parseInt(LastSlides[0].style.marginLeft, 10)
      - this.props.step * this.props.itemWidth
}px`;
    LastSlides[0].style.transition = '0ms';

    urls.unshift(...lastUrls);
    slides.unshift(...LastSlides);
    this.setState({ images: urls });

    const timerId = setTimeout(() => {
      clearInterval(timerId);
      LastSlides[0].style.transition = `${this.props.animationDuration}ms`;
      LastSlides[0].style.marginLeft = '0';
    }, 0);

    const timerId2 = setTimeout(() => {
      clearInterval(timerId2);
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].disabled = false;
      }
    }, this.props.animationDuration);
  };

  slideNext = () => {
    const buttons = Array.from(
      document.querySelectorAll('.button'),
    ) as HTMLButtonElement[];
    const images = document.querySelectorAll('.image');
    const urls: string[] = [];
    const slides = Array.from(
      document.querySelectorAll('.Carousel__slide'),
    ) as HTMLLIElement[];

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = true;
    }

    for (let i = 0; i < images.length; i += 1) {
      urls.push(images[i].getAttribute('src') as string);
    }

    slides[0].style.marginLeft = `
      ${
  parseInt(slides[0].style.marginLeft, 10)
        - this.props.step * this.props.itemWidth
}px`;

    const x: string[] = urls.splice(0, this.props.step);

    urls.push(...x);

    const timerId = setTimeout(() => {
      slides[0].style.marginLeft = '0';
      clearInterval(timerId);
      this.setState({ images: urls });
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].disabled = false;
      }
    }, this.props.animationDuration);
  };

  render() {
    const { images } = this.state;
    const { frameSize, itemWidth, animationDuration } = this.props;

    return (
      <>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              width: `${itemWidth * frameSize}px`,
              height: `${itemWidth}px`,
            }}
          >
            {images.map((path, i) => (
              <li
                className="Carousel__slide"
                key={path}
                style={{
                  marginLeft: 0,
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                  transition: `${animationDuration}ms`,
                }}
              >
                <img src={path} alt={`${i}`} className="image" />
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="button buttonPrev"
            onClick={() => this.clickPrevHandler()}
          >
            &#9001;
          </button>

          <button
            type="button"
            className="button buttonNext"
            data-cy="next"
            onClick={() => this.clickNextHandler()}
          >
            &#9002;
          </button>
        </div>
      </>
    );
  }
}
