import { Route, Routes } from "react-router-dom";
import List from "./pages/List/List";
import CreateList from "./pages/CreateList/CreateList";
import UpdateList from "./pages/UpdateList/UpdateList";
import ImgError from "./pages/assets/img/error400-cover.png";

function App() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/create" element={<CreateList />} />
      <Route path="/update/:id" element={<UpdateList />} />
      <Route path="*" element={<img src={ImgError} width="100%" />} />
    </Routes>
  );
}

export default App;
