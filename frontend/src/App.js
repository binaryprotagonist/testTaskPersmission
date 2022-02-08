import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileList from "./Components/FileList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/filelist" element={<FileList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
