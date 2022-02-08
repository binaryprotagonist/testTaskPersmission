import "./App.css";
import {Login, Signup, FileList} from './Components'
import { BrowserRouter, Routes, Route } from "react-router-dom";


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
