import React, { useState, useMemo, useCallback } from 'react';
import './App.scss';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Carousel from './components/Carousel';

const App = () => {
  const images = useMemo(() => ([
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
  ]
  ), []);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const animationDuration = useMemo(() => 1000, []);
  const [infinite, setInfinite] = useState(false);
  const marksMaker = useCallback((min, max, scaleDiv) => {
    const arr = [];
    let count = min;

    do {
      arr.push({
        value: count,
        label: count,
      });
      count += scaleDiv;
    }
    while (count <= max);

    return arr;
  }, []);

  return (
    <div className="App">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={infinite}
                  onChange={() => setInfinite(!infinite)}
                  color="primary"
                />
                  )}
              label="Infinity"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography id="discrete-slider-always" gutterBottom>
              Frame size
            </Typography>
            <Slider
              defaultValue={130}
              value={frameSize}
              onChange={(e, value) => setFrameSize(value)}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks={marksMaker(2, 6, 2)}
              min={1}
              max={6}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography id="discrete-slider-small-steps" gutterBottom>
              Item Width
            </Typography>
            <Slider
              defaultValue={130}
              value={itemWidth}
              onChange={(e, value) => setItemWidth(value)}
              aria-labelledby="discrete-slider-small-steps"
              step={5}
              marks={marksMaker(110, 220, 25)}
              min={110}
              max={220}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography id="discrete-slider-small-steps" gutterBottom>
              Slide Step
            </Typography>
            <Slider
              defaultValue={130}
              value={step}
              onChange={(e, value) => setStep(value)}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks={marksMaker(2, 6, 2)}
              min={1}
              max={6}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
      </form>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        startLeftPoint={!infinite ? 0 : images.length - step}
        startTranslateX={!infinite ? 0 : itemWidth * step}
      />
    </div>
  );
};

export default App;
