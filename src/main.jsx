import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/index.css'
import Main from './home/Main'
import Auth from './test1/Test'
import Booth from './test2/Booth';
import BoothDetail from "./test2/BoothDetail";
import Notice from './test3/Notice';
import NoticeDetail from './test3/NoticeDetail';
import Vote from './test4/Vote';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Booth" element={<Booth />} />
        <Route path="/Booth/:id" element={<BoothDetail />} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/Notice/:id" element={<NoticeDetail />} />
        <Route path="/Vote" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  </StrictMode >,
)