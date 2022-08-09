import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  // With React Router only the component in the element tag with the specific path will be rendered
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
