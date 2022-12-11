import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { AppContextProvider } from './context';
import App from './App';

import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <Router>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  </ThirdwebProvider>
);
