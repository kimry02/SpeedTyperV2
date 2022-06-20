import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from './pages/Auth.js';
import Main from './pages/Main.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
        <Main />
      }></Route>
      <Route path="/login" element={
        <Auth />
      }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
