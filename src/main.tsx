import MuiConfig from '@/config/MuiConfig.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MuiConfig>
      <App />
    </MuiConfig>
  </StrictMode>,
);
