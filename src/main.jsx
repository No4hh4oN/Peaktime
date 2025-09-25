/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './assets/styles/common.css';
import './assets/styles/index.css'
import MainPage from './mainpage/JsxFolder/MainPage'
import Home from './home/Home';
import Booth from './map/Booth';
import Concert from './map/Concert';
import TimeTable from './mainpage/JsxFolder/TimeTable'
import LineUp from './mainpage/JsxFolder/LineUp'
import Radio from './stage/Radio.jsx'
import FAQ from './notice/FAQ.jsx'
import MyPage from './mypage/MyPage.jsx'

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/MainPage" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <MainPage />
            </motion.div>
          } 
        />
        <Route 
          path="/Booth" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Booth />
            </motion.div>
          } 
        />
        <Route 
          path="/Concert" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Concert />
            </motion.div>
          } 
        />
        <Route 
          path="/TimeTable" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <TimeTable />
            </motion.div>
          } 
        />
        <Route 
          path="/LineUp" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <LineUp />
            </motion.div>
          } 
        />
        <Route 
          path="/Radio" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Radio />
            </motion.div>
          } 
        />
        <Route 
          path="/FAQ" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <FAQ />
            </motion.div>
          } 
        />
        <Route 
          path="/MyPage" 
          element={
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <MyPage />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>,
)
