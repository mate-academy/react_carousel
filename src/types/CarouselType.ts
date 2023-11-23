export default interface CarouselType {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  itemGap: number,
  carouselMaxWidth: number,
  animationDuration: number,
  infinite: boolean,
}
