import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  autoplay: boolean;
  onAutoplayChange: (autoplay: boolean) => void;
};

type State = {
  images: string[];
  disabled : boolean;
};

export class Carousel extends React.Component<Props, State> {
  autoplayId = 0;

  counter = 0;

  showLastSlide = false;

  imagesSrc = this.props.images;

  state = {
    images: this.imagesSrc,
    disabled: false,
  };

  componentDidMount(): void {
    if (this.props.autoplay && !this.autoplayId) {
      this.autoplayId = this.autoplay();
    }
  }

  componentDidUpdate(): void {
    if (this.props.autoplay && this.autoplayId === 0) {
      this.autoplayId = this.autoplay();
    }

    if (!this.props.autoplay) {
      clearInterval(this.autoplayId);
      this.autoplayId = 0;
    }
  }

  autoplay = (): number => {
    const images: NodeListOf<HTMLImageElement> = document
      .querySelectorAll('.image');
    const slides = Array.from(
      document.querySelectorAll('.Carousel__slide'),
    ) as HTMLLIElement[];

    for (let i = 0; i < slides.length; i += 1) {
      slides[i].style.transform = 'translateX(0)';
      images[i].style.transform = 'translateX(0)';
    }

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
    this.setState({ disabled: true });
    const images: NodeListOf<HTMLImageElement> = document
      .querySelectorAll('.image');
    const slides = Array.from(
      document.querySelectorAll('.Carousel__slide'),
    ) as HTMLLIElement[];
    const urls: string[] = [];

    if (this.props.infinite) {
      const { step, animationDuration } = this.props;

      if (this.counter - step <= 0) {
        for (let k = 0; k < slides.length; k += 1) {
          slides[k].style.transform = 'translateX(0)';
        }

        this.counter = 0;

        setTimeout(() => {
          this.setState({ disabled: false });
        }, animationDuration);

        return;
      }

      for (let i = 0, end = slides.length - 1; i < slides.length; i += 1) {
        slides[i].style.transform = `translateX(${-100 * step}%)`;
        this.counter -= step;

        if (i === end) {
          setTimeout(() => {
            this.showLastSlide = false;
            this.setState({ disabled: false });
          }, animationDuration);

          return;
        }
      }
    }

    for (let i = 0; i < images.length; i += 1) {
      images[i].style.transform = `translateX(-${100 * this.props.step}%)`;
      images[i].style.transition = '0ms';
      urls.push(images[i].getAttribute('src') as string);
    }

    const lastUrls: string[] = urls.splice(
      slides.length - this.props.step,
      this.props.step,
    );
    const LastSlides: HTMLLIElement[] = slides.splice(
      slides.length - this.props.step,
    );

    urls.unshift(...lastUrls);
    slides.unshift(...LastSlides);
    this.setState({ images: urls });

    const timerId = setTimeout(() => {
      clearInterval(timerId);
      for (let i = 0; i < images.length; i += 1) {
        images[i].style.transform = 'translateX(0)';
        images[i].style.transition = `${this.props.animationDuration}ms`;
      }
    }, 0);

    const timerId2 = setTimeout(() => {
      clearInterval(timerId2);
      this.setState({ disabled: false });
    }, this.props.animationDuration);
  };

  slideNext = () => {
    this.setState({ disabled: true });
    const images: NodeListOf<HTMLImageElement> = document
      .querySelectorAll('.image');
    const urls: string[] = [];
    const slides = Array.from(
      document.querySelectorAll('.Carousel__slide'),
    ) as HTMLLIElement[];

    if (this.props.infinite && this.counter <= this.imagesSrc.length) {
      this.counter += this.props.step;

      if (this.counter + this.props.frameSize > this.imagesSrc.length) {
        this.counter = this.imagesSrc.length - this.props.frameSize;

        for (let i = 0, end = slides.length - 1; i < slides.length; i += 1) {
          slides[i].style.transform = `translateX(-${100 * this.counter}%)`;

          if (i === end && this.showLastSlide) {
            setTimeout(() => {
              for (let k = 0; k < slides.length; k += 1) {
                slides[k].style.transform = 'translateX(0)';
              }

              this.counter = 0;
              this.showLastSlide = false;
              this.setState({ disabled: false });
            }, this.props.animationDuration);

            return;
          }

          if (i === end) {
            this.showLastSlide = true;
            this.setState({ disabled: false });

            return;
          }
        }
      }

      for (let i = 0, end = slides.length - 1; i < slides.length; i += 1) {
        slides[i].style.transform = `translateX(-${100 * this.counter}%)`;

        if (i === end) {
          setTimeout(() => {
            this.setState({ disabled: false });
          }, this.props.animationDuration);

          return;
        }
      }
    }

    for (let i = 0; i < images.length; i += 1) {
      images[i].style.transition = `${this.props.animationDuration}ms`;
      images[i].style.transform = `translateX(-${100 * this.props.step}%)`;
      urls.push(images[i].getAttribute('src') as string);
    }

    this.setState({ images: urls, disabled: true });

    const timerId = setTimeout(() => {
      for (let i = 0; i < images.length; i += 1) {
        images[i].style.transition = '0ms';
        images[i].style.transform = '';
      }

      const slicedFirstElems: string[] = urls.splice(0, this.props.step);
      const FirstElems = slides.splice(0, this.props.step);

      urls.push(...slicedFirstElems);
      slides.push(...FirstElems);

      clearInterval(timerId);
      this.setState({ images: urls, disabled: false });
    }, this.props.animationDuration);
  };

  render() {
    const { images } = this.state;
    const { frameSize, itemWidth, animationDuration } = this.props;

    return (
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
                transform: `translateX(${0}px)`,
              }}
            >
              <img
                src={path}
                alt={`${i}`}
                className="image"
                style={{
                  transition: `${animationDuration}ms`,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="button buttonPrev"
          onClick={() => this.clickPrevHandler()}
          disabled={this.state.disabled}
        >
          &#9001;
        </button>

        <button
          type="button"
          className="button buttonNext"
          data-cy="next"
          onClick={() => this.clickNextHandler()}
          disabled={this.state.disabled}
        >
          &#9002;
        </button>
      </div>
    );
  }
}
