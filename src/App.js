import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import View from "./components/students/View";
import Edit from "./components/students/Edit";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="view/:id" element={<View />} />
      </Routes>
      <Routes>
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
