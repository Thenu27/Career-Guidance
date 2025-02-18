import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProgressProvider } from './context/progress.context';
import { OLevelProvider } from './context/OLevel.context';
import { ALevelProvider } from './context/ALevel.context';
import { CareerProvider } from './context/Career.context';
import { ActivitiesProvider } from './context/Activities.context';
import { CsrfProvider } from './context/csrf.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProgressProvider>
      <OLevelProvider>
        <ALevelProvider>
          <CareerProvider>
            <ActivitiesProvider>
                <App />
            </ActivitiesProvider>
          </CareerProvider>
        </ALevelProvider>
      </OLevelProvider>
    </ProgressProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
