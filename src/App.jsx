import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Home from "./pages/Home";
import { RegisterProvider } from "./Context/RegisterContext";

function App() {
  return (
   <RegisterProvider>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path = "/Home" element ={<Home/>}/>
        
      </Routes>
    </BrowserRouter>
   </RegisterProvider>
 
  

  );
}

export default App;
