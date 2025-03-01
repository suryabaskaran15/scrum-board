import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/scrum.scss';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
