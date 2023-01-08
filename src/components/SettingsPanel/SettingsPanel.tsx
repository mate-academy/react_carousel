import React from 'react';

import './SettingsPanel.scss';

import { Settings } from '../../types/Settings';

type Props = {
  save: (property: keyof Settings, value: string) => void,
  settings: Settings,
};

export const SettingsPanel: React.FC<Props> = ({ save, settings }) => {
  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
    infinite,
  } = settings;

  return (
    <div className="SettingsPanel">
      <label htmlFor="item-width">
        Item Width:
        <input
          type="number"
          value={itemWidth}
          min={130}
          max={500}
          step={5}
          onInput={(e) => (
            save('itemWidth', e.currentTarget.value)
          )}
        />
      </label>

      <label>
        Frame Size:
        <input
          type="number"
          min={1}
          max={10}
          step={1}
          value={frameSize}
          onInput={(e) => (
            save('frameSize', e.currentTarget.value)
          )}
        />
      </label>

      <label>
        Step:
        <input
          type="number"
          value={step}
          min={1}
          max={10}
          step={1}
          onInput={(e) => (
            save('step', e.currentTarget.value)
          )}
        />
      </label>

      <label>
        Animation Duration:
        <input
          type="number"
          value={animationDuration}
          min={100}
          max={10000}
          step={100}
          onInput={(e) => (
            save('animationDuration', e.currentTarget.value)
          )}
        />
      </label>

      <label>
        Infinite:
        <input
          type="checkbox"
          checked={infinite}
          onChange={(e) => (
            save(
              'infinite',
              e.currentTarget.checked ? 'true' : '',
            )
          )}
        />
      </label>
    </div>
  );
};
