import { Component } from 'react';
import { CarouselList } from './components/CarouselList';
import { Button } from '../Button';
import { CarouselProps } from '../../types/CarouselProps';
import { HandleCLick } from '../../types/HandleCLick';

import './Carousel.scss';

interface Props {
  images: string[];
}

interface State {
  translate: number;
  nextRest: number;
  prevRest: number;
}

export class Carousel extends Component<Props & CarouselProps, State> {
  state = {
    translate: 0,
    prevRest: 0,
    nextRest: this.props.images.length
    * Number(this.props.itemWidth)
    - Number(this.props.frameSize)
    * Number(this.props.itemWidth),
  };

  componentDidUpdate(prevProps: Props & CarouselProps) {
    const {
      itemWidth,
      frameSize,
      step,
      images,
    } = this.props;

    if (prevProps.itemWidth !== itemWidth
        || prevProps.frameSize !== frameSize
        || prevProps.step !== step) {
      this.setState({
        nextRest: images.length
        * Number(itemWidth)
        - Number(frameSize)
        * Number(itemWidth),
      });
    }
  }

  handleImg: HandleCLick = e => {
    const { cy: direction } = e.currentTarget.dataset;
    const {
      itemWidth,
      step,
      infinite,
    } = this.props;
    const { nextRest, prevRest } = this.state;
    const shift = Number(itemWidth) * Number(step);

    switch (direction) {
      case 'next':
        if (infinite && !nextRest) {
          this.setState({
            translate: 0,
            prevRest: 0,
            nextRest: this.props.images.length
            * Number(this.props.itemWidth)
            - Number(this.props.frameSize)
            * Number(this.props.itemWidth),
          });

          return;
        }

        this.setState((prevState: State) => {
          if (shift > prevState.nextRest) {
            return {
              translate: prevState.translate - prevState.nextRest,
              nextRest: prevState.nextRest - prevState.nextRest,
              prevRest: prevState.prevRest + prevState.nextRest,
            };
          }

          return {
            translate: prevState.translate - shift,
            nextRest: prevState.nextRest - shift,
            prevRest: prevState.prevRest + shift,
          };
        });
        break;

      case 'prev':
        if (infinite && !prevRest) {
          this.setState({
            translate: -this.props.images.length
            * Number(this.props.itemWidth)
            - Number(this.props.frameSize)
            * Number(this.props.itemWidth),
            prevRest: this.props.images.length
            * Number(this.props.itemWidth)
            - Number(this.props.frameSize)
            * Number(this.props.itemWidth),
            nextRest: 0,
          });

          return;
        }

        this.setState((prevState: State) => {
          if (shift > prevState.prevRest) {
            return {
              translate: prevState.translate + prevState.prevRest,
              prevRest: prevState.prevRest - prevState.prevRest,
              nextRest: prevState.nextRest + prevState.prevRest,
            };
          }

          return {
            translate: prevState.translate + shift,
            prevRest: prevState.prevRest - shift,
            nextRest: prevState.nextRest + shift,
          };
        });
        break;

      default:
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      infinite,
      animationDuration,
    } = this.props;

    const { translate, prevRest, nextRest } = this.state;
    const carouselWidth = Number(itemWidth) * Number(frameSize);

    return (
      <div
        className="Carousel"
        style={{ width: `${carouselWidth}px` }}
      >
        <div className="Carousel__container">
          <CarouselList
            images={images}
            translate={translate}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
          />
        </div>
        <Button
          onClick={this.handleImg}
          dataCy="prev"
          content="Prev"
          className="Carousel__button"
          disabled={!infinite && !prevRest}
        />
        <Button
          onClick={this.handleImg}
          dataCy="next"
          content="Next"
          className="Carousel__button"
          disabled={!nextRest && !infinite}
        />
      </div>
    );
  }
}
