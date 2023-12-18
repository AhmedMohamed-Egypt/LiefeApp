import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Home from "./pages/Home";
import { RegisterProvider } from "./Context/RegisterContext";

function App() {
  return (
    <BrowserRouter>
   <RegisterProvider>
   
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path = "/Home" element ={<Home/>}/>
        
      </Routes>
   
   </RegisterProvider>
   </BrowserRouter>
 
  

  );
}

export default App;
