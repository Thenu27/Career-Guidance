import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import { IntelligenceProvider } from './Context/intelligence.context.jsx';
import { OLevelProvider } from './Context/OLevel.context.jsx';
import { QuestionProvider } from './Context/Question.context.jsx';
import { ALevelProvider } from './Context/ALevel.context.jsx';
import { CareerProvider } from './Context/Career.context.jsx';
import { ActivitiesProvider } from './Context/Activities.context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <IntelligenceProvider>
        <OLevelProvider>
          <QuestionProvider>
            <ALevelProvider>
              <CareerProvider>
                <ActivitiesProvider>
                  <App />
                </ActivitiesProvider>
              </CareerProvider>
            </ALevelProvider>
          </QuestionProvider>
        </OLevelProvider>
      </IntelligenceProvider>
    </BrowserRouter>
  </StrictMode>
)
