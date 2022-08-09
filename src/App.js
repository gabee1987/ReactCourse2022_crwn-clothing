import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';

const App = () => {
  // With React Router only the component in the element tag with the specific path will be rendered
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
