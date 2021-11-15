export interface CaroSettings {
  [key: string]: number,
}

export interface State {
  images: string[];
  settings: CaroSettings;
}
