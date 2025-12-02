export interface AppState {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export type InputsProps = Omit<AppState, 'images'> & {
  setState: React.Component<{}, AppState>['setState'];
};
