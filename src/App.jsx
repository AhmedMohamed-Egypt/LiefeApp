import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";
import { ProviderRegister } from "./Context/RegisterContext";
import Home from "./pages/Home";

function App() {
  return (
    <ProviderRegister>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path = "/Home" element ={<Home/>}/>
        
      </Routes>
    </BrowserRouter>
    </ProviderRegister>

  );
}

export default App;
