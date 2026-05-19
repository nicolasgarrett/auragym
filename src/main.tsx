import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuraProvider } from './contexts/AuraContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuraProvider>
      <App />
    </AuraProvider>
  </StrictMode>,
);
