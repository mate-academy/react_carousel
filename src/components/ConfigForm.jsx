import React from 'react';

export const ConfigForm = ({ config, onChange }) => {
  return (
    <div className="config-form">
      <label htmlFor="step">Step</label>
      <input type="number" id="step" value={config.step} onChange={onChange} />

      <label htmlFor="frameSize">Frame Size</label>
      <input
        type="number"
        id="frameSize"
        value={config.frameSize}
        onChange={onChange}
      />

      <label htmlFor="itemWidth">Item Width</label>
      <input
        type="number"
        id="itemWidth"
        value={config.itemWidth}
        onChange={onChange}
      />

      <label htmlFor="animationDuration">Animation Duration</label>
      <input
        type="number"
        id="animationDuration"
        value={config.animationDuration}
        onChange={onChange}
      />

      <div>
        <label htmlFor="infinite">Infinite</label>
        <input
          type="checkbox"
          id="infinite"
          checked={config.infinite}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
