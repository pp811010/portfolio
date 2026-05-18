import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import ScrollToTop from './compoments/ScrollToTop';
import Certificates from './pages/Certificates';
import IsLuknam from './pages/IsLukNam';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/education" element={<Projects />} /> */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/certificates" element={<Certificates />} />
        {/* <Route path="/work-experience" element={<Certificates />} /> */}
        {/* <Route path="/contact" element={<Certificates />} /> */}
        <Route path="isluknam" element={<IsLuknam />} />
      </Routes>
    </Router>
  );
}