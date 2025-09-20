import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/common.css';
import './assets/styles/index.css'
import MainPage from './mainpage/JsxFolder/MainPage'
import Home from './home/Home';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode >,
)