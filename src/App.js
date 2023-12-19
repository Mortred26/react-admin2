import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./components/list";
import Post from "./components/post";
import Edit from "./components/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/edit/:listid" element={<Edit />}></Route>
        <Route path="/delete/:listid" element={<List />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
