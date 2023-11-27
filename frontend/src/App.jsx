import { Routes, Route, Outlet, Link } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
