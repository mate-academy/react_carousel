export type CarouselProps = {
  images: Array<string>
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  onChangeSettings: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
