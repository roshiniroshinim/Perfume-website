import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./pages/Menu";
import Navbar from "./pages/Navbar";
import NoPages from "./pages/NoPages";
import Home from "./pages/Homes";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Layouts from "./pages/Layouts";
import LoginPage from "./pages/LoginPage";
import Contact from './pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function App()
{
  return(
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu/>} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="contact" element={<Contact/>} />
        <Route path="noPages" element={<NoPages />} />
        <Route path="loginpage" element={<LoginPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

const r1=ReactDOM.createRoot(document.getElementById('root'))
r1.render(<App/>)