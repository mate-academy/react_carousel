import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <App
    images={[]}
    step={0}
    frameSize={0}
    itemWidth={0}
    animationDuration={0}
    infinite={false}
  />,
);
