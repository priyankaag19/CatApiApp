import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import Router here
import CatList from './components/CatList';
import CatDetail from './components/CatDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes> {/* Use Routes for routing */}
        <Route path="/" element={<CatList />} /> {/* Use element prop for components */}
        <Route path="/cat/:id" element={<CatDetail />} />
      </Routes>
    </>
  );
}

export default App;
