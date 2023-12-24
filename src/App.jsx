import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Home from "./pages/Home";
import { RegisterProvider } from "./Context/RegisterContext";
import Food from "./components/UI/core/Food";
import Landing from './components/UI/Landing'
import { FoodProvider } from "./Context/FoodContext";




function App() {
  return (
    <BrowserRouter>
   
   <RegisterProvider>
   <FoodProvider>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path = "/app" element ={<Home/>}>
          <Route index element={<Landing/>}/>
          <Route  path="Food" element = {<Food/>}>
           
          </Route>

        </Route>
        
      </Routes>
      </FoodProvider>
   </RegisterProvider>
   
   </BrowserRouter>
 
  

  );
}

export default App;
