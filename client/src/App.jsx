import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SearchProvider from './context/SearchContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <AppRoutes />
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;